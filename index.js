const express = require('express')
const {connectMongoDb} = require('./connections')
const {handleRedirectToUrl} = require('./controllers/url')
const path = require("path")
const {  checkForAythentication, restrictTo } = require("./middlewares/auth")
const cookieParser = require('cookie-parser')
require('dotenv').config();


const urlRouter = require('./routes/url')
const staticRoute = require("./routes/staticRouter")
const userRoute = require("./routes/user")


const app = express()
app.use(cookieParser())

const PORT =  8000

const MONGO_URI = process.env.MONGO_URI ; 
  // const MONGO_URI = "mongodb://127.0.0.1:27017/url-1"
connectMongoDb(MONGO_URI)
.then(()=>{console.log("MongoDb Connected 🥳")})

app.set("view engine", "ejs")
app.set('views', path.resolve("./views"))

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.get('/set-cookie', (req, res) => {
    res.cookie('testCookie', '123456', { httpOnly: true });
    res.send('Cookie has been set!');
});
app.use(checkForAythentication)


app.get('/favicon.ico', (req, res) => res.status(204).end());
app.use("/url", restrictTo(["NORMAL","ADMIN"]),urlRouter)
app.use("/user",userRoute)
app.use("/",staticRoute)
app.use("/:shortId",handleRedirectToUrl)

app.listen(PORT,()=>{console.log(`Server is running on port ${PORT}`)})