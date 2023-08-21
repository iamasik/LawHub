const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcrypt')

const UserSchema= new mongoose.Schema({
    userRole:{
        type:String,
        required:[true,"Please select your role.."],
        enum:["Buyer","Lawyer"],
        default:"User"
    },
    name:{
        type:String,
        required:[true,"Please insert your name.."],
        trim:true,
        maxlength:[40,"Name must have less then 40 character"],
    },
    phone:{
        type:String,
        required:[true,"Please insert your phone number.."],
    },
    identityNo:{
        type:Number,
        required:[true,"Please insert your phone NID or Birth ID No.."],
    },
    district:{
        type:String
    },
    upzilla:{
        type:String
    },
    postOffice:{
        type:String
    },
    email:{
        type:String,
        required:[true,"Please insert your email.."],
        unique:true,
        lowercase:true,
        validate:[validator.isEmail,'Please insert valid mail']
    },
    dateOfBirth:Date
    ,
    gender:{
        type:String
    },
    address:{
        type:String,
        trim:true,
        required:[true,"Please insert your valid address.."],
    },
    username:{
        type:String,
        trim:true,
        required:[true,"Please insert valid username.."],
    },
    password:{
        type:String,
        required:[true,"Please insert your password.."],
        minlength:[8,'Password must have geter then 8 character'],
        select:false
    },
    passwordChangeAt:Date,
    confirmPassword:{
        type:String,
        required:[true,"Please insert your confirm password.."],
        validate:function(Element){
            return Element==this.password
        },
        message:"Enter valid password!!"
    }
},
// virtual property show
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual populate to get all order details that have a lawyer and user
UserSchema.virtual('totalOrders', {
    ref: 'Orders',
    localField: '_id',
    foreignField: 'Lawyer',
  });

UserSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next()
    this.password= await bcrypt.hash(this.password,12)
    this.confirmPassword=undefined 
    next()
})

//Instance for check is the password ok
UserSchema.methods.IsCorrect=async function(CandidatePassword,UserPassword){

    return await bcrypt.compare(CandidatePassword,UserPassword)
}

//Instance for is the password change after generate the token
UserSchema.methods.IsPasswordChange= function(JWTTokenExpire){
    if(this.passwordChangeAt){
        const ChangeTime=parseInt(this.passwordChangeAt.getTime()/1000,10)
        return JWTTokenExpire < ChangeTime
    }
    return false
}


const Users=mongoose.model("Users",UserSchema)
module.exports=Users