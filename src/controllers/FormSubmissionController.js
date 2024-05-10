const formSubmissionManager = require('../managers/formSubmissionManager');

// Controller function to get form submissions by userId
const getSubmissionsByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const submissions = await formSubmissionManager.getSubmissionsByUserId(userId);

    if (!submissions || submissions.length === 0) {
      return res.status(404).json({ message: 'No form submissions found for this user' });
    }

    res.status(200).json({ submissions });
  } catch (error) {
    console.error('Error retrieving form submissions:', error.message || error.toString());
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to get all form submissions
const getAllFormSubmissions = async (req, res) => {
  try {
    const submissions = await formSubmissionManager.getAllFormSubmissions();
    res.status(200).json(submissions);
  } catch (error) {
    console.error('Error retrieving form submissions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
const submitForm = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const submission = await formSubmissionManager.submitForm({ name, email, message });

    res.status(200).json({ success: true, message: 'Form submission successful', submission });
  } catch (error) {
    console.error('Error handling form submission:', error.message || error.toString());
    res.status(500).json({ error: 'Internal server error' });
  }
};
const markSubmissionAsUnsolved = async (req, res) => {
  const { id } = req.params;

  try {
    const submission = await formSubmissionManager.markSubmissionAsUnsolved(id);

    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }

    res.status(200).json(submission);
  } catch (error) {
    console.error('Error marking submission as unsolved:', error.message || error.toString());
    res.status(500).json({ error: 'Internal server error' });
  }
};
const markSubmissionAsSolved = async (req, res) => {
  const { id } = req.params;

  try {
    const submission = await formSubmissionManager.markSubmissionAsSolved(id);

    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }

    res.status(200).json(submission);
  } catch (error) {
    console.error('Error marking submission as solved:', error.message || error.toString());
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = {
  getSubmissionsByUserId,
  getAllFormSubmissions,
  submitForm,
  markSubmissionAsUnsolved,
  markSubmissionAsSolved
};
