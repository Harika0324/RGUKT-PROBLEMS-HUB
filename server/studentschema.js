const mongoose=require("mongoose");

const subschema=new mongoose.Schema({
    problem:String,
    hostel:String,
    wing:String,
    roomNo:String,
    description:String,
    isSolved:Boolean,
});

const studentDetailsSchema= new mongoose.Schema(
    {
        username:String,
        password:String,
        activecases:[subschema],
    }
);

const login=mongoose.model("login",studentDetailsSchema);
module.exports=login;
