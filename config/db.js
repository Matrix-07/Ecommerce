var mongoose=require("mongoose");

var initiatemongo=()=>{
            mongoose.connect("mongodb://localhost:27017/mynewdb",{
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

        var db=mongoose.connection;
        db.on("error",()=>{
        console.log("connection error");
        });
        db.once("open",function(){
        console.log("connected");
        console.log("database name used is:"+db.name);

});
};

module.exports=initiatemongo;

//try console.log(db)..you get full info
/*console.log("database name used is:"+db.name);*/
/*this works fine for getting collections
var collections = mongoose.connections[0].collections;
var names = [];

Object.keys(collections).forEach(function(k) {
    names.push(k);
});
console.log(names);
*/

/*mongoose.connection.on('open', function (ref) {
  console.log('Connected to mongo server.');
  //trying to get collection names
  mongoose.connection.db.listCollections().toArray(function (err, names) {
      console.log(names); // [{ name: 'dbname.myCollection' }]
      module.exports.Collection = names;
  });
})*/

