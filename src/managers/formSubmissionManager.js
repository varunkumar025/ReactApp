const FormSubmission = require('../model/ContactForm');

// Manager function to retrieve form submissions by userId
const getSubmissionsByUserId = async (userId) => {
  try {
    const submissions = await FormSubmission.find({ userId });
    return submissions;
  } catch (error) {
    throw new Error('Failed to retrieve form submissions');
  }
};

// Manager function to retrieve all form submissions
const getAllFormSubmissions = async () => {
  try {
    const submissions = await FormSubmission.find();
    return submissions;
  } catch (error) {
    console.error('Error retrieving form submissions:', error);
    throw new Error('Failed to retrieve form submissions from database');
  }
};
const markSubmissionAsUnsolved = async (id) => {
  try {
    const submission = await FormSubmission.findByIdAndUpdate(id, { solved: false }, { new: true });
    return submission;
  } catch (error) {
    console.error('Error marking submission as unsolved:', error);
    throw new Error('Internal server error');
  }
};
const markSubmissionAsSolved = async (id) => {
  try {
    const submission = await FormSubmission.findByIdAndUpdate(id, { solved: true }, { new: true });
    return submission;
  } catch (error) {
    console.error('Error marking submission as solved:', error);
    throw new Error('Internal server error');
  }
};
const submitForm = async (formData) => {
  const { name, email, message } = formData;

  try {
    if (!name.trim() || !email.trim() || !message.trim()) {
      throw new Error('Please fill in all fields');
    }

    const submission = await FormSubmission.create({ name, email, message });

    console.log('Received form submission:');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Message:', message);

    return submission;
  } catch (error) {
    console.error('Error saving form submission:', error.message || error.toString());
    throw new Error('Internal server error');
  }
};


module.exports = {
  getSubmissionsByUserId,
  getAllFormSubmissions,
  submitForm,
  markSubmissionAsUnsolved,
  markSubmissionAsSolved
};
