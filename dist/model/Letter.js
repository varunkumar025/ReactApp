"use strict";

var mongoose = require('mongoose');
var LetterSchema = new mongoose.Schema({
  senderName: String,
  senderAddress: String,
  senderPhone: String,
  senderEmail: String,
  date: String,
  recipientName: String,
  recipientTitle: String,
  recipientCompany: String,
  recipientAddress: String,
  salutation: String,
  body: String,
  closing: String,
  enclosures: String,
  subjectLine: String,
  referenceNumber: String,
  cc: String,
  userEmail: String,
  dateTime: {
    type: Date,
    "default": Date.now
  }
});
var Letter = mongoose.model('Letter', LetterSchema);
module.exports = Letter;