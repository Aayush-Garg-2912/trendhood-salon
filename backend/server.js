const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const serviceRoutes = require('./routes/serviceRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const contactRoutes = require('./routes/contactRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const stylistRoutes = require('./routes/stylistRoutes');

// Connect to database
connectDB();

// Seed Default Admin
const { seedAdmin } = require('./controllers/adminController');
seedAdmin();

const app = express();

// Middleware
app.use(cors({
  origin: ["https://trendhoodsalon.netlify.app", "http://localhost:5174", "http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const PORT = process.env.PORT || 5000;

app.use('/api/services', serviceRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/stylists', stylistRoutes);
app.use('/api/gallery', require('./routes/galleryRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

app.get('/', (req, res) => {
  res.send('Trendhood Hair Salon API is running');
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'An internal server error occurred.' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
