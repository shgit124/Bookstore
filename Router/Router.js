const express =require('express')
// const jwtmiddile=require('../Middilewares/Middileware')
const jwtmiddile=require('../Middilewares/jwtMiddileware')
const multerConfig=require('../Middilewares/multtermiddleware')
const pdfmulterConfig=require('../Middilewares/Pdfmultermiddilware')

const userController=require(`../Controller/userController`)
const bookcontroller=require('../Controller/bookController')
const jobcontroller=require('../Controller/jobController')
//const applicationController=require('../controller/ApplicationController')
const applicationController=require('../Controller/applicationController')
const adminjwtmiddle=require('../Middilewares/adminJwtMiddileware')

const router=express.Router()

//sign up creating a new server
//localhost:3000/signup + {username:"hari",email:"hari@gmail.com",password:"123"}
//user
router.post('/signup',userController.signup)
router.post('/signin',userController.signin)
// router.get('/getProfile',userController.getProfile)
router.post('/google-login',userController.googleSignin)
//user update
router.put('/profile-update',jwtmiddile,multerConfig.single('profile'),userController.profileUpdate)
//router.get('/get-profile',jwtmiddile,userController.getProfile)
router.get('/get-profile',jwtmiddile,userController.getProfile)
//user buy book



//  Books
//router.post('/add-book',jwtmiddile,multerConfig.array('uploadImg',3),bookcontroller.addbook)
router.post('/add-book',jwtmiddile,multerConfig.array('uploadImg',3),bookcontroller.addbook)

// all book
router.get('/all-books',jwtmiddile,bookcontroller.homeBookList)

//fetch latest book
router.get('/home-books',bookcontroller.getLatestBooks)

// get book by ID
router.get('/getbookByid/:id',jwtmiddile,bookcontroller.getBookById)

// get purchased books
router.get('/purchased-books',jwtmiddile,bookcontroller.getBoughtBooks)

// get user added books
router.get('/user-books',jwtmiddile,bookcontroller.getUserBooks)

// get user deleted books
router.delete(`/getbook/:bid/delete`,jwtmiddile,bookcontroller.deleteBookById)

// public route for testing - get all books without authentication
router.get('/public-books',bookcontroller.homeBookList)

router.get(`/list-jobpost`,jwtmiddile,jobcontroller.listJobPosts)
router.get(`/test-jobs`,jwtmiddile,jobcontroller.testDbConnection)
router.post(`/purchase-books`,jwtmiddile,bookcontroller.purchaseBookstripe)

// Stripe webhook endpoint
router.post('/stripe-webhook', express.raw({type: 'application/json'}), bookcontroller.stripeWebhook)

// add application job
router.post('/apply-jobpost',jwtmiddile,pdfmulterConfig.single('resume'),applicationController.addApplication)

// ADMIN RELATED 

router.get(`/admin/get-books`,adminjwtmiddle,bookcontroller.getAdminallbooks)  //get all books
router.get('/admin/get-allusers',adminjwtmiddle,userController.getAdminAllusers)
router.patch(`/admin/approve-book/:bid`,adminjwtmiddle,bookcontroller.approveBook)
router.post(`/admin/add-jobpost`,adminjwtmiddle,jobcontroller.addjobPost)
router.get(`/admin/list-jobpost`,adminjwtmiddle,jobcontroller.listJobPosts)
router.delete('/admin/delete-jobpost/:jid', adminjwtmiddle, jobcontroller.deleteJobPost)
//router.put(`/admin/update-admin`,adminjwtmiddle,userController.getAdminprofileUpdate) 
router.put('/admin-profile-update',jwtmiddile,multerConfig.single('profile'),userController.profileUpdate)
router.get('/admin/get-application',adminjwtmiddle,applicationController.listApplication)


//default export syntax




module.exports=router