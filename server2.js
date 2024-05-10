const express = require('express');
const apiRouter = require('./routes/apiRouter');
const textRoutes = require('./routes/textRoutes');
const dotenv = require("dotenv");
const ocrRoute = require('./routes/ocrRoutes');
const voiceToTextRoutes = require('./routes/voiceToTextRoutes');
const LetterGeneratorRoutes = require('./routes/letterRoutes');
const UserDetails = require('./routes/userRoutes');
const formsubmit = require('./routes/formSubmissionRoutes');

const connectDB = require('./database/connectionStringdb');
const app = express();
connectDB();

app.use(express.json());
dotenv.config();


app.use('/api', apiRouter);
app.use('/api/text', textRoutes);
app.use('/api/ocr', ocrRoute);
app.use('/api/voiceToText', voiceToTextRoutes);
app.use('/api/LetterGenerator', LetterGeneratorRoutes);
app.use('/api/UserData',UserDetails );
app.use('/api/FormSubmission',formsubmit );




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
