const express=require('express')
const authController=require('../Controller/authController')
const userController=require('../Controller/userController')
const viewController=require('../Controller/viewController')

//Nested Router
const Order=require('./orderRoute')

const userRoute=express.Router()


//Submit Order
// userRoute.route("/:LawyerId/:GigId").post(authController.CheckAuthentication,orderController.OrderCreate)

//WithOut Login access
//View User Profile
userRoute.route("/UserInfo/:id").get(userController.UserInfoById)
userRoute.route("/SingUp").post(authController.SingUp)
userRoute.route("/LogIn").post(authController.LogIn)



userRoute.use(authController.CheckAuthentication)

//Munting a router

userRoute.use("/:LawyerId/:GigId",Order.orderRoute)
userRoute.use("/:OrderId",Order.orderRoute)

userRoute.route("/Logout").get(authController.logOut)
userRoute.route("/UpdateData").patch(userController.UpdateUser)
userRoute.route("/UpdatePass").patch(authController.UpdatePassword)

//Only For Admin
// userRoute.route("/UserInfos").get(authController.whoIsTheUSer, userController.UserInfo)
userRoute.route("/UserInfos").get(userController.UserInfos)



exports.userRoute=userRoute