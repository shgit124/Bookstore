

const users = require('../Models/Usermodels')
//const admin = require('../models/Adminmodel')  // Admin models if not required want to remove
const jwt=require('jsonwebtoken')
// SIGNUP
exports.signup = async (req,res) => {
   try{
        const {username,email,password} = req.body

        if(!username || !email || !password){
            return res.status(400).json("invalid data")
        }

        const existingUser = await users.findOne({email})

        if(existingUser){
            return res.status(400).json("User already exists")
        }

        const user = new users({
            username,
            email,
            password
        })

        await user.save()

        res.status(200).json("sign up success")

   }catch(err){
        console.log(err)
        res.status(500).json("something went wrong")
   }
}
  exports.signin=async(req,res)=>{
    
    //console.log(req.body)
    const {email,password}=req.body

    if( !email || !password)

    {
        res.status(400).json("invalid data")
    }
    //checking al ready a user 
    else{
        const user=await users.findOne({email,password})
        if(user){
           const token= jwt.sign({email:user?.email,role:user?.role},process.env.SECRET_KEY)
            res.status(200).json({token,username:user?.username,profile:user?.profile,role:user?.role,bio:user?.bio})
        }
        else{
            res.status(400).json("invalid email/password")
        }
        //res.status(200).json("signin success")
    }

    // res.send("signin hit")
}



// exports.getProfile=(req,res)=>{
    
//     const user={username:"Amal",email:"amal@gmail.com",password:"123"}
     
//     res.send(user)
//     //res.send("profile data")
// }

exports.googleSignin = async(req,res)=>{
    try{
        const  {username,email,profile}=req.body
const existingUser = await users.findOne({email})
if(!existingUser){ 
   let role=existingUser.role     
    const newUser= new users({
        username,email,profile
    })
    await newUser.save()
    role=newUser.role
   }
    const token = jwt.sign({email:email,role:role},process.env.SECRET_KEY)
    // res.status(200).json({token,username:username,profile:profile})
      res.status(200).json({token,username:users?.username,profile,role:users?.role,bio:existingUser.bio})
    }
    catch(err){
        console.log(err)
        res.status(404).json(err)
    }


}

exports.profileUpdate = async (req,res,) =>{
    try{
    const {username,password,bio,profile,role,} = req.body
    const profilepicture = req.file ? req.file.filename:profile
    const email=req.payload
    const updateuser = await users.findOneAndUpdate({email},{username,email,password,profile:profilepicture,bio,role},{new:true})
    res.status(200).json(updateuser)
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
   
}


exports.getProfile=async(req,res)=>{
    try{
    const userMail=req.payload
    const userData=await users.findOne({email:userMail})
    res.status(200).json(userData)
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
    
}




// exports.getAdminAllBooks = async(req,res)=>{
// try{
//     const booklist = await books.find()
//     res.status(200).json(booklist)
// }
// catch(err){
//     console.log(err)
//     res.status(200).json(err)
// }
// }
////Admin related Apis
//get all users 
exports.getAdminAllusers=async(req,res)=>{
    try{
       const userMail=req.payload
       const userlist= await users.find({email:{$ne:userMail}})
       res.status(200).json(userlist)

    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}

// ADMIN PROFILE UPDATES
// exports.getAdminprofileUpdate = async(req,res)=>{
//     try{
//   const {username,password,cpassword}=req.body
//     const profilepicture = req.file ? req.file.filename:profile
//     if(password !== cpassword ){

//       return res.status(400).json({ message: "Passwords do not match" });
    
//     }
// //find Admin
//      const Updateadmin = await Admin.findById(req.user.id);
//      Updateadmin.save()
// if(!admin){
//     res.status(400).json("admin not found")
// }
//     }
//     catch(err){
//         console.log(err)
//         res.status(500).json(Error)
//     }
  

// }