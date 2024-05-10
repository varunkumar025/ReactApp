const { savePartialResults } = require('../managers/VoiceToTextManager');
const partialResultsManager = require('../managers/VoiceToTextManager');


const savePartialResultsController = async (req, res) => {
  const { partialResults, userEmail } = req.body;
  try {
    await savePartialResults(partialResults, userEmail);
    res.status(200).json({ message: 'Partial results saved successfully' });
  } catch (error) {
    console.error('Error saving partial results:', error.message);
    res.status(500).json({ error: 'Failed to save partial results' });
  }
};
const getPartialResultsByUserEmail = async (req, res) => {
    const { userEmail } = req.params;
    try {
      const partialResults = await partialResultsManager.getPartialResultsByUserEmail(userEmail);
      res.status(200).json({ partialResults });
    } catch (error) {
      console.error('Error retrieving partial results:', error.message);
      res.status(500).json({ error: 'Failed to retrieve partial results' });
    }
  };

module.exports = {
  savePartialResultsController,getPartialResultsByUserEmail
};
