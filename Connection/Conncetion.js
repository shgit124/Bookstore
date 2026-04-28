const mongoose=require('mongoose')

const connectionString=process.env.CONECTION_STRING

mongoose.connect(connectionString).then(res=>{
    console.log("server connected with MongoDb server!")
}).catch(err=>{
    console.log(err)
})