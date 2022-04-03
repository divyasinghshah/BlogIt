const User=require('../models/users');


module.exports.signIn=function(req,res){
    res.render('signIn');
}
module.exports.signUp=function(req,res){
    res.render('signUp');
}

module.exports.signOut=function(req,res){
    req.logout();
    return res.redirect('back');


}

module.exports.create=function(req,res){
    if(req.body.password!=req.body.confirmPassword){
        return res.redirect('back');
    }

    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log(err);
            return res.redirect('back');
        }

        if(user){
            return res.render('signIn');
        }
        User.create(req.body,function(err,user){
            if(err){
                console.log(err);
                return res.redirect('back');
            }

            return res.render('signIn');
        });
    });

}



module.exports.createSession=function(req,res){
    return res.redirect('/');
}

module.exports.profile=function(req,res){
    return res.render('profile');
}


