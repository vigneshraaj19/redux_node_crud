const router= require('express').Router();
const {User}=require('./Userschema');
const {ObjectId}=require("mongodb")

router.get('/user',async (req,res) =>{
    
    try{
        const userData=await User.find({});
        res.send(userData)
    }
    
    catch(err){
       res.status(500).send({message:"Internal server error"});
    }  
});


router.delete("/delete/:_id", async function (request, response) {
    const { _id } = request.params;
    console.log(_id,"wrhwior");
    var u_id = new ObjectId(_id);
   const result = await User.deleteOne({ _id: u_id });
   response.send(result);
  });

  router.post("/user/add",async function (req,res){  
    const data=req.body;
     console.log(data);

    const result = new User({
        name:req.body.name,
        email:req.body.email,
        role:req.body.role,
        phone:req.body.phone
    }).save();
    res.send(result);
    
});

  router.get("/updatedata/:_id", async function (request, response) {
    const { _id } = request.params;
    var u_id = new ObjectId(_id);
   const result = await User.findOne({ _id: u_id });
   response.send(result);
  });

  router.put("/update", async function (request, response) {
 
    const data=request.body;
     var u_id = new ObjectId(data.id);
     console.log(data,u_id)
     const result=await User.updateOne({_id : u_id }, {$set: {name : request.body.name,
        phone : request.body.phone,
        email : request.body.email,
        role : request.body.role}});
     console.log(result)
    response.send(result);
  });


module.exports=router;