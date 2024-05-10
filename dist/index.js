"use strict";

var express = require('express');
var apiRouter = require('../routes/apiRouter');
var textRoutes = require('../routes/textRoutes');
var dotenv = require("dotenv");
var ocrRoute = require('../routes/ocrRoutes');
var voiceToTextRoutes = require('../routes/voiceToTextRoutes');
var LetterGeneratorRoutes = require('../routes/letterRoutes');
var UserDetails = require('../routes/userRoutes');
var formsubmit = require('../routes/formSubmissionRoutes');
var connectDB = require('./database/connectionStringdb');
var app = express();
connectDB();
app.use(express.json());
dotenv.config();
app.use('/api', apiRouter);
app.use('/api/text', textRoutes);
app.use('/api/ocr', ocrRoute);
app.use('/api/voiceToText', voiceToTextRoutes);
app.use('/api/LetterGenerator', LetterGeneratorRoutes);
app.use('/api/UserData', UserDetails);
app.use('/api/FormSubmission', formsubmit);
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log("Server is running on port ".concat(PORT));
});