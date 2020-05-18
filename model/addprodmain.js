var mongoose=require("mongoose");

var nameSchema=new mongoose.Schema({
    imgpath:String,
    price:Number,
    title:String,
    description:String,
    category:String
    });
    //model
    module.exports=mongoose.model("prodmain",nameSchema);