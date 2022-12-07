const privacyModel = require("../model/privacyPolicyModel")
const { isValidRequestBody } = require("../validator/validator");


module.exports.createPrivatePolicy = async (req, res) => {
  try {
    const requestBody = req.body;
    if (!isValidRequestBody(requestBody)) {
      res
        .status(400)
        .send({ status: false, msg: "please provide card details" });
    }

    const newPolicy = await privacyModel.create(requestBody)

    res.status(200).send({status:true,msg:"card added",data:newPolicy})
    
    } catch (error) {
            console.log(error);
            res.status(500).send({ status: false, msg: "server error" });
          }
    }
    

