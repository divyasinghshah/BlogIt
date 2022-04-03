const Article=require('../models/articles');

module.exports.new=function(req,res){
    res.render('newArticle');
}

// module.exports.create= function(req,res){
//     Article.create({
//        title:req.body.title,
//        description:req.body.description,
//        content:req.body.content,
//        user:req.user._id
//    },function(err,article){
//        if(err){
//            console.log(err);
//            return;
//        }
//        console.log("Success");
//        return res.redirect('back');
//    });

// }

module.exports.create= async function(req,res){
    try{

        let article= await  Article.create({
            title:req.body.title,
            description:req.body.description,
            content:req.body.content,
            user:req.user._id
        });
        console.log("Success");
        req.flash('success','New Blog Created Successfully!!');
        return res.redirect('/');
    }
    catch(err){
        console.log(err);
        req.flash('error','Some Error occurred!!');
        return res.redirect('back');

    }
  

}

// module.exports.delete=function(req,res){
//     Article.findById(req.params.id,function(err,article){
//         if(err){console.log(err); return;}
//         if(article.user==req.user.id){
//             article.remove();
//             return res.redirect('back');
//         }else{
//             return res.redirect('back');
//         }
//     });
// }

module.exports.delete= async function(req,res){
    try{
        let article= await Article.findById(req.params.id);
    
        if(article.user==req.user.id){
            article.remove();
            req.flash('success','Blog Deleted Successfully!!');
            return res.redirect('back');
    
        }else{
            req.flash('error','Wrong User!!');
            return res.redirect('back');
        }

    }
    catch(err){
        console.log(err);
        return;
    }
   

}


// module.exports.show=function(req,res){
//     Article.findById(req.params.id).populate('user').populate({
//         path:'comments',
//         populate:{
//             path:'user'
//         }
//     }).exec(function(err,article){
//         if(err){console.log(err); return res.redirect('back'); }
//         return res.render('content',{
//             article:article
//         });
//     });

// }

module.exports.show= async function(req,res){
    try{

        let article= await Article.findById(req.params.id).populate({
            path:'comments',
            populate:{
                path:'user'
            }
        }).exec();
    
        return res.render('content',{
            article:article
        });

    }catch(err){
        console.log(err);
        return res.redirect('back');
    }  

    
}
