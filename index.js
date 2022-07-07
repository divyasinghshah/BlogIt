
// web framework
const express=require('express');
const app=express();

const path=require('path');
const db=require('./config/mongoose');

const cookieParser=require('cookie-parser');
const Article=require('./models/articles');
const User=require('./models/users');
const Comment=require('./models/comments');
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const expressLayouts=require('express-ejs-layouts');
const MongoStore=require('connect-mongo');
const flash=require('connect-flash');
const customMiddleware=require('./config/middleware');
const passportGoogle=require('./config/passport-google-oauth2-strategy');


//template engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

//middleware to store form data into req.body objectu
app.use(express.urlencoded());

// look for assets in assets folder
app.use(express.static('./assets'));

//use layouts for views
app.use(expressLayouts);


//extract styles of subpages into layout
app.set('layout extractStyles',true);

//to create cookies
app.use(cookieParser());

//middleware to encrypt/decrypt cookies
app.use(session({
    name:'blog',
    secret:'something',
    saveUninitialized:false,
    resave:false,
    cookie:{
        //100min
        maxAge:(1000*60*100)
    },
    store:MongoStore.create(
        { mongoUrl: 'mongodb://localhost/blog-db' },
        function(err){
            console.log(err);
        }
        
        )

}));

//initialize passport
app.use(passport.initialize());

//passport helps in maintaining sessions
app.use(passport.session());

//if user is signed in set the user data into locals
app.use(passport.setAuthenticatedUser);

//setup to use flash
app.use(flash());

//use middleware to set flash messages
app.use(customMiddleware.setFlash);

app.listen(8000,function(err){
    if(err){
        console.log(err);
        return;
    }
    console.log("Server is up and running on port 8000");
    
    return;
});


app.use('/',require('./routes'));



