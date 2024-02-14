import express from 'express';
const router =  express.Router();
import { getposts,getpost,addpost,deletepost,updatepost } from '../controller/post.js';

router.get('/getposts',getposts);
router.get('/getpost/:id',getpost);
router.post('/addpost',addpost);
router.delete('/deletepost/:id',deletepost);
router.put('/updatepost/:id',updatepost);

export default router;