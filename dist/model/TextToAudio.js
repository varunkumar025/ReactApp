"use strict";

var mongoose = require('mongoose');
var audioSchema = new mongoose.Schema({
  text: String,
  userEmail: String,
  dateTime: {
    type: Date,
    "default": Date.now
  }
});
var TextToAudio = mongoose.model('TextToAudio', audioSchema);
module.exports = TextToAudio;