const express=require("express")
const categoryController=require("./../Controller/categoryController")
const authController=require("../Controller/authController")

const catRoute=express.Router()
catRoute.route("/View").get(categoryController.ViewAll)
catRoute.use(authController.CheckAuthentication)
catRoute.route("/Add").post(categoryController.AddNewCat)



module.exports.catRoute=catRoute