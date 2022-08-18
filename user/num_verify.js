const router = require('express').Router();
const User  = require ('../user/user-schema');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const{twilio} = require("../middleware/twilio");

let globalotp = 0;

router.post("/getin", async(req,res)=>{
    console.log("posting data");
    try{
        const name = req.body.name
        const email = req.body.email
        const mobilenumber = req.body.mobilenumber
        const password = req.body.password

        if(name && email && mobilenumber && password){
            
            let otp=Math.floor((Math.random()*1000)+1000)
            const message = `your veerification otp is ${otp}`
            await twiliomsg(message,mobilenumber,otp,res)
            
            globalotp = otp
            
            const user = new User(req.body);
            let salt = await bcrypt.genSalt(10)
            user.password = bcrypt.hashSync(user.password,salt)
            let result = await user.save();
            
            return res.json({status:"success", message:"user details added successfully"})
        }else{
            return res.json({status:"failed", message:  "please enter all details"})
        }
    }catch(err){

    }
})

router.post("verify-otp",async(req,res)=>{
    console.log("verifying otp");
    try{
        if(globalOtp==req.query.otp){
            const data= await User.findOne({mobilenumber:req.query.mobilenumber}).exec()
            if(data.verified){
                return res.json({status:"failed", message:"your account already verified"})
            }else{
                User.findOneAndUpdate({mobilenumber:req.query.mobilenumber},{verified:true}).exec()
                return res.json({status:"success", message:"your account verified successfully"})
            }
        }
    }catch(err){
        return res.json({status:"failed",message:"incorrect otp"})
    }
})
module.exports = router;