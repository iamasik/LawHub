const StartApp=require("./app")
const dotenv=require('dotenv')

//All type uncaughtException error catch for syncronus 
process.on("uncaughtException",err=>{
    console.log(err.name,err.message);
    // first close the Server
    process.exit(1) 
})

dotenv.config({path:'./config.env'})
const mongoose=require("mongoose")
const DB=process.env.DataBase.replace("<password>",process.env.Password)
mongoose.set("strictQuery", false);

async function Connect(){  
    try{
        await mongoose.connect(DB,{
            useNewUrlParser: true,
            useUnifiedTopology: true,})
        console.log('Connected to MongoDB!');
    }catch (err) {
        console.error(`Error connecting to MongoDB: ${err.message}`);
        process.exit(1);
    }
}
Connect()

const Server = StartApp.App.listen(process.env.Port,()=>{
    console.log("Server Started..");
})

//All type unhandled Rejection error catch for asyncronus 
process.on('unhandledRejection',err=>{
    console.log(err.name,err.message);
    // first close the Server
    Server.close(()=>{
        process.exit(1) 
    })
}) 

