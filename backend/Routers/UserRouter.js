import express from 'express';
import { login, register, updateprofile } from '../controllers/UserControllers.js';
import  authmiddle  from '../authmiddleware.js';


const router = express.Router();

router.post("/register",register)
router.post("/login",login)
router.put('/updateprofile', authmiddle, updateprofile);


export default router