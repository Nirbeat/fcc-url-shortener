const express = require('express');
const cors = require('cors');
require('dotenv');
const app = express();
const bodyParser = require('body-parser');
const dns = require('dns');
const { connectDB, urlModel } = require('./database');


// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

connectDB()

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');

});

app.get('/api/shorturl/:short_url', (req, res, next) => {

  urlModel.findOne({ short_url: req.params.short_url })
    .then(url => {
      res.status(301).redirect(url.original_url)
    })
});



app.use(bodyParser.urlencoded({ extended: false }));

app.post('/api/shorturl', (req, res, next) => {

  //ANALIZAR QUE ESTA PASANDO CON EL FETCH DEL FRONTEND DE FCC
  const url = req.body.url;

  if (url.startsWith("https://") ||
    url.startsWith("http://")) {

    urlModel.count().then(count => {
      let urlToSave = new urlModel({
        original_url: url,
        short_url: (count + 1).toString()
      })
      return urlToSave

    }).then(urlToSave => {

      let queryUrl = new URL(url);

      dns.lookup(queryUrl.hostname, (err, address, family) => {
        if (!err) {
          urlToSave.save();
          res.json({
            original_url: urlToSave.original_url,
            short_url: parseInt(urlToSave.short_url)
          })
        } else {
          res.json({
            error: 'invalid url'
          })
        }
      })
    })
  }
  else {
    res.json({
      error: 'invalid url'
    })
  }
})

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
