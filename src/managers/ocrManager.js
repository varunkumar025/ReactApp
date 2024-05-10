const OcrData = require('../model/ImageToText');

const saveOcrData = async (text, userEmail) => {
  const ocrData = new OcrData({
    text,
    userEmail,
  });
  await ocrData.save();
  return ocrData;
};
const getTextsByUserEmail = async (userEmail) => {
  try {
    const savedTexts = await OcrData.find({ userEmail });
    return savedTexts;
  } catch (error) {
    throw new Error('Failed to fetch OCR texts by user email');
  }
};

const deleteTextById = async (id) => {
  try {
    await OcrData.findByIdAndDelete(id);
  } catch (error) {
    throw new Error('Failed to delete OCR text by ID');
  }
};
const updateOcrTextById = async (id, newText) => {
  try {
    const updatedText = await OcrData.findByIdAndUpdate(id, { text: newText }, { new: true });
    return updatedText;
  } catch (error) {
    throw new Error(`Failed to update OCR text: ${error.message}`);
  }
};

module.exports = {
   saveOcrData, 
   getTextsByUserEmail,
  deleteTextById,updateOcrTextById };
