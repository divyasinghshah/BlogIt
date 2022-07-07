const req = require('express/lib/request');
const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const User=require('../models/users');


passport.use(new LocalStrategy({
    usernameField:'email',
    passReqToCallback:true
},
function(req,email,password,done){
    User.findOne({email:email},function(err,user){
        if(err){
            req.flash('error',err);
            //some error
            return done(err);
        }
        if(!user || user.password!=password){
            req.flash('error','Invalid Username/ Password');
            //no error but authentication is false
            return done(null,false);

        }
        

        return done(null,user);
    });
}

));

//serializing the user to decide which key to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
});

//deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log(err);
            return done(user);
        }

        return done(null,user);
    });
});

//middleware to check if user is authenticated or not
passport.checkAuthentication=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }

    return res.redirect('/user/sign-in');
    
}


//to set the data of signed in user into locals
passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user=req.user;
    }
    next();
}

module.exports=passport;
