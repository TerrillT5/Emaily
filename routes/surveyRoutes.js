const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/emailTemplates/Mailer');
const Survey = mongoose.model('surveys');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

// https://github.com/farhantahir/emaily-app-mern-basics/blob/master/routes/surveys.js

module.exports = app => {
  app.get('/api/surveys/thanks', (req, res) => {
    res.send("Thanks for voiting!");
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
  const { title, subject, body, recipients } = req.body;
  const recipientObjects = recipients
  .split(',')
  .map(recipient => ({ email: recipient
  .trim()}))

  const survey = new Survey({
     title,
     subject,
     body,
     recipients: recipientObjects,
     _user: req.user.id,
     dateSent: Date.now()
   });
   
     // Place to send an email
     const mailer = new Mailer(survey, surveyTemplate(survey));

     try {
       await survey.save();
       await mailer.send();

       req.user.credits -= 1;
       const user = await req.user.save();
       res.send(user);
     } catch (error) {
       res.status(422).send(err);
     }

   });
 }
