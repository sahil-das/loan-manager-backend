const Borrow = require('../models/Borrow');

exports.addEntry = async (req, res) => {
  const { amount, type, name, description, date } = req.body;

  const entry = await Borrow.create({
    userId: req.user.userId,
    amount,
    type,
    name,
    description,
    date, // ✅ Add this line
  });

  res.json(entry);
};

exports.getSummary = async (req, res) => {
  const data = await Borrow.find({ userId: req.user.userId });

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

  const entry = await Borrow.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.userId },
    req.body,
    { new: true }
  );

  if (!entry) return res.status(403).json({ message: 'Forbidden' });

  res.json(entry);
};

exports.deleteEntry = async (req, res) => {

  const entry = await Borrow.findOneAndDelete({
    _id: req.params.id,
    userId: req.user.userId,
  });

  if (!entry) return res.status(403).json({ message: 'Forbidden' });

  res.json({ message: 'Deleted' });
};
