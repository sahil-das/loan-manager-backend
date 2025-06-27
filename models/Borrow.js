const mongoose = require('mongoose');

const BorrowSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  amount: Number,
  type: String, // 'borrowed' or 'repaid'
  date: { type: Date, default: Date.now },
  note: String
});

module.exports = mongoose.model('Borrow', BorrowSchema);