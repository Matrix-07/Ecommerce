// user schema
var mongoose=require("mongoose");

var nameSchema=new mongoose.Schema({
    Fname:String,
    Lname:String,
    email:String,
    birthdate:String,
    pass:String,
    Country:String,
    mobilenumber:String,
    state:String
    });
    //model
    module.exports=mongoose.model("user",nameSchema);