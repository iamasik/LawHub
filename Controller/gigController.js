const Gigs=require("../Model/GigSchema")
const catchAsync=require('./../Utils/catchAsync')
const operationalErrorGenerator=require(`${__dirname}/../Utils/operationalErrorGenerator`)
exports.paramsMiddleware=(req,res,next,val)=>{
    console.log(val);
    console.log(req.body);
    next()
}

exports.gigInfo=catchAsync(async function(req,res,next){ 
        const gigInfo= await Gigs.find()
        res.status(200).json({
            status:"success",
            Data:{
                gig:gigInfo
            }
        })
    })

exports.gigAdd=catchAsync(async function(req,res,next){ 
        if(!req.body.userId) req.body.userId=req.User.id
        const newGig= await Gigs.create(req.body)
        res.status(200).json({
            status:"success",
            Data:{
                gig:newGig
            }
        })
    })

exports.gigPatch=catchAsync(async function(req,res,next){

        const newUpdate= await Gigs.findByIdAndUpdate(req.params.id,req.body,{
            new:true
            // ,
            // runValidators:true
        })
    
        res.status(201).json({
            status:"success",
            Data:{
                gig:newUpdate
            }
        })
    })
exports.gigInfoById=catchAsync(async function(req,res,next){
        const gigInfo= await Gigs.find({userId:req.params.id})
        //If there is no gig -> But it's not a error. If any user don't have any gig. So that we need to check user Id first to check
        if(gigInfo.length==0){
            return next(new operationalErrorGenerator.operationalErrorGenerator("No gigs found..",404))
        }

        res.status(200).json({
            status:"success",
            Data:{
                gigInfo
            }
        })
    })

exports.DelecteGig=catchAsync(async (req,res, next)=>{
        const DeleteGig= await Gigs.findByIdAndDelete(req.params.id)
        if(!DeleteGig){
           return next(new operationalErrorGenerator.operationalErrorGenerator(`Can't delete`,404))
       }
       res.status(200).json({
           status:"success"
       })
})

    
