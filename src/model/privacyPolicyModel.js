const mongoose = require("mongoose")

const policySchema = new mongoose.Schema({
    policy:{
        type:String
    }
})

module.exports =  mongoose.model('policy', policySchema)