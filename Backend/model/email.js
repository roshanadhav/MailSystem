import mongoose from "mongoose";

const mailSchem = new mongoose.Schema({
    from : {
        type:String , 
        required:true,
    },
    to:{
        type:String,
        required:true 
    },
    subject:{
        type:String
    },
    body:{
        type:String , 
    },
    date:{
        type:Date , 
        required:true
    },
    image:String,
    name:{
        type:String, 
        required:true 
    },
    stared : {
        type : Boolean ,
        required:true ,
        default : false 
    },
    bin : {
        type:Boolean , 
        required : true ,
        default:false 
    },
    type:String

})

const Mail = mongoose.model('Mail' , mailSchem) ;

export default Mail ;


