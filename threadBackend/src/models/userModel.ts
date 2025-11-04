import mongoose from "mongoose"

const schema = new mongoose.Schema({

    name:{type:String,required:true},
    googleId:{type:String,unique:true,sparse:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,select:false},
    gender:{type:String,select:false},
    avatar:{type:String},
    verified:{type:Boolean,default:false},
    watching:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
    },
    ],
    watched:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course",
        },
    ],
    saved:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course",
        },
    ],
    role:{
        type:String,
        enum:["user","admin","instructor"],
        default:"user",
    },
    verificationToken:{type:String},
    verificationExpires:{type:Date},
    passwordResetToken:{type:String},
    passwordResetExpires:{type:Date},

},
{
    timestamps:true,
}
);


export const User = mongoose.model("User",schema);