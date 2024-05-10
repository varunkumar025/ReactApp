const express = require('express');
const router = express.Router();
const letterController = require('../src/controllers/LetterController');

// PUT route to update letter result by ID
router.post('/saveLetter', letterController.saveLetter);

// GET route to fetch history letters by user email
router.get('/historyLetters', letterController.getHistoryLetters);

// PUT route to update a result by ID
router.put('/updateResult/:id', letterController.updateResult);

// DELETE route to delete a letter by ID
router.delete('/deleteLetter/:id', letterController.deleteLetter);
module.exports = router;
