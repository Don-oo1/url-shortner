const express = require('express')
const Url = require('../modules/url')
const { restrictTo } = require('../middlewares/auth')


const router = express.Router()


router.get("/admin/urls", restrictTo(["ADMIN"]) ,async(req, res)=>{

    const allUrls = await Url.find({ })
    const protocol = req.protocol
    const host  = req.get('host')
    const shortId = req.query.shortId
    const incorrectURL = req.query.incorrectURL


    return res.render("home",{
        shortId:shortId,
        protocol:protocol,
        host:host,
        urls:allUrls,
        incorrectURL:incorrectURL

    })
})

router.get("/", restrictTo(["NORMAL","ADMIN"]) ,async(req, res)=>{

    const allUrls = await Url.find({createdBy: req.user._id})

    const shortUrl = `${req.protocol}://${req.get('host')}/<ENTER_SHORTID>`
    const protocol = req.protocol
    const host  = req.get('host')
    const shortId = req.query.shortId
    const incorrectURL = req.query.incorrectURL


    return res.render("home",{
        shortId:shortId,
        protocol:protocol,
        host:host,
        urls:allUrls,
        incorrectURL:incorrectURL


    }) 
})



router.get("/signup", ( req, res)=>{
    const alreadyCreated = req.query.alreadyCreated

    return res.render("signup",{
        alreadyCreated,

    })
} )

router.get("/signin", ( req, res)=>{

    return res.render("signin")
} )
module.exports = router
