const bcrypt = require('bcrypt')
const _ = require('lodash')
const axios = require('axios')
const otpGenerator = require('otp-generator')

var accountSid = process.env.TWILIO_ACCOUNT_SID; 
var authToken = process.env.TWILIO_AUTH_TOKEN;

const twilio = require('twilio')
var client = new twilio(accountSid,authToken)
require("dotenv").config();
// process.env.DB_HOST,


const { User} = require('../model/userModel')
const{Otp} = require('../model/otpModel')
// const loginModel  = require("../model/loginModel")

module.exports.signUp = async(req,res)=>{

 const user = await User.findOne({
    number:req.body.number
 });

 if(user) return res.status(400).send("user alredy registered")
const OTP = otpGenerator.generate(6,{  digits:true,upperCaseAlphabets:false,lowerCaseAlphabets:false,specialChars:false})

const number = req.body.number;
console.log(OTP);


   client.messages.create({
                from:process.env.PHONE_NO,
                to:number,
                body:OTP
   })
   

const otp =new Otp({number:number, otp:OTP});
const salt = await bcrypt.genSalt(10)
otp.otp = await bcrypt.hash(otp.otp,salt)

const result = await otp.save();
return res.status(200).send({message:'Otp sent Successfully'})

}

module.exports.verifyOtp = async(req,res)=>{
const otpHolder = await Otp.find({
    number :req.body.number
})
if(otpHolder.length === 0)
return res.status(400).send({message:'your otp has expired'})

const rightOtpFind = otpHolder[otpHolder.length-1];
const validUser = await bcrypt.compare(req.body.otp,rightOtpFind.otp)

if(rightOtpFind.number == req.body.number && validUser){
    const user = new User(_.pick(req.body,['number']))
    const token = user.generateJWT();
    const result = await user.save()
    return res.status(200).send({
        message:"user Registation Success",
        token :token,
        data:result

    })

}else{
    return res.status(400).send('Your OTP was wrong')
}
}



function generateOTP() {
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++ ) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}


exports.login = async(req,res) => {
    try{
     const number = req.body.number
     const OTP = generateOTP();
     const data = await Otp.find({number: number})
     console.log(data)
     if(data.length == 0){

     const userData = await Otp.create({
        number:number,
        otp: OTP
     })
      return res.status(200).json({
        OTP : userData.otp
     })
    }else{
      return   res.status(200).json({
        otp: data[0].otp
      })
    }
    }catch(err){
        console.log(err);
    }
}

exports.verifyotp = async(req,res) => {
    try{
   const data = await Otp.find({otp: req.body.otp});
   if(data.length == 0){
    return res.status(500).json({
        message: "Invalid Otp"
    })
   }else{
    res.status(200).json({
        message: "Login Done"
    })
   }
    }catch(err){
        console.log(err);
        res.status(400).json({
            message: "Something Wrong "
        })
    }
}


exports.getUserData = async(req,res) => {
    try{
const data = await User.find();
res.status(200).json({
    details: data
})
    }catch(err){
        res.status(400).json({message:err.message})
    }
}

