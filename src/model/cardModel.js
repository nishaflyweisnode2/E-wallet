const mongoose = require('mongoose');


const cardDetails = new mongoose.Schema({
    Bank:{type:String,required:true},
    CardHolderName:{type:String,required:false},
    AccountNumber:{type:Number,required:true,unique:true},
    ExpiryDate:{type:Date,required:true},
    CVV:{type:Number,required:true}
},{ timestamps: true });

module.exports = mongoose.model('addCard', cardDetails)