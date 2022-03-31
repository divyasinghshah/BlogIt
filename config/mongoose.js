const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/blog-db');
const db=mongoose.connection;

db.on('error',console.error.bind(console,'Error in connecting db'));

db.once('open',function(){
    console.log("Successfully connected to db");
});
