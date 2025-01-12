import express from 'express';
import { creategroup, getGroupsBySubject, getGroupsByexampreparation, getGroupsBytopic, getallgroup,  getallmyjoingroup,  joingroup, leavegroup } from '../controllers/GroupController.js';
import authMiddleware from '../authmiddleware.js';

const router = express.Router();


router.post("/creategroup",authMiddleware,creategroup);
router.get("/getallgroup",getallgroup);
router.get("/getGroupsBySubject/:subject",getGroupsBySubject)
router.get("/getGroupsBytopic/:topic",getGroupsBytopic)
router.get("/getGroupsByexampre/:exampreparation",getGroupsByexampreparation)
router.get("/joingroup/:id",authMiddleware,joingroup)
router.get("/getalljoingroup/:id",authMiddleware,getallmyjoingroup)
router.post("/leavegroup/:id",authMiddleware,leavegroup)
export default router