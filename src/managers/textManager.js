// managers/textManager.js
const TextToAudio = require('../model/TextToAudio');

const saveText = async (text, userEmail) => {
  const textToVoiceModel = new TextToAudio({
    text,
    userEmail,
  });
  await textToVoiceModel.save();
  return textToVoiceModel;
};
const deleteTextById = async (id) => {
  try {
    await TextToAudio.findByIdAndDelete(id);
  } catch (error) {
    throw new Error('Failed to delete text by ID');
  }
};

// Manager function to save text
const getTextsByUserEmail = async (userEmail) => {
  try {
    const savedTexts = await TextToAudio.find({ userEmail });
    return savedTexts;
  } catch (error) {
    throw new Error('Failed to fetch texts by user email');
  }
};

const updateTextById = async (id, newText) => {
  try {
    const updatedText = await TextToAudio.findByIdAndUpdate(id, { text: newText }, { new: true });

    if (!updatedText) {
      throw new Error('Text not found');
    }

    return updatedText;
  } catch (error) {
    throw new Error('Failed to update text');
  }
};

module.exports = { saveText ,getTextsByUserEmail,
  deleteTextById ,updateTextById};

