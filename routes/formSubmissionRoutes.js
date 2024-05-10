const express = require('express');
const router = express.Router();
const formSubmissionController = require('../src/controllers/FormSubmissionController');


// GET route to retrieve form submissions by userId (protected by authentication)
// GET route to retrieve form submissions by userId (protected by authentication)
router.get('/submissions/:userId', formSubmissionController.getSubmissionsByUserId);
router.put('/formsubmissions/:id/unsolved', formSubmissionController.markSubmissionAsUnsolved);

router.put('/formsubmissions/:id/solved', formSubmissionController.markSubmissionAsSolved);

// GET route to retrieve all form submissions (protected by authentication)
router.get('/formsubmissions', formSubmissionController.getAllFormSubmissions);
router.post('/submit-form', formSubmissionController.submitForm);

module.exports = router;
