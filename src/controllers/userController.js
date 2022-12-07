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

