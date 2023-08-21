const mongoose=require("mongoose")

const CategorySchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please type a category name.."]
    },
    description:{
        type:String,
        trim:true,
        maxlength:[1000,"Name must have less then 1000 character"],
    },
    count:{
        type:Number,
        default:0
    }
},
// virtual property show
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

// Virtual populate to get all order details
CategorySchema.virtual('total', {
    ref: 'Gigs',
    localField: '_id',
    foreignField: 'catagory',
    count: true
  });

const Category=mongoose.model("categories",CategorySchema)
module.exports=Category