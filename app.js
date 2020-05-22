var express = require("express");
var cont=require(__dirname+"/controolers/controlapp");
var assert=require("assert");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var admin=require(__dirname+"/model/admin.js");
const formidableMiddleware = require('express-formidable');
var bodyparser = require("body-parser");

var urlencodedParser = bodyparser.urlencoded({ extended: true });
var initiatemongo=require("../mynewapp/config/db");

var session=require("express-session");


//install admin bro to add admin panyel
// initiate connection
initiatemongo();
//restful API thru which data i added
var app = express();

app.set("view engine","ejs");

app.use("/admin",admin);
app.use(express.static( __dirname+ "/profile"));

app.set('trust proxy', 1);
 var k=   app.use(session({
      secret: 'keyboard cat'
      
    }));
app.get("/", function(req, res) {
  
  
    res.render("logger");
  
  
});



app.get("/logout",function(req,res){
  req.session.destroy(function(err){
    if(err){
      res.negotiate(err);
    }
    else{
      res.redirect("/");
    }
  });
});
/* session example
app.get("/session_count",function(req,res){

  if(req.session.count){
    req.session.count++;
    res.send("count"+req.session.count);
  }
  else{
    req.session.count=1;
    res.send("welcome first time count"+req.session.count);
  }
});*/


app.get("/session_count",function(req,res){

  if(req.session.count){
    req.session.count++;
    res.send("count"+req.session.count);
  }
  else{
    req.session.count=1;
    res.send("welcome first time count"+req.session.count);
  }
  });

cont(app);
app.listen(3008);
console.log('connection  made to port 3003');




