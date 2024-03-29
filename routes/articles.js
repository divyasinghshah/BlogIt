const express=require('express');
const router=express.Router();

const articleController=require('../controllers/articles_controller');

router.get('/new-article',articleController.new);
router.post('/create-article',articleController.create);
router.get('/destroy/:id',articleController.delete);
router.get('/content/:id',articleController.show);
router.get('/edit/:id',articleController.edit);
router.post('/edit-article/:id',articleController.update);



module.exports=router;