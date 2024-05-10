const express = require('express');
const router = express.Router();
const ocrController = require('../src/controllers/ocrController');

// Route to save OCR data
router.post('/saveOcrData', ocrController.saveOcrDataController);
router.get('/getTextocr/:userEmail', ocrController.getTextsByUserEmail);
router.put('/updateTextVoicetoTextOCR/:id', ocrController.updateOcrTextById);
router.delete('/deleteTextocr/:id', ocrController.deleteTextById);

module.exports = router;
