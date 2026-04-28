//request handler nu reqst objectnu form datane access chyan pattilla athinu vendiyanu multer use cheyyunathu 
// install multer npm i multer file eppayum save cheyyunath server nte storage space thanne yanu store cheyyan povunnathu
// requstinte koode bodiyil  varunna form data contentine handle cheyan vendiyanu multer use cheyunathu or image and file uploading 
const multer=require('multer')


// evide store cheynam ennu mention cheyyan athile storage congiguration instance anu first creat cheyndathu
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./bookImages')
    },

    // oro file name yum eathu peril store cheynam nnu ariyan vendi Actual name nte koode imagum time varan vendiyanu
    // const filename=`Image-${Date.now()}-${file.originalname}` egane kodukkunathu 
    filename:(req,file,cb)=>{
       const filename=`Image-${Date.now()}-${file.originalname}`
       cb(null,filename)
    }
})

// file filter use cheyunnathu athinte mimetype checku chythu store cheyuum allenkil false 
const filefilter=(req,file,cb)=>{
    if(file.mimetype==="image/jpg" || file.mimetype==="image/png" || file.mimetype==="image/jpeg"){
        cb(null,true)
    }
    else{
        cb(null,false)
    }

}

// storage configurationeyum file filterneyum multer package provide cheyuuna multer middilewarilekku  configure cheyyanam 
// multer confignu shesham routes il import cheyanam


const multerConfig=multer({     //multer config enna variblekku multer package oru funtion ayittu call chythu vekkunnu
       storage,
      fileFilter: filefilter
})

module.exports=multerConfig



