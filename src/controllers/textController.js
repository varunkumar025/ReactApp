const textManager = require('../managers/textManager');

const saveText = async (req, res) => {
  try {
    const { text, userEmail } = req.body;
    const savedText = await textManager.saveText(text, userEmail);
    res.status(201).json({ message: 'Text saved successfully', data: savedText });
  } catch (error) {
    console.error('Error saving text:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
const getTextsByUserEmail = async (req, res) => {
  const { userEmail } = req.params;
  try {
    const savedTexts = await textManager.getTextsByUserEmail(userEmail);
    res.status(200).json(savedTexts);
  } catch (error) {
    console.error('Error fetching saved texts by user email:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const deleteTextById = async (req, res) => {
  const { id } = req.params;
  try {
    await textManager.deleteTextById(id);
    res.status(204).send(); // No content response
  } catch (error) {
    console.error('Error deleting text by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
const updateTextById = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  try {
    const updatedText = await textManager.updateTextById(id, text);
    res.json(updatedText);
  } catch (error) {
    console.error('Error updating text:', error.message);
    if (error.message === 'Text not found') {
      return res.status(404).json({ message: 'Text not found' });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = { saveText,getTextsByUserEmail,
  deleteTextById,updateTextById };
