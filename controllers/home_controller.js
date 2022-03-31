const Article=require('../models/articles');
module.exports.home=function(req,res){
    Article.find({}).populate('user').exec(function(err,article){
        if(err){
            console.log(err);
            return;
        }
        return res.render('home',{
            articles:article,
            title:"Divya",
            
        });
   });
}