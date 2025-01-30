const express = require("express")
const { hendleUserSignUp,hendleUserSignIn } = require("../controllers/user")

const router = express.Router()

router.post('/',hendleUserSignUp)

router.post('/signin',hendleUserSignIn)

module.exports =  router