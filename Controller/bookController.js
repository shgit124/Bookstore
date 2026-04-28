


//checking part
//..... book related ayittulla operation nadathan vendi bookcontroller use cheyyunnu
    const books=require('../Models/bookmodel')
    const stripe=require('stripe')(' SECRET_STIPE')

// ADD BOOKS
    exports.addbook=async (req,res)=>{
    try{
           
           console.log("Add book Api")
        //....req.bodyil ninnum data collect chythittu same fieldil thanne data ye ayakkan
           const {title,author,noofpages,image,price,discountprice,abstract,publisher,language,isbn,category}=req.body

      
      //....... user mail mention cheyyan 
           const usermail=req.payload
      //upoload imagilekku varunna files ne store chyan forEach use cheyyunnu
           const uploadImg=[]
           req.files.forEach(item=>{uploadImg.push(item.filename)})
           console.log(title,author,noofpages,image,price,discountprice,abstract,publisher,language,isbn,category,uploadImg,usermail)
    //   console.log(req.body)
    //   console.log(req.files)

    //..... store cheyunathinu munbu user same book upload chythittundo ennu check chyyanam 
             const existingBook= await books.findOne({usermail,title})
             console.log(existingBook)
        if(existingBook){
              res.status(404).json("you have already added the Book!!!")
              }
              //...book exist allenkil new book create cheyyyan
        else{
              const newBook= new books({title,author,noofpages,image,price,discountprice,abstract,publisher,language,isbn,category,usermail})
              await  newBook.save()
              res.status(200).json("book Added successfully")
        }
      
       } catch (err){
        res.status(500).json(err)
       }
      }

  //4 latest books



    // all books 
    exports.homeBookList=async(req,res)=>{
      try{
           const userMail = req.payload
           const {search} = req.query
           console.log("Search query:", search)
           console.log("User email:", userMail)
           let filter={}
    

    if(search){
           filter={title:{$regex:search,$options:'i'}}
    }else if(userMail){
           filter={usermail:{$ne:userMail}}
    }
           console.log("Filter applied:", filter)
           const booklist=await books.find(filter)
           console.log("Books found:", booklist.length)
           res.status(200).json(booklist)
      }
    catch (err){
      console.log(err)
      res.status(500).json({error: "Failed to fetch books", details: err.message})
    }
     
    }

    // fetch latest 4 books for home page
    exports.getLatestBooks=async(req,res)=>{
      try{
     const booklist=await books.find().sort({_id:-1}).limit(4)
     res.status(200).json(booklist)
      }
        catch(err){
        console.log(err)
        res.status(500).json(err)
      }
    }

    // fetch book document by id
    exports.getBookById=async(req,res)=>{
      try{
      const {id}=req.params
     const bookData=await books.findById(id)
      //console.log(bookId)
      res.status(200).json(bookData)
      }
      catch(err){
        console.log(err)
        res.status(500).json(err)
      }
    
    }
    // fetch books added by Authorized user
    exports.getUserBooks=async(req,res)=>{
    try
    {
      const usermail=req.payload
      console.log("Fetching books for user:", usermail)
      const booklist=await books.find({usermail:usermail})
      console.log("User books found:", booklist.length)
      res.status(200).json(booklist)
    }
   catch(err){
   console.log(err)
   res.status(500).json({error: "Failed to fetch user books", details: err.message})
   }   
    }
 
    //delete books by user 
    exports.deleteBookById=async(req,res)=>{
   try{
    const {bid}=req.params
    const deleteBook = await books.findByIdAndDelete(bid)
    res.status(200).json("book deleted successfully")

   }catch(err){
    console.log(err)
    res.status(500).json(err)
   }
    }

    // Booklist purchased by user
    exports.getBoughtBooks=async(req,res)=>{
      try{
            const usermail=req.payload  // first usermail eduthu vakkunnu bcoz aranu purchase chyunathu ariyan
            console.log("Fetching purchased books for user:", usermail)
            const boughtBookList=await books.find({bought:usermail})  // next filter cheyunnu books enna modelil ninnum usermail vachu kondu
            console.log("Purchased books for", usermail, ":", boughtBookList.length)
            console.log("Purchased books data:", boughtBookList)
            res.status(200).json(boughtBookList)
      }
      catch(err){
            console.log(err)
             res.status(500).json({error: "Failed to fetch purchased books", details: err.message})
      }
     }

