const SiteSettings = require('../models/SiteSettings');

const getSettings = async (req, res) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create({});
    }
    res.status(200).json({ success: true, data: settings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateSettings = async (req, res) => {
  try {
    const updateData = req.body;
    let settings = await SiteSettings.findOne();
    
    if (settings) {
      settings = await SiteSettings.findOneAndUpdate({}, updateData, { new: true });
    } else {
      settings = await SiteSettings.create(updateData);
    }
    
    res.status(200).json({ success: true, data: settings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getSettings, updateSettings };
