const twilio = require("twilio")(process.env.SID, process.env.TOKEN)

function twiliomsg(message, mobilenumber, otp, res){
    try{
        twilio.messages.create({
            from : +19705499536,
            to : "91"+mobilenumber,
            body : message
        }).then(sms=>{
            res.send({message:"sms sent",res:sms, otp:otp})
        }).catch(err=>{
            res .send({message:err.message})
        })
    
    }catch(error){
     console.log(err.message)
    }
}
module.exports = {twilio}

