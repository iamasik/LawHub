const express=require("express")
const App=express()
//Operation Error
const operationalErrorGenerator=require(`${__dirname}/Utils/operationalErrorGenerator`)
//Final error response
const finalErrorResponse=require('./Utils/finalErrorResponse')

//Path find
const path=require('path')
const userRoute=require('./Route/userRoute')
const gigRoute=require("./Route/gigRoute")
const orderRoute=require("./Route/orderRoute")
const catRoute=require("./Route/catRoute")
const viewRoute=require("./Route/viewRoute")
const authController=require('./Controller/authController')
//Accept all cookie from incoming request
const cookieParser=require('cookie-parser')
const morgan = require("morgan")

if(process.env.NODE_ENV=="development"){
    App.use(morgan("dev"))
}

App.use(express.static(path.join(__dirname,"public")))
App.set("view engine", "ejs")
App.set("views", path.join(__dirname,"views"))

App.use(express.json())
//Accept all cookie from incoming request
App.use(cookieParser())

App.use(authController.isLoggedIn)
App.use("/",viewRoute.view)
App.use("/Api/v1/User",userRoute.userRoute)
App.use("/Api/v1/Gig",gigRoute.gigRoute)
App.use("/Api/v1/Order",orderRoute.orderRoute)
App.use("/Api/v1/Cat",catRoute.catRoute)

//Operational Error Handle
App.all("*",(req,res,next)=>{
    next(new operationalErrorGenerator.operationalErrorGenerator(`${req.originalUrl} -- Can't find this page..`,400))
})

//For All error will rise here( Global Error )
App.use(finalErrorResponse)

exports.App=App