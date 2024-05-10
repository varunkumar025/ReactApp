"use strict";

var mongoose = require('mongoose');
var OcrSchema = new mongoose.Schema({
  text: String,
  userEmail: String,
  dateTime: {
    type: Date,
    "default": Date.now
  }
});
var OcrData = mongoose.model('OcrData', OcrSchema);
module.exports = OcrData;