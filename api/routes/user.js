import express from 'express';
const router =  express.Router();
import {user} from '../controller/user.js'

router.get("/",user);

export default router;