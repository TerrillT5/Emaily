const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

// The name of the persons email
// conforms to the recipients
// Survey & Recipient are separated for mongoDB storage capacity
const surveySchema = new Schema({
  title: String,
  email: String,
  body: String,
  subject: String,
  recipients:[RecipientSchema], // Email names to be sent
  yes: {
     type: Number,
     default: 0
   },
  no: {
     type: Number,
      default: 0
  },
  _user: {
    type: Schema.Types.ObjectId,
     ref: 'User'
   },
  dateSent: Date,
  lastResponded: Date
 });

mongoose.model('surveys', surveySchema);
