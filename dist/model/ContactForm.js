"use strict";

var mongoose = require('mongoose');
var FormSubmissionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function validator(v) {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
      },
      message: function message(props) {
        return "".concat(props.value, " is not a valid email address!");
      }
    }
  },
  message: {
    type: String,
    required: true
  },
  submittedAt: {
    type: Date,
    "default": Date.now
  },
  solved: {
    type: Boolean,
    "default": false // Default to unsolved
  }
});
var FormSubmission = mongoose.model('FormSubmission', FormSubmissionSchema);
module.exports = FormSubmission;