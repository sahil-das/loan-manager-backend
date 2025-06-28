const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');
const User = require('../models/User');
const Borrow = require('../models/Borrow');

// Get all users and their borrow/repay data
router.get('/users', auth, admin, async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    const usersWithData = await Promise.all(users.map(async user => {
      const entries = await Borrow.find({ userId: user._id });
      return { ...user.toObject(), entries };
    }));
    res.json(usersWithData);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Promote a user to admin
router.post('/promote', auth, admin, async (req, res) => {
  try {
    const { userId } = req.body;
    await User.findByIdAndUpdate(userId, { isAdmin: true });
    res.json({ message: 'User promoted to admin' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
