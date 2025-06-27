const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const ACCESS_SECRET = process.env.ACCESS_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: 'User exists' });

  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hash });
  res.status(201).json({ message: 'Registered' });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) return res.status(400).json({ message: 'Invalid' });

  const accessToken = jwt.sign({ id: user._id }, ACCESS_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ id: user._id }, REFRESH_SECRET, { expiresIn: '7d' });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    sameSite: 'Strict',
    secure: false,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({ token: accessToken });
};

exports.refreshToken = (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.sendStatus(401);

  try {
    const data = jwt.verify(token, REFRESH_SECRET);
    const newAccess = jwt.sign({ id: data.id }, ACCESS_SECRET, { expiresIn: '15m' });
    res.json({ token: newAccess });
  } catch {
    res.sendStatus(403);
  }
};

exports.logout = (req, res) => {
  res.clearCookie('refreshToken');
  res.json({ message: 'Logged out' });
};