const Article=require('../models/articles');

module.exports.new=function(req,res){
    res.render('newArticle');
}



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

module.exports.update= async function(req,res){
    try{
        let article= await Article.findById(req.params.id);
    
        if(article.user==req.user.id){
            return res.render('newArticle',{
                article:article
            });
    
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



module.exports.show= async function(req,res){
    try{

        let article= await Article.findById(req.params.id).populate({
            path:'comments',
            populate:{
                path:'user'
            }
        }).populate('user').exec();
    
        return res.render('content',{
            article:article
        });

    }catch(err){
        console.log(err);
        return res.redirect('back');
    }  

    
}
