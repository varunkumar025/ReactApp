const letterManager = require('../managers/letterManager');

// Controller function to save a letter
const saveLetter = async (req, res) => {
  try {
    await letterManager.saveLetter(req.body);
    res.status(201).send({ message: 'Letter saved successfully' });
  } catch (error) {
    console.error('Error saving letter:', error);
    res.status(500).send({ error: 'Internal server error' });
  }
};

// Controller function to fetch history letters by user email
const getHistoryLetters = async (req, res) => {
  const { userEmail } = req.query;
  try {
    const historyLetters = await letterManager.getHistoryLettersByUserEmail(userEmail);
    res.status(200).json(historyLetters);
  } catch (error) {
    console.error('Error fetching history letters:', error);
    res.status(500).send({ error: 'Internal server error' });
  }
};

// Controller function to update a result by ID
const updateResult = async (req, res) => {
  const { id } = req.params;
  const updatedResultData = req.body;
  try {
    const updatedResult = await letterManager.updateResultById(id, updatedResultData);
    res.status(200).json({ success: true, data: updatedResult });
  } catch (error) {
    console.error('Error updating result:', error);
    res.status(500).send({ success: false, error: 'Internal server error' });
  }
};

// Controller function to delete a letter by ID
const deleteLetter = async (req, res) => {
  const { id } = req.params;
  try {
    await letterManager.deleteLetterById(id);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting letter:', error);
    res.status(500).send({ error: 'Internal server error' });
  }
};

module.exports = {
  saveLetter,
  getHistoryLetters,
  updateResult,
  deleteLetter
};
