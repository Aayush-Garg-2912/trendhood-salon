const mongoose = require('mongoose');

const contactMessageSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true },
  message: { type: String },
  type: { type: String, enum: ['inquiry', 'newsletter'], required: true },
}, { timestamps: true });

module.exports = mongoose.model('ContactMessage', contactMessageSchema);
