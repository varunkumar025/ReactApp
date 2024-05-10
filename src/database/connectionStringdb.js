const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // MongoDB connection URL (MongoDB Atlas URL)
    const mongourl = "mongodb+srv://root:manager@cluster0.jchedl2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

    // Connect to MongoDB using Mongoose
    await mongoose.connect(mongourl, {
      useNewUrlParser: true, // Use new URL parser (deprecated warning in newer versions)
      useUnifiedTopology: true, // Use new server discovery and monitoring engine (deprecated warning in newer versions)
    });

    // Log successful connection
    console.log('Connected to MongoDB');
    console.log('MongoDB URL:', mongourl);
  } catch (error) {
    // Log error if connection fails
    console.error('Error connecting to MongoDB:', error.message);
    // Exit the Node.js process with a non-zero exit code (1)
    process.exit(1);
  }
};

module.exports = connectDB;
