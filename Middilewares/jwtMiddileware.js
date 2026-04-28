// const jwt=require('jsonwebtoken')
// const jwtmiddileWare=(req,res,next)=>{
   

         
//          const token=req?.headers?.authrization?.split(" ")[1]
//          const decode_value=jwt.verify(token,process.env.SECRET_KEY)
//          console.log(decode_value)
//          console.log("Request hit at jwt middileware ")
        
//         // req.payload=decode_value.email
//          next()
    
   
//     // catch(err){
//     //        console.log(err)
//     //        res.status(404).json("invalid taken")
//     // }
// }

// module.exports=jwtmiddileWare


// const jwt = require('jsonwebtoken');

// const jwtMiddleware = (req, res, next) => {
//     try {
//         console.log("Request hit at jwt middleware");

//          //const token = req?.headers?.Authorization?.split(" ")[1];
//          const token = req?.headers?.authorization?.split(" ")[1];
       

//         if (!token) {
//             return res.status(401).json("Token missing");
//         }
//         console.log(req.headers.authorization); 

//         const decodedValue = jwt.verify(token, process.env.SECRET_KEY);

//         req.payload = decodedValue.email;

//         next();
//     } catch (err) {
//         console.log(err);
//         res.status(401).json("Invalid token");
//     }
// };

// module.exports = jwtMiddleware;


// const jwt = require('jsonwebtoken');

// const jwtMiddleware = (req, res, next) => {
//     try {
        

//         const token = req?.headers?.authorization?.split(" ")[1];
//         console.log("Request hit at jwt middleware");

//         if (!token) {
//             return res.status(401).json("Token missing");
//         }

//         //console.log(req.headers.authorization);

//         const decodedValue = jwt.verify(token, process.env.SECRET_KEY);

//         req.payload = decodedValue.email;

//         next();
//     } catch (err) {
//         console.log(err);
//         res.status(401).json("Invalid token");
//     }
// };

// module.exports = jwtMiddleware;



// const jwt = require('jsonwebtoken')

// const jwtMiddleware = (req, res, next) => {
//     try {
//         console.log("HEADERS:", req.headers)

//         const authHeader = req.headers.authorization
//         if (!authHeader) return res.status(401).json("Authorization header missing")

//         const parts = authHeader.split(" ")
//         if (parts.length !== 2 || parts[0] !== "Bearer") 
//             return res.status(401).json("Invalid authorization format")

//         const token = parts[1]
//         console.log("TOKEN RECEIVED:", token)

//         const decoded = jwt.verify(token, process.env.JWT_SECRET)
//         console.log("DECODED:", decoded)

//         req.payload = decoded.email
//         next()
//     } catch (err) {
//         console.log("JWT ERROR:", err)
//         res.status(401).json("Invalid token")
//     }
// }

// module.exports = jwtMiddleware


// repeated  middleware
 
// const jwt=require('jsonwebtoken')

// try{

//     const jwtMiddileware=(req,res,next)=>{
//     console.log("requist hit at jwt middile ware")
// const token=(req.headers.authorization.split(" ")[1])
// const decode_value=jwt.verify(token,process.env. SECRET_KEY)
// //console.log(decode_value)
// req.payload=decode_value.email
//     next()
// }

// catch (err){
//     console.log(err)
//     res.status(404).json("invalid token")

// }


// }

const jwt = require('jsonwebtoken')

const jwtMiddileware = (req, res, next) => {
    try {
        console.log("Request hit at jwt middleware")
        console.log("Headers:", req.headers)
        
        const authHeader = req.headers.authorization
        console.log("Auth header:", authHeader)
        
        if (!authHeader) {
            console.log("No authorization header found")
            return res.status(401).json("Authorization header missing")
        }

        if (!authHeader.startsWith("Bearer ")) {
            console.log("Invalid authorization format. Expected 'Bearer token'")
            return res.status(401).json("Invalid authorization format")
        }

        const token = authHeader.split(" ")[1]
        console.log("Token extracted:", token ? "Present" : "Missing")

        if (!token) {
            console.log("No token found after Bearer")
            return res.status(401).json("Token missing")
        }

        const decode_value = jwt.verify(token, process.env.SECRET_KEY)
        console.log("Token verified successfully for email:", decode_value.email)
        
        req.payload = decode_value.email
        next()

    } catch (err) {
        console.log("JWT verification error:", err.message)
        res.status(401).json("Invalid token")
    }
}

//default exporting
module.exports = jwtMiddileware