//      // payment related 
// exports.getBoughtBooks = async (req, res) => {
//   try {
//        console.log("inside purchase book-stripe controller");
//        const { _id, title, author, price, discountPrice } = req.body;

// if (!_id) {
//           return res.status(400).json({ message: "Book ID is missing" });
// }

// const updateBook = await books.findByIdAndUpdate(
//   _id, // ✅ FIXED
//   {
//     title,
//     author,
//     price,
//     discountPrice,
//     status: "sold",
//     bought: email
//   },
//   { new: true }
// );
//     const line_items = [
//       {
//         price_data: {
//           currency: "usd",
//           product_data: {
//             name: title,
//             description: `${author} | ${publisher}`,
//             images: [image]
//           },
//           metadata: {
//             title,
//             author,
//             noofpages,
//             image,
//             price,
//             discountPrice,
//             abstract,
//             language,
//             isbn,
//             category,
//             uploadImg,
//             userMail,
//             status: "sold",
//             bought: email
//           },
//           unit_amount: Math.round(discountPrice * 100) // ✅ fixed
//         },
//         quantity: 1
//       }
//     ];

//     const session = await stripe.checkout.sessions.create({
//       success_url: "http://localhost:5174/payment-success",
//       cancel_url: "http://localhost:5174/payment-error",
//       payment_method_types: ["card"],
//       line_items,
//       mode: "payment"
//     });

//     console.log({ checkoutPaymentUrl: session?.url });

//     res.status(200).json({
//       message: "Checkout session created",
//       url: session.url
//     });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// };

// user buy book 
exports.purchaseBookstripe = async(req,res)=>{
  try{
        console.log("inside purchase book-stipe controller")
        const {_id,title,author,noofpages,image,price,discountPrice,abstract,publisher,language,isbn,category,uploadImg,userMail}=req.body
        const email=req.payload
        
        // Don't update book status yet - wait for payment completion
        // const updateBook =  await books.findByIdAndUpdate(_id,{title,author,noofpages,image,price,discountPrice,abstract,language,isbn,
        // category,uploadImg,category,userMail,status:'sold',bought:email}, {new:true})
        
        // check session 
     const line_items = [{

        price_data: {
        currency: "usd",
        product_data: {
        name: title,
        description: `${author} | ${publisher}`,
        images: [image],
      },
        unit_amount: Math.round((discountPrice || price) * 100)
    },
        quantity: 1,
  }];
   const metadata = {title,author,noofpages, image,price,  discountPrice, abstract,language,isbn,category,uploadImg,userMail,
                     bought: email,
                     bookId: _id
                     }
        const session = await stripe.checkout.sessions.create({
          success_url:"http://localhost:5173/payment-success",
          cancel_url:"http://localhost:5173/payment-error",
          payment_method_types:['card'],
          line_items,
          metadata,
          mode:'payment'
        })
        console.log({checkoutPaymentUrl:session?.url})
        res.status(200).json({checkoutPaymentUrl:session?.url})
  }
          catch(err){
          console.log(err)
          res.status(500).json(err)
  }
}


// Stripe webhook endpoint for payment completion
exports.stripeWebhook = async(req,res)=>{
  try{
    const sig = req.headers['stripe-signature'];
    let event;
    
    // Replace with your webhook secret
    const webhookSecret = 'whsec_...'; // You need to set this in Stripe dashboard
    
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err) {
      console.log('Webhook signature verification failed.', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    
    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const metadata = session.metadata;
      
      console.log('Payment completed for:', metadata);
      
      // Update the book status to 'sold' and set the buyer email
      if (metadata.bookId && metadata.bought) {
        const updateBook = await books.findByIdAndUpdate(metadata.bookId, {
          status: 'sold',
          bought: metadata.bought
        }, {new:true});
        
        console.log('Book updated successfully:', updateBook);
      }
    }
    
    res.json({received: true});
  }
  catch(err){
    console.log('Webhook error:', err);
    res.status(500).json(err);
  }
}

// Admin Related books Api  GET all books
exports.getAdminallbooks=async(req,res)=>{
  try{
       const booklist=await books.find()
       res.status(200).json(booklist)
  }
  catch(err){
    console.log(err)
    res.status(500).json(err)
  }
}

// admin book approval

exports.approveBook= async(req,res)=>{
  try{
       const {bid} = req.params
       const updatedBook= await books.findByIdAndUpdate(bid,{status:"approved"},{new:true})
       updatedBook.save()
       res.status(200).json(updatedBook)
  }
  catch(err){
       console.log(err)
       res.status(500).json(err)
  }
}