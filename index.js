const express = require('express');
const favicon = require('express-favicon');
const app = express();

app.get('/', (req, res) => {
  res.send({ hi: 'there'});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
