const UserModel = require("../Model/UserSchema");
const catchAsync = require("./../Utils/catchAsync");
const operationalErrorGenerator = require(`${__dirname}/../Utils/operationalErrorGenerator`);
const JWT = require("jsonwebtoken");

//Show all user info
exports.UserInfos = catchAsync(async (req, res, next) => {

    const findUser = await UserModel.find().populate('totalOrders');
    res.status(200).json({
      status: "success",
      data: {
        user: findUser,
      },
    });
  });

//Find User Info By Id
exports.UserInfoById=catchAsync(async (req,res,next)=>{
  const Info=await UserModel.findById(req.params.id).populate('totalOrders');
  res.status(200).json({
    status: "success",
    data:Unfo
  });
})



//Filter update user data field
const FilterData=(SentData)=>{
    let VerifiedData={}
    Object.keys(SentData).forEach(element => {
        if(["name",'email','phone','identityNo','district','upzilla','postOffice','address'].includes(element)){
            VerifiedData[element]=SentData[element]
        }
    });
    return VerifiedData
}

//Update user Data
exports.UpdateUser=catchAsync(async (req,res,next)=>{
    //Protect to update password
    if(req.body.password || req.body.confirmPassword){
        return next(new operationalErrorGenerator.operationalErrorGenerator("You can't update password here.", 400))
    }

    //Fiter sensetive data
    const Data=FilterData(req.body)
    const UpdatedData=await UserModel.findByIdAndUpdate(req.User.id,Data,{
        new:true,
        runValidators:true
    })

    res.status(200).json({
        status: "success",
        data:UpdatedData
      });
})

