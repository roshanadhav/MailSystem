export const isUserLoggedin = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl ;
        console.log(req.referer)
        res.redirect('http://localhost:5173/')
    }
    else{
    next()
    }
}