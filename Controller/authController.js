const UserModel = require("../Model/UserSchema");
const { promisify } = require("util");
const catchAsync = require("./../Utils/catchAsync");
const operationalErrorGenerator = require(`${__dirname}/../Utils/operationalErrorGenerator`);
const JWT = require("jsonwebtoken");

//Genrate JWT Token
const UserToken = (id) => {
  return JWT.sign({ id }, process.env.JWT_Secret, {
    expiresIn: process.env.ExpiresIn,
  });
};

// SIng Up uSer
exports.SingUp = catchAsync(async (req, res, next) => {
  const newUser = await UserModel.create(req.body);
  res.status(200).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
});

//Log in User
exports.LogIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    console.log("Check email and password");
  }
  const User = await UserModel.findOne({ email }).select("+password");
  if (!User || !await User.IsCorrect(password, User.password)) {
    return next(new operationalErrorGenerator.operationalErrorGenerator("Incorrect email and password",401))
  }

  //Cookie set with response
  LoginToken=UserToken(User._id)
  const cookieOptions={expires:new Date(Date.now()+process.env.JWTExpiresIn*24*60*60*1000),httpOnly:true}
  if(process.env.NODE_ENV=="production") cookieOptions.secure=true
  res.cookie("JWT",LoginToken,cookieOptions)

  res.status(200).json({
    status: "success",
    Token: LoginToken, 
  });
});

//Midleware CheckAuthentication check
exports.CheckAuthentication = catchAsync(async (req, res, next) => {
  let Token;
  //Extract Login Token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    Token = req.headers.authorization.split(" ")[1];
  }else if(req.cookies.JWT){
    Token=req.cookies.JWT
  }
  //Check it Token is there or not
  if (!Token) {
    return next(
      new operationalErrorGenerator.operationalErrorGenerator(
        "Please login",
        401
      )
    );
  }
  //Verify is the token is valid or not => To make it promisify we will use buildin package
  const Decode = await promisify(JWT.verify)(Token, process.env.JWT_Secret);
  //Is the user exist?
  const UserData = await UserModel.findById(Decode.id);
  if (!UserData) {
    return next(
      new operationalErrorGenerator.operationalErrorGenerator(
        "User not exist",
        401
      )
    );
  }
  //Is password chnage after token generate
  if(UserData.IsPasswordChange(Decode.iat)){
    return next(new operationalErrorGenerator.operationalErrorGenerator("Password changed login again",401))
  }
  //Put Uer Data on request
  req.User=UserData
  next();
});


//Check logged in user for rander user
exports.isLoggedIn = async (req, res, next) => {
  res.CheckUrl=req.originalUrl
  try{
    if(req.cookies.JWT){

      //Verify is the token is valid or not => To make it promisify we will use buildin package
      const Decode = await promisify(JWT.verify)(Token=req.cookies.JWT, process.env.JWT_Secret);
  
      //Is the user exist?
      const UserData = await UserModel.findById(Decode.id);
      
      if (!UserData) {
        return next();
      }
  
      //Is password chnage after token generate
      if(UserData.IsPasswordChange(Decode.iat)){
        return next()
      }
      //Put Uer Data on request
      res.locals.user=UserData
      return next();
    }
  }catch(err){
    return next();
  }
  next()
};


//Logout User
exports.logOut=(req,res)=>{
  const cookieOptions={expires:new Date(Date.now()+10*1000),httpOnly:true}
  res.cookie("JWT","Logged Out",cookieOptions)
  res.status(200).json({status:"success"})
}

//User Role Check Midleware
exports.whoIsTheUSer=catchAsync(async (req,res,next)=>{
  if(req.User.userRole=="Admin"){
    next()
  }
  else{
    return next(new operationalErrorGenerator.operationalErrorGenerator("Please login as Admin!!",401))
  }
})

//Update user password
exports.UpdatePassword=catchAsync(async (req,res,next)=>{
  //1. Find the user data
  const UserInfo= await UserModel.findById(req.User.id).select("+password")
  //2. Is the entered password correct
  if(!(UserInfo.IsCorrect(req.body.oldPassword,UserInfo.password))){
    return next(new operationalErrorGenerator.operationalErrorGenerator("Password didn't match. Try again",400))
  }
  //Update password
  UserInfo.password=req.body.password
  UserInfo.confirmPassword=req.body.confirmPassword
  await UserInfo.save()
  // why we didn't use UserModel.findByIdUpdate not work see video 137
  res.status(200).json({
    status: "success",
    Token:UserToken(UserInfo._id)
  });
})