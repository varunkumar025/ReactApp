"use strict";

var mongoose = require('mongoose');
var VoiceToTextSchema = new mongoose.Schema({
  partialResults: [String],
  userEmail: String,
  dateTime: {
    type: Date,
    "default": Date.now
  }
});
var VoiceToTextModel = mongoose.model('VoiceToText', VoiceToTextSchema);
module.exports = VoiceToTextModel;