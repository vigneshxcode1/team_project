import express from 'express'
import mongoose from 'mongoose'
import user from './Routers/UserRouter.js';
import cors from 'cors'
import studyGroup from './Routers/StudyGroup.js';
import session from './Routers/SessionRouter.js';


const app = express();

const mongodb = "mongodb://localhost:27017/"

app.use(express.json())
app.use(cors())

app.use("/api/study",user)

app.use("/api/group",studyGroup)

app.use("/api/session",session)

mongoose.connect(mongodb).then(()=>{
    console.log("mongodb connected")
})

app.listen(5000,()=>{
    console.log("port success 5000")
})
