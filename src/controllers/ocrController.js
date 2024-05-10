const { saveOcrData } = require('../managers/ocrManager');
const ocrDataManager = require('../managers/ocrManager');

const saveOcrDataController = async (req, res) => {
  try {
    const { text, userEmail } = req.body;
    const savedOcrData = await saveOcrData(text, userEmail);
    res.status(201).json({ message: 'OCR data saved successfully', data: savedOcrData });
  } catch (error) {
    console.error('Error saving OCR data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
const getTextsByUserEmail = async (req, res) => {
  const { userEmail } = req.params;
  try {
    const savedTexts = await ocrDataManager.getTextsByUserEmail(userEmail);
    res.status(200).json(savedTexts);
  } catch (error) {
    console.error('Error fetching saved OCR texts by user email:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to delete OCR text by ID
const deleteTextById = async (req, res) => {
  const { id } = req.params;
  try {
    await ocrDataManager.deleteTextById(id);
    res.status(204).send(); // No content response
  } catch (error) {
    console.error('Error deleting OCR text by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
const updateOcrTextById = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  try {
    const updatedText = await ocrDataManager.updateOcrTextById(id, text);

    if (!updatedText) {
      return res.status(404).json({ message: 'Text not found' });
    }

    res.json(updatedText);
  } catch (error) {
    console.error('Error updating OCR text:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  saveOcrDataController,
  getTextsByUserEmail,
  deleteTextById,
  updateOcrTextById
};
