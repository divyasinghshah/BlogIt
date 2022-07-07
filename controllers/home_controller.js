const Article=require('../models/articles');
module.exports.home= async function(req,res){
    try{
        let article=await Article.find({}).populate('user').exec();
        
        return res.render('home',{
            articles:article,
            title:"Divya"
        });

    }
    catch(err){
        console.log(err);
        return res.redirect('back');

    }
    
    
}