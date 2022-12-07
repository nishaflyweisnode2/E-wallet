const helpandsupportModel = require("../model/help&supportModel")
const { isValidRequestBody } = require("../validator/validator");

exports.createhelpandsupport  = async (req, res) => {
    try {
      const requestBody = req.body;
      if (!isValidRequestBody(requestBody)) {
        res
          .status(400)
          .send({ status: false, msg: "please provide card details" });
      }
  
      const helpandsupport = await helpandsupportModel.create(requestBody)
  
      res.status(200).send({status:true,msg:"created ",data:helpandsupport})
      
      } catch (error) {
              console.log(error);
              res.status(500).send({ status: false, msg: "server error" });
            }
      }
      
  
      exports.updateHelpandSupport = async (req,res)=>{
        try {
            const supportId = req.params.id;
            const requestBody = req.body
            if (Object.keys(req.body) == 0) {
                return res.status(400).send({ status: false, message: 'please provide data for updation' })
            }
            

            const updateDetails = await helpandsupportModel.findByIdAndUpdate(supportId, { ...requestBody}, { new: true }
            )
              console.log(updateDetails);
            return res.status(200).json({ status: true, message: "details updated successfully",data:updateDetails })
    
        } catch (error) {
          console.log(error)
            res.status(500).send(error)
        }
    }
    