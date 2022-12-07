const cardModel = require("../model/cardModel");
const { isValid, isValidRequestBody } = require("../validator/validator");

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
module.exports = {createCard,deleteCard}