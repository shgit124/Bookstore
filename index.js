//import and configuring dotenv for envioronment
require('dotenv').config()

// importing express.js module
const express=require('express')
const routes=require('./Router/Router')
const cors=require('cors')
// const jwtmiddle=require('./Middilewares/jwtMiddileware')



//creating server app instance
const app=express()
// import mongodb connection
require('./Connection/Conncetion')
// configuring cors 
app.use(cors())
//configuring server app instance
// app.use(express.json())
app.use(express.json());

// configure jwt middleware
 //app.use(jwtmiddle)
//configuration of server
app.use(routes)

// serving apps
app.use('/uploadImg',express.static('bookImages'))
// serving uploaded resume to clint side
app.use('/uploadImg',express.static('resumFiles'))
//setting a specific port number
const PORT=8000

// //requist handler
// const reqHandler=(req,res)=>{
// res.send("requist hit")
// }
// const booklist=(req,res)=>{
//     res.send("book requist hit")
// }

// //configuring/setting reqHandler

// app.use('/',reqHandler)
// app.use('/books',booklist)

app.listen(PORT,(error)=>{
    if(error){
        console.log(error)
    }
    else{
        console.log(`server running at http://localhost:${PORT}`)
      
    }
})


