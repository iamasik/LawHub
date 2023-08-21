const express=require("express")
const gigController=require("../Controller/gigController")
const authController=require("../Controller/authController")

const gigRoute=express.Router()
// gigRoute.param("id",gigController.paramsMiddleware)
gigRoute.route("/gigInfo").get(gigController.gigInfo)
gigRoute.route("/:id").get(gigController.gigInfoById)

//For authenticated user
gigRoute.use(authController.CheckAuthentication) 
gigRoute.route("/Add").post(gigController.gigAdd)
gigRoute.route("/:id").patch(gigController.gigPatch).delete(gigController.DelecteGig)
exports.gigRoute=gigRoute  