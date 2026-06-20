const Appointment = require('../models/Appointment');
const Service = require('../models/Service');

const createAppointment = async (req, res) => {
  try {
    const { customerName, phone, services, appointmentDate } = req.body;
    
    const selectedServices = await Service.find({ _id: { $in: services } });
    if (selectedServices.length === 0) {
      return res.status(400).json({ success: false, message: 'Invalid service selection.' });
    }

    const totalPrice = selectedServices.reduce((sum, s) => sum + s.price, 0);
    const totalDuration = selectedServices.reduce((sum, s) => sum + s.duration, 0);
    const proposedDate = new Date(appointmentDate);
    const proposedEnd = new Date(proposedDate.getTime() + totalDuration * 60000);

    const overlapping = await Appointment.find({
      status: { $ne: 'completed' },
      $or: [
        { appointmentDate: { $gte: proposedDate, $lt: proposedEnd } },
        {
          $and: [
             { appointmentDate: { $lte: proposedDate } },
             { $expr: { $gt: [ { $add: ["$appointmentDate", { $multiply: ["$totalDuration", 60000] }] }, proposedDate ] } }
          ]
        }
      ]
    });

    if (overlapping.length > 0) {
      return res.status(409).json({ success: false, message: 'Time slot is unavailable. Please choose another time.' });
    }

    const appointment = new Appointment({
      customerName, phone, services, appointmentDate: proposedDate, totalPrice, totalDuration
    });
    
    await appointment.save();
    res.status(201).json({ success: true, data: appointment });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('services').sort({ appointmentDate: -1 });
    res.status(200).json({ success: true, data: appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const appointment = await Appointment.findByIdAndUpdate(id, { status }, { new: true });
    res.status(200).json({ success: true, data: appointment });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    await Appointment.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Appointment deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createAppointment, getAppointments, updateAppointmentStatus, deleteAppointment };
