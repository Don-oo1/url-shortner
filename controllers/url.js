const ids = require('short-id');
const Url = require('../modules/url')

async function  handleCreateShortId(req, res){
    const redirectUrl = req.body.redirectUrl.trim()

    if( !redirectUrl || ( !redirectUrl.startsWith("http://") && !redirectUrl.startsWith("https://")) ){
        return res.redirect(`/?incorrectURL=true`)
    }
    
    const shortId = ids.generate()

    await Url.create({
        shortId:shortId,
        redirectUrl:redirectUrl,
        viewHistory:[],
        createdBy:req.user._id

    })

    return res.redirect(`/?shortId=${shortId}`)


}

async function handleRedirectToUrl(req, res){
    const shortId = req.params.shortId

    const result = await Url.findOneAndUpdate({
            shortId
        },
        {
            $push:{
                viewHistory: {
                    timeStamp: Date.now()
                }
            }
        }
    )


return res.redirect(result.redirectUrl)
}

async function handleAnalytics(req, res){
    const shortId = req.params.shortId
    const result = await Url.findOne({shortId})
    
    const numberOfVisits = result.viewHistory.length
    return res.json({
        numberOfVisits,
        viewHistory : result.viewHistory
    })
}

module.exports = {
    handleCreateShortId,
    handleRedirectToUrl,
    handleAnalytics
}