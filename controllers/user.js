const {User} = require("../modules/user")
const { v4 : uuidv4 } = require("uuid")
const { setUser } = require("../service/auth")

async function hendleUserSignUp(req, res){

    const {name, email, password} = req.body

    const userIfInDb = await User.findOne({email})

    if(userIfInDb){ return res.redirect("/signup?alreadyCreated=true")}


    await User.create({
        name,
        email,
        password,
    })

    return res.redirect("/")
}

async function hendleUserSignIn(req, res){

    const {email, password} = req.body
    const user = await User.findOne({
        email,password
    })

    if(!user){
        return res.render("signin",{
            error:"Invalid Email or Password"
        })
    }

    const tocken = setUser(user)

    res.cookie("tocken",tocken)
    console.log(`we set the cookie ${tocken}`)
    return res.redirect("/")


}
 function handleUserSignOut(req, res){

    res.clearCookie("tocken")
    res.redirect("/")
}

module.exports = {hendleUserSignUp, hendleUserSignIn, handleUserSignOut }