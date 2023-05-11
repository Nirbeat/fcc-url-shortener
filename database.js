require('dotenv').config();
const mongoose = require('mongoose');
const DB = process.env.DB

function connectDB(){
    mongoose.connect(DB,{useNewUrlParser:true,useUnifiedTopology:true});
}

const urlSchema=new mongoose.Schema({

    url: {
        type: String,
        required:true
    },
    short_url:{
        type: Number,
        required: true
    }
});

const urlModel= mongoose.model("url",urlSchema)

module.exports={connectDB, urlModel}