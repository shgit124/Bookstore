const jwt = require('jsonwebtoken')

const adminJwtMiddleware = (req,res,next)=>{
    try{
        
        console.log("Requist hit at jwt middileware")
       // const token= req?.headers?.authorization?.split("")[1]
       const token = req?.headers?.authorization?.split(" ")[1];
        const deocde_value =jwt.verify(token,process.env.SECRET_KEY)
        console.log(deocde_value)
        req.payload= deocde_value.email 
        req.role=deocde_value.role
        if(deocde_value.role !=="admin"){
        res.status(460).json("invalid user")
        }
        else{
            next ()
        }
    }
    catch(err){
        console.log(err)
        res.status(500).json("invalid token")
    }
}

module.exports=adminJwtMiddleware