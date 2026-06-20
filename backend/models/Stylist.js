const mongoose = require('mongoose');

const stylistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  imageUrl: { type: String, required: true },
  bio: { type: String, required: true },
  specializations: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('Stylist', stylistSchema);
