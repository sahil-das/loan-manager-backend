const mongoose = require('mongoose');

const BorrowSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  name: { type: String },             // ✅ formerly 'note'
  amount: { type: Number },
  description: { type: String },
  type: { type: String },             // 'borrow' or 'repay'
  date: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Borrow', BorrowSchema);
