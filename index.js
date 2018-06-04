const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// app.get('/', (req, res) => {
//   res.send({ hi: 'there'});
// });
//
// app.listen(PORT);
express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
