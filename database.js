require('dotenv').config();
const mongoose = require('mongoose');
const DB = process.env.DB

function connectDB(){
    mongoose.connect("mongodb+srv://nirbeat:33enelRefugio@cluster0.au0dubh.mongodb.net/",{useNewUrlParser:true,useUnifiedTopology:true});
}

const urlSchema=new mongoose.Schema({

    original_url: {
        type: String,
        required:true
    },
    short_url:{
        type: String,
        required: true
    }
});

const urlModel= mongoose.model("url",urlSchema)

module.exports={connectDB, urlModel}