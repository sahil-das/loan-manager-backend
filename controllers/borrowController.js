const Borrow = require('../models/Borrow');

exports.addEntry = async (req, res) => {
  const { amount, type, name, description } = req.body;
  console.log('[addEntry] userId:', req.user.userId, 'amount:', amount, 'type:', type, 'name:', name, 'description:', description);

  const entry = await Borrow.create({
    userId: req.user.userId,
    amount,
    type,
    name,
    description,
  });

  res.json(entry);
};

exports.getSummary = async (req, res) => {
  console.log('[getSummary] userId:', req.user.userId);
  const data = await Borrow.find({ userId: req.user.userId });
  console.log('[getSummary] found entries:', data);

  const totalBorrowed = data
    .filter((e) => e.type === 'borrow')
    .reduce((a, b) => a + b.amount, 0);

  const totalRepaid = data
    .filter((e) => e.type === 'repay')
    .reduce((a, b) => a + b.amount, 0);

  const outstanding = totalBorrowed - totalRepaid;

  res.json({ data, totalBorrowed, totalRepaid, outstanding });
};

exports.editEntry = async (req, res) => {
  console.log('[editEntry] userId:', req.user.userId, 'entryId:', req.params.id, 'update:', req.body);

  const entry = await Borrow.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.userId },
    req.body,
    { new: true }
  );

  if (!entry) return res.status(403).json({ message: 'Forbidden' });

  res.json(entry);
};

exports.deleteEntry = async (req, res) => {
  console.log('[deleteEntry] userId:', req.user.userId, 'entryId:', req.params.id);

  const entry = await Borrow.findOneAndDelete({
    _id: req.params.id,
    userId: req.user.userId,
  });

  if (!entry) return res.status(403).json({ message: 'Forbidden' });

  res.json({ message: 'Deleted' });
};
