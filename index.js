const express = require('express');
const cors = require('cors');
require('dotenv');
const app = express();
const bodyParser = require('body-parser');
const dns = require('dns');
const { connectDB, urlModel, findUrlToRedirect } = require('./database');
const { validateUrl} = require('./validateUrl');


// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

connectDB()

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');

});

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/api/shorturl', (req, res, next) => {
  
  // if(req.body.url===""||!req.body.url.startsWith("https://")){
  //   res.json({
  //     instancia : "mal formato",
  //     error: 'invalid url'
  //   })
  // }else{
    dns.lookup(req.body.url, (err,address,family) => {
      if (err) {
        res.json({
          errMess: err.message,
          url : req.body.url,
          instancia : "no existe",
          error: 'invalid url'
        })
      } else {
        urlModel.count().then(newUrl => {
  
          let url = new urlModel({
            original_url: `https://${req.body.url}`,
            short_url: newUrl + 1
          })
  
          url.save();
  
          res.json({
            original_url: url.original_url,
            short_url: url.short_url
          })
        });
      }
    }
    )
  // }
});

app.get('/api/shorturl/:url', (req, res, next) => {

  findUrlToRedirect(req.params.url).then(url => {
    return url.original_url
  }).then(url=>res.status(301).redirect(`${url}`))
});


app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
