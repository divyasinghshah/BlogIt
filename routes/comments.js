const express=require('express');
const router=express.Router();
const commentsController=require('../controllers/comments_controller');
router.post('/create-comment',commentsController.create);   
router.get('/destroy-comment/:id',commentsController.delete); 


module.exports=router;