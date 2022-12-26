const mongoose = require('mongoose');


const CommissionSchema = mongoose.Schema({
   userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref:"'User" 
   }, 
   commsion : {
    type: Number
   }
})

const commission  = mongoose.model('commission', CommissionSchema)
module.exports = commission