const mongoose=require("mongoose");

const subschema=new mongoose.Schema({
    stuUsername:String,
    roomNo:String,
    description:String,
    isSolved:Boolean,
});

const workerDetailsSchema= new mongoose.Schema(
    {
        username:String,
        password:String,
        occupation:String,
        hostel:String,
        wing:String,
        activeCases:[subschema],
    }
);

const worker=mongoose.model("worker",workerDetailsSchema);
module.exports=worker;