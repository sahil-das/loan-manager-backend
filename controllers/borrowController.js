const Borrow = require('../models/Borrow');

exports.addEntry = async (req, res) => {
  const { amount, type, note } = req.body;
  const entry = await Borrow.create({ userId: req.user.id, amount, type, note });
  res.json(entry);
};

exports.getSummary = async (req, res) => {
  const data = await Borrow.find({ userId: req.user.id });
  const totalBorrowed = data.filter(e => e.type === 'borrowed').reduce((a, b) => a + b.amount, 0);
  const totalRepaid = data.filter(e => e.type === 'repaid').reduce((a, b) => a + b.amount, 0);
  const outstanding = totalBorrowed - totalRepaid;
  res.json({ data, totalBorrowed, totalRepaid, outstanding });
};

exports.editEntry = async (req, res) => {
  const updated = await Borrow.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteEntry = async (req, res) => {
  await Borrow.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
};