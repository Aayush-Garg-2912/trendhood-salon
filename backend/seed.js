const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Service = require('./models/Service');
const Stylist = require('./models/Stylist');
const Review = require('./models/Review');
const Appointment = require('./models/Appointment');
const connectDB = require('./config/db');

dotenv.config();

const seedData = async () => {
  await connectDB();

  try {
    // Clear existing data
    await Service.deleteMany();
    await Stylist.deleteMany();
    await Review.deleteMany();
    await Appointment.deleteMany();

    console.log('Seeding Services...');
    await Service.insertMany([
      { name: 'Signature Fade', description: 'Precision skin fade with razor finish', price: 40, duration: 45, category: 'Haircut', imageUrl: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800' },
      { name: 'Executive Grooming', description: 'Haircut, beard trim, and hot towel shave', price: 75, duration: 60, category: 'Package', imageUrl: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800' },
      { name: 'Keratin Treatment', description: 'Smoothing treatment for frizz-free hair', price: 150, duration: 120, category: 'Treatment', imageUrl: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800' },
      { name: 'Luxury Color', description: 'Full coverage color or balayage highlights', price: 120, duration: 90, category: 'Color', imageUrl: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?w=800' },
    ]);

    console.log('Seeding Stylists...');
    await Stylist.insertMany([
      { name: 'Marcus Sterling', role: 'Master Barber', imageUrl: 'https://images.unsplash.com/photo-1618077360395-f3068be8e001?w=800', bio: 'With over 10 years of experience, Marcus specializes in precision fades and classic gentleman cuts.', specializations: ['Fades', 'Hot Towel Shaves'] },
      { name: 'Elena Rossi', role: 'Color Specialist', imageUrl: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=800', bio: 'An artist with color. Elena brings vibrant balayage and corrective color mastery to the salon.', specializations: ['Balayage', 'Color Correction'] },
      { name: 'David Kim', role: 'Senior Stylist', imageUrl: 'https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?w=800', bio: 'Modern styling and texture expert. David crafts styles that are effortless and chic.', specializations: ['Texture', 'Modern Mullets'] },
    ]);

    console.log('Seeding Reviews...');
    await Review.insertMany([
      { name: 'Sarah Jenkins', rating: 5, review: 'Absolutely stunning work by Elena. My hair has never looked this vibrant and healthy. The salon atmosphere is pure luxury.', approved: true },
      { name: 'James Carter', rating: 5, review: 'Marcus is a true professional. The executive grooming package is worth every penny. Clean, sharp, and perfection.', approved: true },
      { name: 'Emily Davis', rating: 4, review: 'Beautiful salon and great service. David understood exactly what I wanted. Highly recommended!', approved: true },
    ]);

    console.log('Data Seeded Successfully! 🌱');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
