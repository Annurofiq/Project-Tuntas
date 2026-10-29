const express = require('express');
const rateLimit = require('express-rate-limit');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Limit each IP to 20 requests per `window` (here, per 15 minutes)
  message: {
    success: false,
    message: 'Terlalu banyak permintaan, silakan coba lagi setelah 15 menit.'
  }
});

router.post('/register', authLimiter, authController.register);
router.post('/login', authLimiter, authController.login);
router.post('/logout', authMiddleware, authController.logout);
router.get('/me', authMiddleware, authController.getMe);

module.exports = router;
