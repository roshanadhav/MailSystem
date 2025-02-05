import Mail from "../model/email.js";
import User from "../model/user.js";


export const saveEmail = async (req,res)=>{
    try {
        const mail = new Mail(req.body) ;
        await mail.save() ;
        const user = await User.findById(req.user._id)
        if (user) {
            user.allmail.push(mail._id);
            if (mail.type == 'sent') {
                user.sent.push(mail._id);
            }
            await user.save(); 
        }
        else{
            console.log("mail not save to user ")
        }
        res.status(200).json({ message: "Mail added successfully" });

    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const sendDataofAllMails = async(req , res)=>{
    try {
        let user =await  User.findById(req.user._id).populate('allmail')
        res.status(200).json(user.allmail)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const sendInboxMails = async ( req , res)=>{
    try {
        let user =await  User.findById(req.user._id).populate('inbox')
        res.status(200).json(user.inbox)
    } catch (error) {
        res.status(500).json(error.message)
    }
}


export const sendDataOfStaredMails = async(req , res) =>{
    try {
        let user =await  User.findById(req.user._id).populate('stared')
        res.status(200).json(user.stared)
    } catch (error) {
        res.status(500).json(error.message)
    }
}


export const sendSentEmailData = async(req , res)=>{
    try {
        let user =await  User.findById(req.user._id).populate('sent')
        res.status(200).json(user.sent)
    } catch (error) {
        res.status(500).json(error.message)
    }
}


export const sendDataOfDraftMail = async (req , res)=>{
    try {
        let user =await  User.findById(req.user._id).populate('drafts')
        res.status(200).json(user.drafts)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const sendDataOfBin = async (req , res )=>{
    try {
        let user =await  User.findById(req.user._id).populate('bin')
        res.status(200).json(user.bin)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const signupUser = async(req,res)=>{
    const {username,password} = req.body ;
    const newUser = new User({
        username : username
    })
    const registredUser = await User.register(newUser , `${password}`)
    req.login(registredUser,(err)=>{
        if (err) {
            res.status(200).json("not ok")
        } else {
            req.session.user = registredUser ;
            res.status(200).json("ok")
        }
    })
  }


export const signinUser  =  async (req,res)=>{
    req.session.user = req.user ;
    res.status(200).json("ok")
}
