const express = require('express');
const {
  registerUser,
  loginUser,
  logoutUser,
  getProfile,
  refreshToken
} = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.post('/refresh-token', refreshToken);
router.get('/me', authMiddleware, getProfile);

module.exports = router;
