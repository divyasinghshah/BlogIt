const mongoose=require('mongoose');

const articleSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    createdAt:{
        type:Date,
        default:Date.now

    },
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comment'
    }]
});

const Article=mongoose.model('Article',articleSchema);
module.exports=Article;