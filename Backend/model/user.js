import mongoose from "mongoose";
const {Schema} = mongoose ; 
import passportLcoalMongoose from 'passport-local-mongoose'


const userSchema = new Schema({
    allmail  : [ {
        type:Schema.Types.ObjectId ,
        ref : "Mail"
    }] ,
    sent : [ {
        type:Schema.Types.ObjectId ,
        ref : "Mail"
    }] ,

    stared : [ {
        type:Schema.Types.ObjectId ,
        ref : "Mail"
    }] ,
    bin : [ {
        type:Schema.Types.ObjectId ,
        ref : "Mail"
    }],
    drafts : [ {
        type:Schema.Types.ObjectId ,
        ref : "Mail"
    }],
    inbox : [ {
        type:Schema.Types.ObjectId ,
        ref : "Mail"
    }]
})

userSchema.plugin(passportLcoalMongoose)

const User = mongoose.model("User",userSchema)
export default User ;