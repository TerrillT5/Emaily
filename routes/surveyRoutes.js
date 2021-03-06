const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/emailTemplates/Mailer');
const Survey = mongoose.model('surveys');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

module.exports = app => {
  app.get('/api/surveys/thanks', (req, res) => {
    res.send("Thanks for voiting!");
  });
  app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
  const { title, subject, body, recipients } = req.body;

  const survey = new Survey({
     title,
     subject,
     body,
     recipients: recipients.split(',').map(recipient => ({ email: recipient.trim() })),
     _user: req.user.id,
     dateSent: Date.now()
   });
     // Place to send an email
     const mailer = new Mailer(survey, surveyTemplate(survey));
     mailer.send();
   });
 }
