// user schema
var mongoose=require("mongoose");

var nameSchema=new mongoose.Schema({
    Fname:String,
    Lname:String
    });
    //model
    module.exports=mongoose.model("user",nameSchema);