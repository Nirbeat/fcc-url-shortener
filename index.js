const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const dns = require('dns');
const { connectDB, urlModel } = require('./database');


// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

connectDB()

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
  
});

app.use(bodyParser.urlencoded({extended:false}));

app.post('/api/shorturl',(req,res,next)=>{

  // dns.lookup(req.body.url,(err,address)=>{

  // })

  // console.log(model.length)
  let url = new urlModel({
    url:req.body.url,
    short_url:1})

    url.save();

    res.json({
      url: url.url,
      short_url: url.short_url
    })

});

app.get('/api/shorturl/:url',(req,res,next)=>{


});


app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
