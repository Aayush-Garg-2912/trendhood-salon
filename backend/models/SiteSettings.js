const mongoose = require('mongoose');

const siteSettingsSchema = new mongoose.Schema({
  description: { type: String, default: 'Setting the standard for luxury grooming and styling. Experience excellence in every detail.' },
  address: { type: String, default: '123 Luxury Avenue, Suite 400\nNew York, NY 10012' },
  phone: { type: String, default: '+1 (555) 123-4567' },
  hours: {
    monFri: { type: String, default: '9:00 AM - 8:00 PM' },
    saturday: { type: String, default: '10:00 AM - 6:00 PM' },
    sunday: { type: String, default: 'Closed' }
  },
  socials: {
    facebook: { type: String, default: '#' },
    twitter: { type: String, default: '#' },
    instagram: { type: String, default: '#' }
  }
}, { timestamps: true });

module.exports = mongoose.model('SiteSettings', siteSettingsSchema);
