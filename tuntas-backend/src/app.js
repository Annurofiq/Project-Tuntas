const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Routes
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'TUNTAS API berjalan.',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/auth', authRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint tidak ditemukan.'
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    success: false,
    message: 'Terjadi kesalahan pada server.'
  });
});

module.exports = app;
