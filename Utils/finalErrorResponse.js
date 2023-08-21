const operationalErrorGenerator=require(`${__dirname}/operationalErrorGenerator`)

const DevelopmentError=(err,res)=>{


    if(res.CheckUrl.startsWith("/Api")){
        res.status(err.statusCode).json({
            status:err.status,
            message:err.message,
            code:err.statusCode,
            err,
            stack:err.stack
        })
    }
    else{
        res.status(err.statusCode).render("404",{"title":"Something is wrong","user":res.locals.user})
    }

    
}
const ProductionError=(err,res)=>{
    if(err.isOperational){
        res.status(err.statusCode).json({
            status:err.status,
            code:err.statusCode,
            message:err.message
        }) 
    }
    else{
        res.status(500).json({
            status:"error",
            message:"Something went very wrong.."
        })
    }
}

module.exports=(err, req, res , next)=>{
    err.statusCode=err.statusCode || 500;
    err.status=err.status || "Error"
    //During Development Error. So developer know detail about exact error
    if(process.env.NODE_ENV=="development") {
        DevelopmentError(err,res)
    }
    //For production error show. So custommer don't know behind the scene error
    else if(process.env.NODE_ENV=="production"){
        //To show only opertional error. Bacause any thirdparty error we don't want show


        //Database 400 operational error for invalid ID
        if(err.name=="CastError"){
            const message=`Invalid ${err.path}: ${err.value}`
            err= new operationalErrorGenerator.operationalErrorGenerator(message,400)
        }
        //Database 400 operational error for Duplicate entry
        if(err.code==11000){
            const message=`Duplicate entry: ${err.keyValue.title}`
            err= new operationalErrorGenerator.operationalErrorGenerator(message,400)
        }
        //Database 400 operational error for Validation error
        if(err.name=="ValidationError"){
            let data=Object.values(err.errors).map(el=> el.message)
            const message=`Validation error: ${data.join(". ")}`
            err= new operationalErrorGenerator.operationalErrorGenerator(message,400)
        }
        if(err.name=="JsonWebTokenError"){
            err=new operationalErrorGenerator.operationalErrorGenerator("Invalid Token!!",401)
        }
        if(err.name=="TokenExpiredError"){
            err=new operationalErrorGenerator.operationalErrorGenerator("Your token expired",401)
        }
        ProductionError(err,res)
    }
}