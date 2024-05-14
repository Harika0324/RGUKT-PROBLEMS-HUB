const express = require("express");
const cors = require("cors");
const mongoose=require("mongoose");
require('dotenv').config();
const app = express();
app.use(cors(
    
));
app.use(express.json());

// const URL = "mongodb+srv://vinaymada333:Vinaym333@students.zuoluxq.mongodb.net/?retryWrites=true&w=majority";

// mongoose.connect(URL).then(()=>{
//     console.log("Connection Successful");
// }).catch((e)=>console.log(e));

// {
//     origin:["https://deploy-problemshub-1whq.vercel.app"],
//     methods:["POST","GET"],
//     credentials:true
// }
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

app.listen(8080,()=>{
    console.log(`app is listening to port 8080...`);
});

const login=require("./studentschema.js");
const worker=require("./workerDetailsSchema.js");


app.post("/loginworker",async (req,res)=>{
    const {username,password}=req.body;
    const wor=await worker.find({username});
    if(wor.length==0){
        return res.json("failure");
    }
    else if(password==wor[0].password){
        return res.json("success");
    }
    else{
        return res.json("failure");
    }
});  
app.post("/login",async (req,res)=>{
    const {username,password}=req.body;
    const stu=await login.find({username});
    if(stu.length==0){
        return res.json("failure");
    }
    else if(password==stu[0].password){
        return res.json("success");
    }
    else{
        return res.json("failure");
    }
});


app.post("/problems/:username",async (req,res)=>{
    const {problem,hostel,wing,roomNo,description}=req.body;
    let {username}=req.params;
    const stu=await login.updateOne({username},{$push:{activecases:{problem:problem,hostel:hostel,wing:wing,roomNo:roomNo,description:description,isSolved:false}}});
    const wor=await worker.findOne({occupation:problem,hostel:hostel,wing:wing});
    const up=await worker.updateOne({username:wor.username},{$push:{activeCases:{stuUsername:username,roomNo:roomNo,description:description,isSolved:false}}});
    if(stu.length==0){
        return res.json("failure");
    }
    else{
        return res.json("success");
    }
});
app.post("/status/:username/:index",async(req,res)=>{
    let {username}=req.params;
    let {index}=req.params;
    const {problem,hostel,wing,roomNo,description}=req.body;
    console.log(req.body);
    const stu=await login.updateOne({username},{ $set: { [`activecases.${index}.isSolved`]: true } });
    const wor=await worker.findOne({occupation:problem,hostel:hostel,wing:wing});
    let indi=-1;
    wor.activeCases.map((row,index)=>{
        if(row.stuUsername===username&&row.roomNo===roomNo&&row.description===description){
            indi=index;
        }
    });
    if(indi!=-1){
        const k=await worker.updateOne({occupation:problem,hostel:hostel,wing:wing},{ $set: { [`activeCases.${indi}.isSolved`]: true }});
    }
    if(stu.length==0){
        return res.json("failure");
    }
    else{
        return res.json("success");
    }
});
app.get("/problems/:username",async (req,res)=>{
    let {username}=req.params;
    const stu=await login.findOne({username});
    if(stu.length){
        return stu.activecases;
    }
    res.send(stu.activecases);
});
app.get("/worker-post-login/:username",async (req,res)=>{
    let {username}=req.params;
    const wor=await worker.findOne({username});
    if(wor.length){
        return wor.activeCases;
    }
    res.send(wor.activeCases);
});