import mongoose from "mongoose";


const StudyGroup = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        default:""
    },
    subject:{
        type:String,
        required:true
    },
    topic:[{
        type:String,
        default:["genral"]
    }],
    exampreparation:[{
        type:String
    }],
    StudyStyle:{
        type:String,
      default:"flexible"  

    },
    MaxMember:{
        type:String,
        default:30,
    },
    members:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Usermembers"
    }],


    isVirtual:{
        type:Boolean,
        default:true
    },
    location:{
        type:String,
        default:"online"
    },
    upcomingSession:[{
        date:{type:Date},
        location:{
            type:String,
            default:""
        }
    }],
    

},{timestamps:true})


const StudyGroupmodel = new mongoose.model("studyGroup",StudyGroup)

export default StudyGroupmodel