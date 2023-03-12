const express = require("express");
const app =express()
const mongoose = require("mongoose");
const cors = require("cors");
const pracModel = require('./Models/TodoSchama');
const TodoModel = require("./Models/TodoSchama");
// const bcrypt = require("bcryptjs/dist/bcrypt");
const userModal = require("./Models/userschema");



const PORT = process.env.PORT|| 5000;
const BASE_URI = `mongodb+srv://admin:admin12345@cluster0.bj2w8ev.mongodb.net/test`
mongoose.connect(BASE_URI).then((res)=>console.log("Connenct")).catch((err)=>console.log(err))

app.use(express.json());
app.use(cors())

app.get("/api/sample", (request, response) => {
    response.send("sample api hit");
  });

  app.get("/api/getting",(req,res,next)=>{
    TodoModel.find({},(err,data)=>{
        if(err){
            res.send("err",err)
        }
        else{
            res.json(data)
        }
    })
})


  app.post("/api/userinfo", (req, res) => {
    console.log(req.body)
    TodoModel.create(req.body,(err,data)=>{
      if(err){
        console.log(err,"err");
      }
      else{
        res.json(data)
      }
    })
  });
  app.delete("/api/delete",(req,res)=>{
    console.log(req.body)
    const {id}=req.body;
    TodoModel.findByIdAndDelete(id,(err,data)=>{
      if(err){
        console.log(err,"err")
      }else{
        res.json(data)
      }
    })
  })

  app.put("/api/update",(req,res)=>{
    console.log(req.body)
    const {id}=req.body;
    TodoModel.findByIdAndUpdate(id,{todo:req.body.todo},(err,data)=>{
      if(err){
        console.log(err,"err")
      }else{
        res.json(data)
      }
    })
  })



app.post("/api/signup", async (req,res)=>{
  const {name , email , password} = req.body;

if(!name||!email||!password ){
  res.json("filleds are missing")
  return
}

const haspassword = await bcrypt.hash(password,10);


const Userdata = {
  name ,
  email,
  password : haspassword

}

userModal.findOne({email} , (err , user)=>{
  if(err){
    console.log(err)
    res.json({message : "something went wrong"})
  }else{
    console.log(user)

    if(user){
      res.json({message : " user already exists"})
    }else(userModal.create(Userdata , (err , data )=>{
      if(err){
        res.json({message : " something went wrong"})
      }
      else{
        res.json({message :" signup sucessfully",
      data : data})
      }
    }))

  }
  


}

)})


app.post ("/api/login" ,  (req , res) =>{
  const { email , password} = req.body;

  if(!email||!password ){
    res.json("filleds are missing")
    return
  }
userModal.findOne({email}, async (err , user)=>{
  if(err){
    res.json({message : "something went wrong"})
  }else{
    if(user){
      const matching = await bcrypt.compare(password , user.password)
      res.json({...user})
    }
    else{
      res.json({
      message : "credential error"
    })
    }
  }
})


})



  app.listen(PORT, () => console.log(`server running on localhost:${PORT}`));