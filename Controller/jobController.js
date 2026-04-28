const jobs = require('../Models/jobMode')

// 1. ADD jobs post

exports.addjobPost = async(req,res)=>{        //req.body is an object coming from the client (frontend).
                                               //It contains all the data sent in the request.
try{
 const {title,location,jobType, salary,qualification,experience,description}=req.body // req.bodyil ninnu varunna ella dataneyum destructure chythu edukkunnu
 const existingjob= await jobs.findOne({title:title,location:location})  // job already posted ano ennu check chyunathu
  if(existingjob){
    res.status(400).json("alreday job posted")
}
else{
    const newJob=new jobs({title,location,jobType,salary,qualification, experience,description}) 
   await newJob.save()
   res.status(200).json(newJob)
}
    }
    catch(err){
   console.log(err)
   res.status(500).json(err)
    }
}

//2.list job post

exports.listJobPosts=async(req,res)=>{
try{
     const {search}=req.query
     console.log("Search parameter:", search)
     let filter = {}  //search nte akathe value store cheyan
     if(search && search.trim() !== ""){
       filter = {title:{$regex:search,$options:'i'}}
     }
     console.log("Filter being applied:", filter)
    const joblist = await jobs.find(filter)
    console.log("Jobs found:", joblist.length)
    console.log("Job data:", joblist)
    res.status(200).json(joblist)
}
catch(err){
    console.log("Error in listJobPosts:", err)
    res.status(500).json(err)
}

}   

//3. test database connection
exports.testDbConnection = async(req,res)=>{
try{
    // Add a test job
    const testJob = new jobs({
        title: "Software Developer",
        location: "Remote",
        jobType: "Full-time",
        salary: "50000",
        qualification: "Bachelors",
        experience: "2 years",
        description: "Test job posting"
    })
    await testJob.save()
    console.log("Test job added successfully")
    
    const totalJobs = await jobs.countDocuments()
    console.log("Total jobs in database:", totalJobs)
    const allJobs = await jobs.find()
    console.log("All jobs:", allJobs)
    res.status(200).json({totalJobs, allJobs})
}
catch(err){
    console.log("Database connection error:", err)
    res.status(500).json(err)
}
}

//4. remove job post

exports.deleteJobPost = async(req,res)=>{
    try{
     const {jid}=req.params
     const jobpost = await jobs.findByIdAndDelete(jid)
     res.status(200).json(jobpost)
    }
    catch(err){
        console.log(err)
     res.status(400).json(err)
    }
}