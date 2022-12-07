const mongoose  =require("mongoose")
const walletDetails = new mongoose.Schema({

    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
      required: true,
    },
    profileImage :{
     type : String
    }
  },
  { timestamps: true }
);


module.exports = mongoose.model('addWallet', walletDetails)