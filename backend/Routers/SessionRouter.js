import express from 'express';
import { createSession, getSessions } from '../controllers/Session.js';

const router = express.Router();


router.post("/createsession",createSession);
router.get("/session/:groupid",getSessions)


export default router;