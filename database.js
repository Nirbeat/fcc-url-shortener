require('dotenv').config();
const mongoose = require('mongoose');
const DB = process.env.DB

function connectDB(){
    mongoose.connect(DB,{useNewUrlParser:true,useUnifiedTopology:true});
}

const urlSchema=new mongoose.Schema({

    original_url: {
        type: String,
        required:true
    },
    short_url:{
        type: Number,
        required: true
    }
});

const urlModel= mongoose.model("url",urlSchema)

async function findUrlToRedirect(requestedUrl){

    return await urlModel.findOne({short_url:requestedUrl});
}

module.exports={connectDB, urlModel, findUrlToRedirect}