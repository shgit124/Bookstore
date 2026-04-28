const applications = require('../Models/Applicationmodel')
// const appplication = require('../Models/Applicationmodel')
// 1 add application

exports.addApplication = async (req,res)=>{
    try{
        console.log("Request body:", req.body)
        console.log("Request file:", req.file)
        
      const data=req.body
      const file=req.file
      const {fullname,qualification,email,phone,coverletter,jobId,jobTitle}=req.body
      const resume=req.file?.filename
      console.log("Resume filename:", resume)
      const existingApplication= await applications.findOne({email,jobId})
      if(existingApplication){
        res.status(400).json("Application Already Added!!!")
      } 
      else{
        const newApplication=new applications({
            fullname,qualification,email,phone,coverletter,jobId,jobTitle,resume
        })
        await newApplication.save()
        res.status(200).json(newApplication)

      }
    //    console.log(file,data)
    //    res.status(200).json("success")

    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}   
// exports.addApplication =(req,res)=>{
// try{
//    const data=req.body   // for checking purpose 
//    const file=req.file
//    console.log(req,file)
//    res.status(200).json("success")
// }
//  catch(err){
//         console.log(err)
//          res.status(500).json(err)
//      }
// }

// Admin
         // get list applications
exports.listApplication = async (req, res) => {
    try {
        const applicationList = await applications.find();
        return res.status(200).json(applicationList);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};