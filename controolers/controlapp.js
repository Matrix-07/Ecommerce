
var user=require("/mynewapp/model/user.js");
var addprodmain=require("/mynewapp/model/addprodmain.js");
var bodyparser = require("body-parser");

var urlencodedParser = bodyparser.urlencoded({ extended: true });
var x=function(app)
{

  app.post("/orders",urlencodedParser,function(req,res){
res.render("orders",{data:req.body});
  });

  app.get("/recievedsamp",function(req,res){
console.log(req.query);
res.render("recievedsamp",{data:req.query})
  });
  
  app.get("/ShopByCategory",function(req,res){

    addprodmain.find({category:"men"},function(err,data1){
      var mydata1=data1;
      console.log(mydata1);
    
    addprodmain.find({category:"kids"},function(err,data2){
      var mydata2=data2;
      console.log(mydata2);
   
    addprodmain.find({category:"wome"},function(err,data3){
      var mydata3=data3;
      console.log(mydata3);
      res.render("ShopByCategory",{"data_men":mydata1,"data_kids":mydata2,"data_wome":mydata3});
    });
  });
});
    
   
   })  
  app.get("/addprodmain",function(req,res){
res.render("addprodmain");
  });
  app.post("/addprodmain",urlencodedParser,function(req,res){

var mydata=new addprodmain(req.body);

console.log(req.body);
mydata.save().then(()=>
{
    res.send("item savd to db");
})
.catch(err=>{
    res.status(400).send("unable to save to db");
    });
    res.render("getimg",{s:req.body});
  });


  app.get("/retimg",function(req,res){
    res.render("retimg");
  });

  app.post("/retimg",urlencodedParser,function(req,res){
    console.log(req.body);
    res.render("getimg",{data:req.body});
  });

  /*app.post("/sert",urlencodedParser,function(req,res){
    console.log(req.body);
  });*/
app.post("/search",urlencodedParser,function(req,res){
  res.render("search",{data:req.body});
});
    app.get("/main1",function(req,res){
      addprodmain.find({},function(err,data){
        console.log(data);
        var k={ clickHandler:"adding1();" }
       
        res.render("main",{test:data});
      });

    });
app.get("/logger",function(req,res){
    
    res.render("logger");
});
app.post("/logger",urlencodedParser,function(req,res){
var data=req.body;
console.log(data);
if(data.submittype=="login"){
res.send("login success");
}
else{
res.render("sert");
}
});

app.post("/profile",urlencodedParser,function(req,res){
res.render("profile",{data:req.body})
});

  
 /* app.get("/sert",urlencodedParser,function(req,res){
    
    console.log(req.query);
    
    res.render("sert",{data:req.query});
    });*/

    
  app.get("/deleteall",function(req,res){
addprodmain.deleteMany({}).then(f=>{
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
      
      
     
      
      app.get("/delete",function(req,res){
     
        user.deleteMany({Fname:null},function(err,data){
          console.log(data);
        });
          
          res.send("valu");
      
      });

      /*app.post("/signup",urlencodedParser,async(req,res)=>{
          
        var mydata=new user(req.body);
        mydata.save().then(()=>{
            res.send("item savd to db");
        })
        .catch(err=>{
            res.status(400).send("unable to save to db");
            });

      });*/
//login
   app.get("/temporders",function(req,res){
addprodmain.find({imgpath:req.query.imgpath,price:req.query.value},function(err,data){
  console.log(data);
  res.render("temporders",{test:data});
});
console.log(req.query);

   });
};




module.exports=x;

