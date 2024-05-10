const Letter = require('../model/Letter');

// Manager function to save a letter
const saveLetter = async (letterData) => {
  try {
    const newLetter = new Letter(letterData);
    await newLetter.save();
  } catch (error) {
    throw new Error('Failed to save letter');
  }
};

// Manager function to fetch history letters by user email
const getHistoryLettersByUserEmail = async (userEmail) => {
  try {
    const historyLetters = await Letter.find({ userEmail });
    
    return historyLetters;
  } catch (error) {
    throw new Error('Failed to fetch history letters');
  }
};

// Manager function to update a result by ID
const updateResultById = async (id, updatedResultData) => {
  try {
    const updatedResult = await Letter.findByIdAndUpdate(id, updatedResultData, { new: true });

    if (!updatedResult) {
      throw new Error('Result not found');
    }

    return updatedResult;
  } catch (error) {
    throw new Error('Failed to update result');
  }
};

// Manager function to delete a letter by ID
const deleteLetterById = async (id) => {
  try {
    await Letter.findByIdAndDelete(id);
  } catch (error) {
    throw new Error('Failed to delete letter');
  }
};

module.exports = {
  saveLetter,
  getHistoryLettersByUserEmail,
  updateResultById,
  deleteLetterById
};
