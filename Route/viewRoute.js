const express=require("express")
const viewController=require("./../Controller/viewController")
const authController=require("./../Controller/authController")


const view=express.Router()


view.route("/login").get(viewController.login)
view.route("/SingUp").get(viewController.SingUp)
view.route("/Contact").get(viewController.Contact)
view.route("/Order/:id").get(viewController.Order)
view.route("/OrderList").get(authController.CheckAuthentication, viewController.OrderList)
view.route("/gigDetails/:id").get(viewController.gigDetails)
view.route("/").get(viewController.index)
view.route("/catView/:ids").get(viewController.ViewAcat)
view.route("/AuthUserInfo").get(viewController.AuthUserInfo)
view.route("/CreateJobs").get(viewController.CreateJobs)
view.route("/Modify/:id").get(viewController.Modify)
view.route("/Settings").get(viewController.Settings)
view.route("/Search/:id").get(viewController.Search)

view.route("/Alljobs").get(authController.CheckAuthentication,viewController.Alljobs)


exports.view=view