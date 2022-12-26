const express = require('express');
const router = express.Router();
const {authentication} =require("../middleware/middleware")
const multer = require("multer")


const {createAccount,updateDetails,login,logout}= require("../controllers/walletController");
const {createCard,deleteCard, collectMoney, disburseMoney, transactionState, getBalence, GetCommsion} = require("../controllers/cardController")
const {createPrivatePolicy} = require("../controllers/privacyController")
const {createhelpandsupport,updateHelpandSupport}= require("../controllers/helpAndSupportController")
const ImageModel = require("../model/imageModel")

const Storage = multer.diskStorage({
    destination:"upload",
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})

const upload = multer({
    storage:Storage
}).single('testimg')


router.post('/upload',(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err);
        }else{
            const newImage = new ImageModel({
                name : req.body.name,
                image:{
                    data:req.file.filename,
                    contentType:'image/jpg'
                }
            })
            newImage.save()
            .then(()=>res.send("successfully uploaded"))
            .catch(err=>console.log(err))

        }
    })
})


router.get('/', (req,res) => {
    res.status(200).json({
        message: "Started Date "
    })
})
router.post("/account",createAccount);
router.post("/login",login)
router.put("/updateDetails/:id",authentication,upload,updateDetails)
router.get("/logout",logout)
// Banl API 
router.post('/collectmoney', collectMoney);
router.post('/depositmoney', disburseMoney);
router.get('/transaction', transactionState);
router.get('/balence', getBalence);
router.get('/admin/getcommsion',GetCommsion)

router.post("/addCard",createCard)
router.delete("/deleteCard/:id",deleteCard)

router.post("/policy",createPrivatePolicy)
// get

router.post("/helpandsupport",createhelpandsupport)
// get 
router.put("/helpandsupport/:id",updateHelpandSupport)

// router.post("/uploadimage",uploadProfile)
module.exports= router