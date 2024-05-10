const mongoose = require('mongoose');


const VoiceToTextSchema = new mongoose.Schema({
    partialResults: [String],
    userEmail: String,
    dateTime: {
      type: Date,
      default: Date.now
    }
  });

const VoiceToTextModel = mongoose.model('VoiceToText', VoiceToTextSchema);
module.exports = VoiceToTextModel;
