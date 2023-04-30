const express=require("express")
const mongoose=require("mongoose");
const dotenv = require('dotenv');

const cors = require("cors"); 
const crudroutes = require("./Userrouter");
const app=express();

dotenv.config(); 
app.use( cors({ origin: "*"}) );
app.use(express.json());

app.get("/abc", async(req,res)=>{
    res.send("App works successfully")
})

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

  app.use('/api',crudroutes);


app.listen(process.env.PORT,()=>{
    console.log(`Server started on ${process.env.PORT}`)
})
