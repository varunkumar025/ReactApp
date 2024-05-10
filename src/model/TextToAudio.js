const mongoose = require('mongoose');

const audioSchema = new mongoose.Schema({
    text: String,
    userEmail: String,
    dateTime: {
      type: Date,
      default: Date.now
    }
});

const TextToAudio = mongoose.model('TextToAudio', audioSchema);

module.exports = TextToAudio;
