const walletModel = require("../model/walletModel");
const jwt = require("jsonwebtoken");
const { isValid, isValidRequestBody, isValidEmail ,isValidPhoneNumber} = require("../validator/validator");

const createAccount = async (req, res) => {
  try {
    const data = req.body;

    if (!isValidRequestBody(data))
      res.send(400)({ status: false, msg: "body cant be empty" });
    

    const { fullName, email, phoneNumber, password, confirmPassword } = data;

    if (!isValid(fullName)) {
      return res.status(400).send({ status: false, msg: "invalid credentials" });
    }


    if (!isValidEmail(email)) {
      return res.status(400).send({ status: false, msg: "email is required" });
    }
   

    if (!isValidPhoneNumber(phoneNumber)) {
        return res.status(400).send({ status: false, message: 'phoneNumber is required' })
    }


    if (!(password)) {
      return res.status(400).send({ status: false, msg: "provide password" });
    }

    if (!(confirmPassword)) {
      return res.status(400).send({ status: false, msg: "please provide confirmPassword" });
    }

    if(password != confirmPassword)
      return res.status(400).send({status:false,msg:"password mismatch"})
    
    const newAccount = await walletModel.create(data);
    res.status(201).send({status: true,msg: "account created successfully",data: newAccount});
  } catch (error) {
    console.log(error)
    res.status(500).send({ status: false, msg: "server error" });
  }
};



const updateDetails = async (req,res)=>{
    try {
        const walletId = req.params.id;
        const updateDetails = await walletModel.findByIdAndUpdate(walletId,
          {fullName : req.body.fullName,
          profileImage : `/upload/${req.file.originalname}`}, 
          { new: true }
        )

          console.log(updateDetails);
        return res.status(200).json({ status: true, message: "details updated successfully",data:updateDetails })

    } catch (error) {
      console.log(error)
        res.status(500).send(error)
    }
}



const login = async (req, res) => {
  try {
    let data = req.body;
    let phoneNumber = data.phoneNumber;
    let password = data.password;

    
    let result = await walletModel.findOne({
      phoneNumber: phoneNumber,
      password: password,
    });
    if (!result) {
      return res
        .status(404)
        .send({ status: false, msg: "Invalid Credentials,please Check..!!" });
    }
    let payload = { _id: result._id };
    let token = jwt.sign(payload, "viper");
    res.setHeader("x-auth-token", token);
   return res.send({ status: true, msg: "Successfully LoggedIn", tokenData: token });
  } catch (error) {
    console.log(error);
   return res.status(500).send({ status: false, msg: "server error" });
  }
};

const logout = async (req, res, next) => {
  try {
    req.session.destroy();
    res.redirect("/");
  } catch (error) {
    res.status(500).send(error);
  }
  next();
};


module.exports = { createAccount,updateDetails,  login, logout}

// git push --set-upstream origin otp