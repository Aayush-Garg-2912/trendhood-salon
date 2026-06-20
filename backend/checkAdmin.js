require('dotenv').config();
const mongoose = require('mongoose');
const { seedAdmin } = require('./controllers/adminController');
const Admin = require('./models/Admin');

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await seedAdmin();
  const admins = await Admin.find();
  console.log('Admins in DB:', admins);
  process.exit(0);
}).catch(console.error);
