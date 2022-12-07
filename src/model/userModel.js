const {Schema,model} = require('mongoose');
const jwt = require('jsonwebtoken')


const userSchema = Schema({
    number:{
        type:String,
        require:true
    }
},{timestamps:true});


userSchema.methods.generateJWT = function(){

    const token = jwt.sign({
     _id: this._id,
     number:this.number},
     'iam-secret-key',
     {expiresIn:'7d'});
     return token
 
 }
 

 module.exports.User = model('User',userSchema)