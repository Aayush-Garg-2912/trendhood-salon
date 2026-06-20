const Stylist = require('../models/Stylist');

const getStylists = async (req, res) => {
  try {
    const stylists = await Stylist.find();
    res.status(200).json({ success: true, data: stylists });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getStylists };
