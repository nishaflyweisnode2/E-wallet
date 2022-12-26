const momo = require('@chipdeals/momo-api')
const cardModel = require("../model/cardModel");
const { isValid, isValidRequestBody } = require("../validator/validator");
const commission = require('../model/admin')
momo.setApiKey('test-010b63d5-d10b-4e6b-b2b5-c1a62cc38f36')

const createCard = async (req, res) => {
  try {
    const requestBody = req.body;
    if (!isValidRequestBody(requestBody)) {
      res
        .status(400)
        .send({ status: false, msg: "please provide card details" });
    }

    const { Bank, CardHolderName, AccountNumber, ExpiryDate, CVV } = req.body;

    if (!isValid(Bank)) {
      return res
        .status(400)
        .send({ status: false, msg: "invalid credentials" });
    }

    if (!(CardHolderName)) {
      return res
        .status(400)
        .send({ status: false, msg: "please provide card holder name" });
    }


    if (!isValid(AccountNumber)) {
        return res
        .status(400)
        .send({ status: false, msg: "AccountNumber is required" });
    }
    
    
    if (!/^\d{9,18}$/.test(AccountNumber)) {
        return res.status(400).send({ status: false, msg: "invalid AccountNumber" });
      }


  if (!(ExpiryDate)) {
    return res
      .status(400)
      .send({ status: false, msg: "ExpiryDate is required" });
  }

  
  if (!(CVV)) {
    return res
      .status(400)
      .send({ status: false, msg: "invalid CVV" });
  }
  
const newCard = await cardModel.create(requestBody)

res.status(200).send({status:true,msg:"card added",data:newCard})

} catch (error) {
        console.log(error);
        res.status(500).send({ status: false, msg: "server error" });
      }
}





const deleteCard = async (req,res)=>{
try {
    await cardModel.findByIdAndDelete(req.params.id);
res.status(200).send({status:true,msg:"card deleted successfully"})

} catch (error) {
    console.log(error);
    res.status(500).send({ status: false, msg: "server error" });  
}
}


const collectMoney = async(req,res) => {
  try{
    const comm = (req.body.amount /100) *3;
    const Data = await commission.create({
      userId: req.body.userId, 
      commsion: parseInt(comm)
    });
   console.log(Data)
 const data =    momo.collect().amount(req.body.amount).currency('XOF').from(req.body.accountNumber).firstName(req.body.firstName).lastName(req.body.lastName).setFee(0.7, true).create(transacrionReference => console.log(transacrionReference)).onStatusChanged(paymentData => console.log(paymentData)).onSuccess(paymentData=> res.status(200).send(paymentData, Data))
    .onError(paymentData =>  res.status(400).json({message: paymentData}))
 
 
    
   //res.status(200).json({message: data})
  }catch(err){
    console.log(err);
   
  }
}


const disburseMoney = async(req,res) => {
  try{
 const data =    momo
 .deposit()
 .amount(req.body.amount) 
 .currency('XOF') 
 .to(req.body.accountNumber) 
 .create(transacrionReference =>   console.log(transacrionReference))
 .onSuccess(depositData => res.status(200).json(depositData))
 .onError(depositData =>   res.status(400).json(depositData))
  // res.status(200).json({details: data})
  }catch(err)
  {
    console.log(err)
  }
}


const transactionState = async(req,res) => {
  try{
    const reference = req.body.reference
momo
 .status(reference)
 .then((transactionData)=>res.status(200).json({details: transactionData}))
  }catch(err){
    console.log(err)
  }
}

const getBalence = async(req,res) => {
  try{
    momo
    .balance()
    .then((balance)=>res.status(200).json({message:balance})) 
  }catch(err){
    res.status(400).json({
      message:err.message
    })
  }
}

const GetCommsion = async(req, res) => {
  try{
   const data = await commission.find();
   res.status(200).json({data})
  }catch(err){
    res.status(400).json({
      message: err
    })
  }
}



module.exports = {createCard,deleteCard, collectMoney, disburseMoney, transactionState, getBalence, GetCommsion}