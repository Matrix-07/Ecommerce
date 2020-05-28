var user = require("/mynewapp/model/user.js");
var addprodmain = require("/mynewapp/model/addprodmain.js");
var bodyparser = require("body-parser");
var session = require("express-session");
var urlencodedParser = bodyparser.urlencoded({ extended: true });

var x = function (app) {
  app.post("/updateProfile",urlencodedParser,function(req,res){
    var data=req.body;
    user.updateOne(
      {"email":req.session.email},data,{upsert:true},function(err,result){
        if(err){
          res.send(err);
        }
        else{
          var path=req.path;
          res.redirect("/profile");
         /* res.render("profile",{path,data});*/
        }

      });
     
 /*user.find.upsert({"email":req.session.email},{$set:
  {
   "Fname":data.Fname,
 "Lname":data.Lname,
 "state":data.state,
 "Country":data.country,
 "mobilenumber":data.mobilenumber,
 "birthdate":data.birthdate,
 "pass":data.pass
}
},{upsery:true})*/
/*
.save()
.then(() => {
  res.send("item updated to db");
})
.catch((err) => {
  res.status(400).send("unable to save to db");
});*/
   
  });
  app.get("/editProfile",urlencodedParser,function(req,res){
console.log(req.session.email);
var path=req.path;
user.find({email:req.session.email},function(err,data1){

  console.log("gstcsts"+data1[0].Fname);
  var data=data1[0];
res.render("profile",{data,path});
  
});

  });
  app.get("/profile",function(req,res){
    if(req.session.email){
/*res.send(req.session.email);*/

user.find({email:req.session.email},function(err,data1){

  console.log("gstcsts"+data1[0].Fname);
  var path=req.path;
res.render("profile",{data:data1[0],path});
  
});}
else{
res.redirect("/");
}


  });
  app.get("/orders",function(req,res){
  
res.render("orders");

    
  })
  app.set("trust proxy", 1);
  app.use(
    session({
      secret: "keyboard cat",
    })
  );
  app.post("/orders", urlencodedParser, function (req, res) {
    res.render("orders", { data: req.body });
  });

  app.get("/recievedsamp", function (req, res) {
    console.log(req.query);
    res.render("recievedsamp", { data: req.query });
  });

  app.get("/ShopByCategory", function (req, res) {
    
    console.log("emailshopby"+req.session.email);
    addprodmain.find({ category: "men" }, function (err, data1) {
      var mydata1 = data1;
    

      addprodmain.find({ category: "kids" }, function (err, data2) {
        var mydata2 = data2;
       

        addprodmain.find({ category: "women" }, function (err, data3) {
          var mydata3 = data3;
          
        addprodmain.find({ category: "electronics" }, function (err, data4) {
          var mydata4 = data4;
          
        addprodmain.find({ category: "mobilelaptop" }, function (err, data5) {
          var mydata5 = data5;

          addprodmain.find({ category: "books" }, function (err, data6) {
            var mydata6 = data6;
            addprodmain.find({ category: "utensils" }, function (err, data7) {
              var mydata7 = data7;
         
          res.render("ShopByCategory", {
            data_men: mydata1,
            data_kids: mydata2,
            data_women: mydata3,
            data_electronics:mydata4,
            data_mobilelaptop:mydata5,
            data_books:mydata6,
            data_utensils:mydata7
          });
        });
      });
        });
          });
        });
      });
    });
  });
  app.get("/addprodmain", function (req, res) {
    res.render("addprodmain");
  });
  app.post("/addprodmain", urlencodedParser, function (req, res) {
    var mydata = new addprodmain(req.body);

    console.log(req.body);
    mydata
      .save()
      .then(() => {
        res.send("item savd to db");
      })
      .catch((err) => {
        res.status(400).send("unable to save to db");
      });
    res.render("getimg", { s: req.body });
  });

  app.get("/retimg", function (req, res) {
    res.render("retimg");
  });

  app.post("/retimg", urlencodedParser, function (req, res) {
    console.log(req.body);
    res.render("getimg", { data: req.body });
  });

  app.post("/search", urlencodedParser, function (req, res) {
    res.render("search", { data: req.body });
  });
  app.get("/main", function (req, res) {
    if (req.session.email) {
      addprodmain.find({ category: "men" }, function (err, data1) {
        var mydata1 = data1;
      
  
        addprodmain.find({ category: "kids" }, function (err, data2) {
          var mydata2 = data2;
         
  
          addprodmain.find({ category: "women" }, function (err, data3) {
            var mydata3 = data3;
            
          addprodmain.find({ category: "electronics" }, function (err, data4) {
            var mydata4 = data4;
        

        res.render("main", {    data_men: mydata1,
          data_kids: mydata2,
          data_women: mydata3,
          data_electronics:mydata4 });
      });
    });
    });
  });
    } 
    else 
    {
      res.redirect("/");
    }
  });

  app.post("/signup", urlencodedParser, function (req, res) {
    req.session.email = req.body.email;
    req.session.password = req.body.password;
    var data = req.body;
    console.log(data);

    var exist = 0;
    user.find({ email: data.email }, function (err, doc) {
      if (doc.length) {
        exist = 1;
      } else {
        exist = 0;
      }

      if (data.submittype == "login") {
        if (exist == 1) {
          user.find({ email: data.email, pass: data.password }, function (
            err,
            doc
          ) {
            if (doc.length) {
              res.redirect("/main");
            } else {
              res.send("wrong password");
            }
          });
        } else {
          res.send("enter valid email");
        }
      } else {
        var path = req.path;

        res.render("signup-form", { path, data });
      }
    });
  });
  app.get("/profile", function (req, res) {
    res.render("profile");
  });

  app.get("/wishlist",function(req,res){
    var data=req.query;
    console.log(data);
    if(data.wishlist){

 res.render("wishlist",{data});
    }
    else{
      req.params.wishlist="1";
      
      res.render("addtocart",{data:req.params.wishlist});
    }
    
    });
    
    app.get("/addtocart",function(req,res){
        res.render("addtocart");
    })
    
  app.post("/insert", urlencodedParser, function (req, res) {
    var mydata = new user(req.body);
    console.log(mydata);
    var exist = 0;
    user.find({ email: mydata.email }, function (err, doc) {
      if (doc.length) {
        exist = 1;
      } else {
        exist = 0;
      }
      if (exist == 0) {
        mydata
          .save()
          .then(() => {
            res.send("inserted");
          })
          .catch((err) => {
            res.status(400).send("cannot be saved");
          });
      } else {
        var path = req.path;
        res.render("signup-form", { path, mydata });
      }
    });

    /*res.render("profile",{data:req.body})*/
  });

  app.get("/deleteall", function (req, res) {
    addprodmain.deleteMany({}).then((f) => {
      res.send("successfully cleared");
    });
  });

  /*
      var db=client.db("mynewdb");
      db.listCollections().toArray(function(err, collInfos) {
        // collInfos is an array of collection info objects that look like:
        // { name: 'test', options: {} }
    });*/
  /*var db=new Db("mynewdb", new Server("localhost",27017));
      db.on(function(err,db){
        assert.equal(null,err);
    var col=db.collection("test1");
  db.collection("test1",{strict:true},function(err,col){
    assert.equal(null,err);
    Db.close();
  
  });
      });*/

  /*app.post("/form",urlencodedParser,function(req,res){
      console.log(req.body);
      //to save data to db,create new instance of model and pass this instance to user input and then save.
      var mydata=new user(req.body);
      mydata.save()
      .then(item=>{
      
      res.send("item savd to db");
      })
      .catch(err=>{
      res.status(400).send("unable to save to db");
      });
      
      });*/

  app.get("/delete", function (req, res) {
    user.deleteMany({ Fname: null }, function (err, data) {
      console.log(data);
    });

    res.send("valu");
  });

  app.get("/temporders", function (req, res) {
    addprodmain.find(
      { imgpath: req.query.imgpath, price: req.query.value },
      function (err, data) {
        addprodmain.find({category:req.query.cat},function(req,data1){
          var test2=data1;
          console.log(data);
          res.render("temporders", { test: data,test2 });
        })
       
      }
    );
    console.log(req.query);
  });
};

module.exports = x;
