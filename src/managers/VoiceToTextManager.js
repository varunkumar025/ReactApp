const VoiceToTextModel = require('../model/VoiceToText');

const savePartialResults = async (partialResults, userEmail) => {
  const newPartialResult = new VoiceToTextModel({
    partialResults,
    userEmail
  });
  await newPartialResult.save();
};
const getPartialResultsByUserEmail = async (userEmail) => {
    try {
      const partialResults = await VoiceToTextModel.find({ userEmail });
      return partialResults;
    } catch (error) {
      throw new Error('Failed to retrieve partial results');
    }
  };
  

module.exports = {
  savePartialResults,getPartialResultsByUserEmail
};
