const catchAsync = require("./../Utils/catchAsync");
const UserModel = require("../Model/UserSchema");
const Cat=require("./../Model/CategorySchema")
const gigModel=require("./../Model/GigSchema")
const Order=require("../Model/OrderSchema")
const operationalErrorGenerator = require(`${__dirname}/../Utils/operationalErrorGenerator`);

exports.index=catchAsync(async(req,res,next)=>{
 
    const AllCat= await Cat.find().populate('total')
    const AllUser=(await UserModel.find())
    const Lawyer=AllUser.filter(el=> el.userRole==='Lawyer').length
    const User=AllUser.filter(el=> el.userRole==='Buyer').length
    const Orders=await Order.find()
    const SolvedOrder=Orders.filter(el=>el.Status=="Complete").length
    const RunningdOrder=Orders.filter(el=>el.Status=="Running").length
    const sortedData = AllCat.sort((a, b) => b.total - a.total);
    const top4Data = sortedData.slice(0, 4);
    Info=res.locals.user
    res.status(200).render("index",{"title":"Online lawyer hire platform","user":res.locals.user,AllCat,top4Data,Lawyer,User,Info,SolvedOrder,RunningdOrder})
})
exports.login=catchAsync(async(req,res,next)=>{
    res.status(200).render("login",{"title":"Login user"})
})
exports.SingUp=catchAsync(async(req,res,next)=>{
    const Districs=["Barguna", "Barisal", "Bhola", "Jhalokati", "Patuakhali", "Pirojpur", "Bandarban", "Brahmanbaria", "Chandpur", "Chittagong", "Comilla", "Cox's Bazar", "Feni", "Khagrachari", "Lakshmipur", "Noakhali", "Rangamati", "Dhaka", "Faridpur", "Gazipur", "Gopalganj", "Kishoreganj", "Madaripur", "Manikganj", "Munshiganj", "Narayanganj", "Narsingdi", "Rajbari", "Shariatpur", "Tangail", "Bagerhat", "Chuadanga", "Jessore", "Jhenaidah", "Khulna", "Kushtia", "Magura", "Meherpur", "Narail", "Satkhira", "Jamalpur", "Mymensingh", "Netrokona", "Sherpur", "Bogra", "Joypurhat", "Naogaon", "Natore", "Chapainawabganj", "Pabna", "Rajshahi", "Sirajganj", "Dinajpur", "Gaibandha", "Kurigram", "Lalmonirhat", "Nilphamari", "Panchagarh", "Rangpur", "Thakurgaon", "Habiganj", "Moulvibazar", "Sunamganj", "Sylhet"]

    res.status(200).render("SingUp",{"title":"Registration New User",Districs})
})
exports.AuthUserInfo=catchAsync(async(req,res,next)=>{
    const AllCat= await Cat.find().populate('total')
    res.status(200).render("profile",{"title":`${res.locals.user.name} profile`,"user":res.locals.user,AllCat})
  })
exports.ViewAcat=catchAsync(async(req,res,next)=>{
  const gigs=await gigModel.find()
    const OneCat= await Cat.findById(req.params.ids)
    const SearchGig=gigs.filter(el=>el.catagory.id===req.params.ids)

    res.status(200).render("CatPage",{"title":`${OneCat.name} Jobs`,"user":res.locals.user,SearchGig})
  })
exports.Alljobs=catchAsync(async(req,res,next)=>{
  const Jobs= await gigModel.find()
  const Myjobs=Jobs.filter(el=>el.userId.id==res.locals.user.id)
    res.status(200).render("AllJobs",{"title":`All Jobs`,"user":res.locals.user,Myjobs})
  })
exports.CreateJobs=catchAsync(async(req,res,next)=>{
    const AllCat= await Cat.find()
    res.status(200).render("CreateJobs",{"title":`Create Jobs`,"user":res.locals.user,AllCat})
  })
exports.Modify=catchAsync(async(req,res,next)=>{
  const Data=await gigModel.findById(req.params.id)

    res.status(200).render("Modify",{"title":`Modify Jobs`,"user":res.locals.user,Data})
  })



exports.Settings=catchAsync(async(req,res,next)=>{
  const Districs=["Barguna", "Barisal", "Bhola", "Jhalokati", "Patuakhali", "Pirojpur", "Bandarban", "Brahmanbaria", "Chandpur", "Chittagong", "Comilla", "Cox's Bazar", "Feni", "Khagrachari", "Lakshmipur", "Noakhali", "Rangamati", "Dhaka", "Faridpur", "Gazipur", "Gopalganj", "Kishoreganj", "Madaripur", "Manikganj", "Munshiganj", "Narayanganj", "Narsingdi", "Rajbari", "Shariatpur", "Tangail", "Bagerhat", "Chuadanga", "Jessore", "Jhenaidah", "Khulna", "Kushtia", "Magura", "Meherpur", "Narail", "Satkhira", "Jamalpur", "Mymensingh", "Netrokona", "Sherpur", "Bogra", "Joypurhat", "Naogaon", "Natore", "Chapainawabganj", "Pabna", "Rajshahi", "Sirajganj", "Dinajpur", "Gaibandha", "Kurigram", "Lalmonirhat", "Nilphamari", "Panchagarh", "Rangpur", "Thakurgaon", "Habiganj", "Moulvibazar", "Sunamganj", "Sylhet"]
    res.status(200).render("Settings",{"title":`Update User Info`,"user":res.locals.user,Districs})
  })



exports.gigDetails=catchAsync(async(req,res,next)=>{

    const JobInfo=await gigModel.findById(req.params.id)

    res.status(200).render("gigDetails",{"title":`Job details`,"user":res.locals.user,JobInfo})
  })


exports.Order=catchAsync(async(req,res,next)=>{

    const OrdersInfo=await Order.findById(req.params.id)
    res.status(200).render("Order",{"title":`Order details`,"user":res.locals.user,OrdersInfo})
  })

exports.Contact=catchAsync(async(req,res,next)=>{

    res.status(200).render("Contact",{"title":`Contact Us`,"user":res.locals.user})
  })



exports.OrderList=catchAsync(async(req,res,next)=>{
  const Orders=await Order.find()
  if(req.User.userRole==="Buyer"){
    const OrderList=Orders.filter(el=> el.Client.id===req.User.id)
    res.status(200).render("OrderList",{"title":`Order List`,"user":res.locals.user,OrderList})
  }else if(req.User.userRole==="Lawyer"){
    const OrderList=Orders.filter(el=> el.Lawyer.id===req.User.id)
    res.status(200).render("OrderList",{"title":`Order List`,"user":res.locals.user,OrderList})
  }
  })


  exports.Search=catchAsync(async(req,res,next)=>{
      const gigs=await gigModel.find()
      const SearchGig=gigs.filter((el)=>{
        if (el.title.includes(`${req.params.id}`)){
          return el
        }
      })
      res.status(200).render("CatPage",{"title":`${req.params.id} Jobs`,"user":res.locals.user,SearchGig})
    })