import mongoose, { Mongoose, model } from "mongoose";


const chatSchema = new mongoose.Schema({
 group:{
    type:mongoose.Types.ObjectId,
    ref:"Studygroup"
 },
 sender:{
    type:mongoose.type.ObjectId,
    ref:"Usermembers"
 },
 message:{
    type:String
 },
timestamps:{
    type:Date,
    default:Date.now()
}

},{timestamps:true})

const chatmodel =  mongoose.model("chats",chatSchema)

export default chatmodel;