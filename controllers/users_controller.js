const User=require('../models/users');


module.exports.signIn=function(req,res){
    res.render('signIn');
}
module.exports.signUp=function(req,res){
    res.render('signUp');
}

module.exports.signOut=function(req,res){
    req.logout();
    req.flash('success','You have been logged out');
    return res.redirect('back');


}

module.exports.create=function(req,res){
    if(req.body.password!=req.body.confirmPassword){
        req.flash('error','Passwords do not match');
        return res.redirect('back');
    }

    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log(err);
            return res.redirect('back');
        }

        if(user){
            req.flash('error','User with this email already exists!!');
            return res.redirect('/user/sign-in');
            
        }
        User.create(req.body,function(err,user){
            if(err){
                req.flash('error',err);
                return res.redirect('back');
            }
            req.flash('success','New User Created!!');
            return res.redirect('/user/sign-in');
        });
    });

}



module.exports.createSession=function(req,res){

    req.flash('success','Logged in Successfully');
    return res.redirect('/');
}

module.exports.profile=function(req,res){
    return res.render('profile');
}


