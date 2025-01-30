const express = require("express")
const { hendleUserSignUp,hendleUserSignIn, handleUserSignOut } = require("../controllers/user")

const router = express.Router()

router.post('/',hendleUserSignUp)

router.post('/signin',hendleUserSignIn)

router.get("/singout", handleUserSignOut)

module.exports =  router