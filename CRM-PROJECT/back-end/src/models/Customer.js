const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'new',
    enum: ['new', 'contacted', 'interested', 'not_interested', 'converted'],
  },
  preferences: [String],
  purchaseHistory: [
    {
      type: String,
    },
  ],
  followUpActions: [
    {
      action: String,
      date: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model('Customer', CustomerSchema);