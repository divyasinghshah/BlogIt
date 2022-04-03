const express=require('express');
const app=express();
const path=require('path');
const cookieParser=require('cookie-parser');

const db=require('./config/mongoose');
const Article=require('./models/articles');
const User=require('./models/users');
const Comment=require('./models/comments');
const { redirect } = require('express/lib/response');
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const expressLayouts=require('express-ejs-layouts');
const MongoStore=require('connect-mongo');
const flash=require('connect-flash');
const customMiddleware=require('./config/middleware');
app.use(cookieParser());
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));


app.use(session({
    name:'blog',
    secret:'something',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store:MongoStore.create({ mongoUrl: 'mongodb://localhost/blog-db' })

}));




app.use(express.urlencoded());
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMiddleware.setFlash);

app.listen(8000,function(err){
    if(err){
        console.log(err);
        return;
    }
    console.log("Server is up and running on port 8000");
    return;
});
app.use(expressLayouts);

app.use('/',require('./routes'));


// app.get('/',function(req,res){

//     Article.find({}).populate('user').exec(function(err,article){
//         if(err){
//             console.log(err);
//             return;
//         }
//         return res.render('home',{
//             articles:article,
//             title:"Divya",
            
//         });
//    });
// });


    

// app.get('/new-article',function(req,res){
//     res.render('newArticle');
// });
// app.post('/create-article',function(req,res){
//    Article.create({
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
// });

// app.get('/destroy/:id',function(req,res){
//     Article.findById(req.params.id,function(err,article){
//         if(err){console.log(err); return;}
//         if(article.user==req.user.id){
//             article.remove();
//             return res.redirect('back');
//         }else{
//             return res.redirect('back');
//         }
//     });
// });


// app.get('/content/:id',function(req,res){
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

   

   
// });


// app.get('/sign-in',function(req,res){

//     res.render('signIn');

// });

// app.get('/sign-up',function(req,res){

//     res.render('signUp');

// });

// app.get('/sign-out',function(req,res){
//     req.logout();
//     return res.redirect('back');
// });

// app.post('/create',function(req,res){

  
//     if(req.body.password!=req.body.confirmPassword){
//         return res.redirect('back');
//     }

//     User.findOne({email:req.body.email},function(err,user){
//         if(err){
//             console.log(err);
//             return res.redirect('back');
//         }

//         if(user){
//             return res.render('signIn');
//         }
//         User.create(req.body,function(err,user){
//             if(err){
//                 console.log(err);
//                 return res.redirect('back');
//             }

//             return res.render('signIn');
//         });
//     });
// });

// app.post('/create-session',passport.authenticate('local',{failureRedirect:'/sign-in'}),function(req,res){
//     return res.redirect('/');
// });






// app.post('/create-comment',function(req,res){
   
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

//     })

// });


// app.get('/destroy-comment/:id',function(req,res){
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
// })