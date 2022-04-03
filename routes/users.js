const express=require('express');

const router=express.Router();
const passport=require('passport');
const userController=require('../controllers/users_controller');

router.get('/sign-in',userController.signIn);

router.get('/sign-up',userController.signUp);
router.get('/sign-out',userController.signOut);

router.post('/create',userController.create);

router.post('/create-session',passport.authenticate('local',{failureRedirect:'/user/sign-up'}),userController.createSession);

router.get('/profile',userController.profile);

module.exports=router;