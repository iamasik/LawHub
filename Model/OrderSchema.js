const mongoose=require('mongoose')
const validator=require('validator')

const OrderSchema= new mongoose.Schema({
    Status:{
        type:String,
        enum:["Running","Waiting","Complete"],
        default:"Running"
    },
    CreateAt:{
        type:Date,
        default:Date.now
    },
    Gig:{
        type: mongoose.Schema.ObjectId,
        ref:"Gigs",
        required:[true,"Must have a gig"]
    },
    Client:{
        type: mongoose.Schema.ObjectId,
        ref:"Users",
        required:[true,"Must have a user"]
    },
    Lawyer:{
        type: mongoose.Schema.ObjectId,
        ref:"Users",
        required:[true,"Must have a lawyer"]
    }
}
,
//virtual property show
{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
}
)

//Populating Order referance info while viewing them
OrderSchema.pre(/^find/,function(next){
    this.populate({
        path:"Gig"
    })
    .populate({
        path:"Client Lawyer",
        select:"name username userRole"
    })
    next()
})

const Orders=mongoose.model("Orders",OrderSchema)
module.exports=Orders