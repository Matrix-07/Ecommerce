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

/*var session=require("express-session");*/

//install admin bro to add admin panel
// initiate connection
initiatemongo();
//restful API thru which data i added
var app = express();

app.set("view engine","ejs");

app.use("/admin",admin);
app.use(express.static( __dirname+ "/profile"));
app.get("/", function(req, res) {
  res.sendFile(__dirname+"/index.html");
});

/*
    if(req.body.submit==="login")
    {
    //this is login
        var newuser={};
        newuser.fname=req.body.Fname;
        newuser.lname=req.body.Lname;
        await user.findOne({ Fname: newuser.fname })
        .then(profile => 
          {
        if (!profile) 
        {
           res.send("User not exist");
        } 
        else
         {
           if (profile.Lname == newuser.lname) 
           {
              res.send("User authenticated");
           } 
           else 
           {
              res.send("User Unauthorized Access");
           }
         }
    })
        .catch(err => {
          console.log("Error is ", err.message);
        });

    }
    else
    {
        //this is for signup
        var mydata=new user(req.body);
        mydata.save().then(()=>
        {
            res.send("item savd to db");
        })
        .catch(err=>{
            res.status(400).send("unable to save to db");
            });
    }*/
    
    var session=require("express-session");
    app.set('trust proxy', 1);
    app.use(session({
      secret: 'keyboard cat',
      resave: true,
      proxy: true,
      saveUninitialized: true,
      cookie: { secure: true }
    }));


    app.get("/sert",function(req,res){
      console.log(req.query);
      res.render("sert");
        });
      
        app.post("/sert",urlencodedParser,function(req,res){
      console.log(req.body);
      res.render("recv");
        });

cont(app);
app.listen(3008);
console.log('connection  made to port 3003');




