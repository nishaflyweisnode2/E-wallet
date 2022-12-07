
const {Schema,model} = require('mongoose');



module.exports.Otp = model('Otp', Schema({
    number:{
        type:String,
        require:true
    },
    otp:{
        type:String,
        require:true
    },
    createdAt:{type:Date, default:Date.now, index: {expires:3600}}
    //after 1hr it will deleted from dB
},{timestamps:true}))