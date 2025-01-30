const jwt = require("jsonwebtoken")
const secret = "nirmalodedara"

function setUser(user){
    return jwt.sign({
        _id:user._id,
        email:user.email,
        role:user.role
    },secret)
}

function getUser(tocken){
    try{
        return jwt.verify(tocken, secret)
    }catch(err){
        return null
    }
}

module.exports = {
    setUser,
    getUser
}