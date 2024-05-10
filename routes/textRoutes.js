const express = require('express');
const router = express.Router();
const textController = require('../src/controllers/textController');

router.post('/saveText',textController.saveText);
router.get('/getText/:userEmail', textController.getTextsByUserEmail);

// DELETE route to delete text by ID
router.delete('/deleteText/:id', textController.deleteTextById);

router.put('/updateTextVoicetoText/:id', textController.updateTextById);

module.exports = router;
