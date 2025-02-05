import express from "express"
const app = express() 
import connection from "./databases/db.js"
import router from "./routes/route.js";
import cors from 'cors'
import cookieParser from 'cookie-parser'
import passport from "passport";
import session from "express-session";
import LocalStrategy from 'passport-local';
import User from "./model/user.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true
}));


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie:{
        expires : Date.now() + 7 * 24 * 60 * 60 * 1000 ,
        maxAge : 7 * 24 * 60 * 60 * 1000 ,
        httpOnly :true 
    }
  }))

app.use(passport.initialize())
app.use(passport.session())

passport.use('user-local', new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/" , router) ;


app.get("/" , (req,res)=>{
    res.send("Hello There")
})

connection() ;

app.listen(8080 , (req,res)=>{
    console.log("Server Is listning")
})