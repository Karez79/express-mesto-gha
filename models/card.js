const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({

  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  owner: {
    type: cardSchema.Types.ObjectId,
    required: true,
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});




module.exports = mongoose.model('card', cardSchema);