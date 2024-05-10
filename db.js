const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongourl = "mongodb+srv://root:manager@cluster0.jchedl2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    await mongoose.connect(mongourl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
    console.log('MongoDB URL:', mongourl);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

const UserDetailsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    }
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  userType: {
    type: String,
    enum: ['regular', 'developer'],
    default: 'regular'
  },
  dateTime: {
    type: Date,
    default: Date.now
  }
});



const FormSubmissionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    }
  },
  message: {
    type: String,
    required: true
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  solved: {
    type: Boolean,
    default: false, // Default to unsolved
  },
});

const LetterSchema = new mongoose.Schema({
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
    default: Date.now
  }
});

const VoiceToTextSchema = new mongoose.Schema({
  partialResults: [String],
  userEmail: String,
  dateTime: {
    type: Date,
    default: Date.now
  }
});

const audioSchema = new mongoose.Schema({
  text: String,
  userEmail: String,
  dateTime: {
    type: Date,
    default: Date.now
  }
});
const OcrSchema = new mongoose.Schema({
  text: String,
  userEmail: String,
  dateTime: {
    type: Date,
    default: Date.now
  }
});


// Define Mongoose model using the audio schema
const TextToAudio = mongoose.model('TextToAudio', audioSchema);
const OcrData = mongoose.model('OcrData', OcrSchema);
const VoiceToTextModel = mongoose.model('VoiceToText', VoiceToTextSchema);
const FormSubmission = mongoose.model('FormSubmission', FormSubmissionSchema);
const Letter = mongoose.model('Letter', LetterSchema);

module.exports = { connectDB, FormSubmission, Letter, VoiceToTextModel, TextToAudio,OcrData };
