const { getUser } = require("../service/auth")


function checkForAythentication(req, res, next){

    const tockenCookie = req.cookies?.tocken
    
    req.user = null
    if( !tockenCookie ) return next()

    const tocken = tockenCookie

    const user = getUser(tocken)
    
    req.user = user

    return next()
}

function restrictTo(Roles = []){

    return (req,res,next)=>{

        if( !req.user ) return res.redirect("/signin")
        
        if( !Roles.includes(req.user.role) ) return res.end("Auauthorised")

        return next()
    }
    


}
module.exports = {
    checkForAythentication,
    restrictTo
}