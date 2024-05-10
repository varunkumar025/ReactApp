const express = require('express');
const router = express.Router();
const { savePartialResultsController } = require('../src/controllers/VoiceToTextController');
const partialResultsController = require('../src/controllers/VoiceToTextController');

router.post('/save-partial-results', savePartialResultsController);
router.get('/partial-results/:userEmail', partialResultsController.getPartialResultsByUserEmail);

module.exports = router;
