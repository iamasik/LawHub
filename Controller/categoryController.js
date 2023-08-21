const category=require("./../Model/CategorySchema")
const catchAsync=require('./../Utils/catchAsync')
const operationalErrorGenerator=require(`${__dirname}/../Utils/operationalErrorGenerator`)

exports.AddNewCat=catchAsync(async function(req,res,next){
    const Data=await category.create(req.body)

    res.status(201).json({
        status:"success",
        Data,
        SortData:Data.sort((a, b) => b.total - a.total).sortedData.slice(0, 4)
    })
})

exports.ViewAll=catchAsync(async function(req,res,next){
    const Data=await category.find().populate('total')
    res.status(200).json({
        status:"success",
        Data
    })
})
