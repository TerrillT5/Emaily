const mongoose = require('require');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');

const Survey = mongoose.model('surveys');

module.exports = app => {
  app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
  const { title, subject, body, recipients } = req.body;

  const survey = newSurvey({
     title,
     subject,
     body,
     recipients: recipients.split(',').map(email => ({ email })),
     _user: req.user.id,
     dateSent: Date.now()
     })
   })
 }
