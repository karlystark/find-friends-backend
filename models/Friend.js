const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  homeCity: {
    type: String,
    required: true,
  },
  locations: [
    {
      city: {
        type: String,
        required: true,
      },
      startDate: {
        type: Date,
      },
      endDate: {
        type: Date,
      },
    },
  ],
});

module.exports = mongoose.model('Friend', friendSchema);
