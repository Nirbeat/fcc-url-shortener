require('dotenv').config();
const mongoose = require('mongoose');
const DB = process.env.DB

function connectDB(){
    mongoose.connect(DB,{useNewUrlParser:true,useUnifiedTopology:true});
}

function createUrlModel(done){

    if(error) return done(error);
    done(null,result);
}

module.exports={connectDB}