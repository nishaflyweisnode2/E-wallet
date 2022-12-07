const  mongoose = require("mongoose")

const helpandsupport = new mongoose.Schema({
    email:{
        type:String
    },
    whatsapp:{
        type:Number

    }
})

module.exports =  mongoose.model('helpandsupport', helpandsupport)