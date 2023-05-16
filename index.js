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

app.get('/api/shorturl/:url', (req, res, next) => {

  urlModel.findOne({ short_url: req.params.url })
    .then(url => {
      // console.log(url.original_url)
      res.status(301).redirect(url.original_url)
    })
});



app.use(bodyParser.urlencoded({ extended: false }));

app.post('/api/shorturl', (req, res, next) => {

  const url = req.body.url.slice(req.body.url.indexOf("w"))

  if (req.body.url.startsWith("https://www.") ||
    req.body.url.startsWith("http://www.")) {

    urlModel.count().then(count => {
      let urlToSave = new urlModel({
        original_url: req.body.url,
        short_url: (count + 1).toString()
      })
      // return urlToSave

    // }).then(urlToSave=>{
    //   let queryUrl= urlToSave.original_url.slice(urlToSave.original_url.indexOf("w"));

      // dns.lookup(queryUrl,(err,address,family)=>{
      //   if(!err){
          urlToSave.save();
          res.json({
            original_url: urlToSave.original_url,
            short_url: parseInt(urlToSave.short_url)
          })
  //       }else {
  //         res.json({
  //           error: 'invalid url'
  //         })
  //       }
  //     })
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
