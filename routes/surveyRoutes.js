const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/emailTemplates/Mailer');
const Survey = mongoose.model('surveys');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

// https://github.com/farhantahir/emaily-app-mern-basics/blob/master/routes/surveys.js

module.exports = app => {
  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
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

     try {
       await mailer.send();
       await survey.save();
        req.user.credits -= 1;
        const user = await req.user.save();

       res.send(user);
     } catch (err) {
       res.status(422).send(err);
     }
   });

 }
