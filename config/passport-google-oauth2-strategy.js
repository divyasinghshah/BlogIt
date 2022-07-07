
const passport=require('passport');
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

const crypto=require('crypto');
const User=require('../models/users');

//tell passport to use new strategy
passport.use(new GoogleStrategy({   
    clientID:"614451202602-1l2lequ0a4jo2ci0vc2nbvg132bpv76f.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8000/user/auth/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    //look for user
    User.findOne({email:profile.emails[0].value}).exec(function(err,user){
        if(err){
            console.log(err);
            return;
        }
        console.log(profile);

        if(user){
            //if found set user as req.user
            return done(null,user);
        }
        else{
            //otherwise create a user
            User.create({
                name:profile.displayName,
                email:profile.emails[0].value,
                password:crypto.randomBytes(20).toString('hex')
            },function(err,user){
                if(err){
                    console.log('Error in creating google strategy passport',err);
                    return;
                }
                return done(null,user);
            })
        }
    });
  }
));



module.exports=passport;