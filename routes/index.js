const express=require('express');
const router=express.Router();
const homeController=require('../controllers/home_controller');
router.get('/',homeController.home);

router.use('/article',require('./articles'));
router.use('/user',require('./users'));
router.use('/comment',require('./comments'));

module.exports=router;