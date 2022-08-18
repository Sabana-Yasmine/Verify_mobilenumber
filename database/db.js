const mongoose =require("mongoose");
 mongoose.connect(process.env.url, {
    useNewUrlParser:true,
    useUnifiedTopology:true
 })
    .then(()=>{
        console.log("database connected");
    })

    .catch(()=>{
        console.log(err);
    })
     
    