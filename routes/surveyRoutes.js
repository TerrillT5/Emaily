const mongoose = require('require');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const Survey = mongoose.model('surveys');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

module.exports = app => {
  app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
  const { title, subject, body, recipients } = req.body;

  const survey = newSurvey({
     title,
     subject,
     body,
     recipients: recipients.split(',').map(email => ({ email })).trim(),
     _user: req.user.id,
     dateSent: Date.now()
     })
     // Place to send an email
     const mailer = new Mailer(survey, surveyTemplate(survey));
     mailer.send();
   });
 }
