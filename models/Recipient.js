const mongoose = require('mongoose');
const { Schema } = mongoose;
// Name of the persons email
const recipientSchema = {
  email: String,
  responded: { type: Boolean, default: false }
}

module.exports = recipientSchema;
