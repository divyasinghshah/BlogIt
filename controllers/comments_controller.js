const Article=require('../models/articles');
const Comment=require('../models/comments');

// module.exports.create=function(req,res){
//     Article.findById(req.body.article,function(err,article){
//         if(err){ console.log(err); return res.redirect('back');}
//         if(article){
//             Comment.create({
//                 content:req.body.content,
//                 article:req.body.article,
//                 user:req.user._id
//             },function(err,comment){
//                 if(err){ console.log(err); return res.redirect('back');}
//                 article.comments.push(comment);
//                 article.save();
//                 res.redirect('back');
//             });
//         }

//     });

// }

module.exports.create= async function(req,res){
    
    try{
        let article= await Article.findById(req.body.article);
        if(article){
            let comment= await Comment.create({
                    content:req.body.content,
                    article:req.body.article,
                    user:req.user._id
            });
            article.comments.push(comment);
            article.save();
            res.redirect('back');
        }

    }catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

// module.exports.delete=function(req,res){
//     Comment.findById(req.params.id,function(err,comment){
//         if(comment.user==req.user.id){
//             let articleId=comment.article;
//             comment.remove();
//            Article.findByIdAndUpdate(articleId,{$pull:{comments:req.params.id}},function(err,article){
//                return res.redirect('back');
//            })
//         }else{
//             return res.redirect('back');
//         }
//     })

// }
module.exports.delete= async function(req,res){
    try{
        let comment= await Comment.findById(req.params.id);
        if(comment.user==req.user.id){
            let articleId=comment.article;
            comment.remove();
            let article= await Article.findByIdAndUpdate(articleId,{$pull:{comments:req.params.id}});
            return res.redirect('back');
        }

    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
   

}



