const mongoose = require('mongoose');

const OcrSchema = new mongoose.Schema({
  text: String,
  userEmail: String,
  dateTime: {
    type: Date,
    default: Date.now
  }
});

const OcrData = mongoose.model('OcrData', OcrSchema);

module.exports = OcrData;
