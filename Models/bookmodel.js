const mongoose=require('mongoose')

const bookshema=new mongoose.Schema({
    title:{
    type:String,
     required:true

    },
    author:{
        type:String,
        required:true
    },
    noofpages:{
      type:Number,
        required:true
    },
   image:{
    type:String,
   required:true
   },
   price:{
    type:String,
    required:true
   },
   discountprice:{
    type:String,
    required:true
   },
   abstract:{
    type:String,
    required:true
   },
   publisher:{
    type:String,
    required:true
   },
   language:{
    type:String,
    required:true
   },
   isbn:{
    type:String,
    required:true
   },
   category:{
    type:String,
    required:true
   },
   uploadImg:{
    type:Array,
    required:true

   },
   status:{
    type:String,
    default:"pending"
   },
   usermail:{
    type:String,
    required:true
   }

})

const books=mongoose.model('books',bookshema)

module.exports=books