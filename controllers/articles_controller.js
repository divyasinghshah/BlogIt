const Article=require('../models/articles');
module.exports.new=function(req,res){
    res.render('newArticle');
}

module.exports.create=function(req,res){
    Article.create({
       title:req.body.title,
       description:req.body.description,
       content:req.body.content,
       user:req.user._id
   },function(err,article){
       if(err){
           console.log(err);
           return;
       }
       console.log("Success");
       return res.redirect('back');
   });

}

module.exports.delete=function(req,res){
    Article.findById(req.params.id,function(err,article){
        if(err){console.log(err); return;}
        if(article.user==req.user.id){
            article.remove();
            return res.redirect('back');
        }else{
            return res.redirect('back');
        }
    });
}


module.exports.show=function(req,res){
    Article.findById(req.params.id).populate('user').populate({
        path:'comments',
        populate:{
            path:'user'
        }
    }).exec(function(err,article){
        if(err){console.log(err); return res.redirect('back'); }
        return res.render('content',{
            article:article
        });
    });

}

