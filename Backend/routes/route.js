import express, { Router } from "express"
import { saveEmail ,sendInboxMails, sendDataofAllMails,sendDataOfBin ,signupUser , signinUser ,sendDataOfStaredMails , sendSentEmailData ,sendDataOfDraftMail } from "../controller/email-contorller.js";
import Mail from "../model/email.js";
import passport from "passport";
const router = express.Router() ;
import { isUserLoggedin } from "../middelware/middelware.js";


router.post('/save' ,isUserLoggedin, saveEmail);

router.get("/inbox" ,isUserLoggedin, sendInboxMails)

router.get("/stared" ,isUserLoggedin, sendDataOfStaredMails)

router.get("/sent" ,isUserLoggedin, sendSentEmailData)

router.get("/draft" ,isUserLoggedin, sendDataOfDraftMail)

router.get('/bin' ,isUserLoggedin, sendDataOfBin)

router.get('/allmail' ,sendDataofAllMails )

router.get('/isLogin' , (req , res) => {
    if (req.isAuthenticated()) {
        res.status(200).json('ok')
    }else{
        res.status(401).json('not ok')
    }
})

router.post('/api/signup' , signupUser )

router.post('/api/signin' , passport.authenticate('user-local', { failureRedirect: 'http://localhost:5173/' }) ,signinUser)
 

export default router ;