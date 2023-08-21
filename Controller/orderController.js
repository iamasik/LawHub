const Orders=require("./../Model/OrderSchema")
const catchAsync=require("./../Utils/catchAsync")
const operationalErrorGenerator=require("./../Utils/operationalErrorGenerator")

//User Role Check Midleware
exports.whoIsTheUSer=catchAsync(async (req,res,next)=>{
    if(req.User.userRole=="Buyer"){
      next()
    }
    else{
      return next(new operationalErrorGenerator.operationalErrorGenerator("Please login as client!!",401))
    }
  })

exports.OrderCreate=catchAsync(async function(req,res,next){
    if(!req.body.Lawyer) req.body.Lawyer=req.params.LawyerId
    if(!req.body.Gig) req.body.Gig=req.params.GigId
    if(!req.body.Client) req.body.Client=req.User.id

    const newOrder= await Orders.create(req.body)
    res.status(200).json({
        status:"success",
        Orders:newOrder
    })
})

exports.OrdersView=catchAsync(async function(req,res,next){
    //______ View one order info
    let filter={}
    if(req.params.OrderId) filter={_id:req.params.OrderId}
    //_____
    const OrderInfo= await Orders.find(filter)
    res.status(200).json({
        status:"success",
        Orders:OrderInfo
    })
})

exports.OrderUpdate=catchAsync(async (req,res,next)=>{
    const OrderUpdate=await Orders.findByIdAndUpdate(req.params.id,req.body,{
        new:true
        // runValidators:true
    })
    res.status(201).json({
        status:"success",
        Orders:OrderUpdate
    })
})