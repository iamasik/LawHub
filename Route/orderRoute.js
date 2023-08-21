const express=require("express")
const Order=require("./../Controller/orderController")
const authController=require("./../Controller/authController")

//Magical marge params to get id perameters request {mergeParams:true}

const orderRoute=express.Router({mergeParams:true})

orderRoute.use(authController.CheckAuthentication)
orderRoute.route("/Make-order").post(Order.whoIsTheUSer, Order.OrderCreate)
orderRoute.route("/View-order").get(Order.OrdersView)
orderRoute.route("/Update/:id").patch(Order.OrderUpdate)

exports.orderRoute=orderRoute 