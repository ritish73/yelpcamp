var mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema({
	name: String,
	age: Number,
	temperament: String
});

var Cat = mongoose.model("Cat" , catSchema);
// adding a new cat to mongodb


// var george = new Cat({
// 	name: "harry",
// 	age: 6,
// 	temperament: "good"
// });

// george.save(function(err, cat){
// 	if(err){
// 		console.log("something went wrong!" + err);
// 	} else{
// 		console.log("added a new cat to the database!");
// 		console.log(cat);
// 	}
	
// });

// retrieving all cats from the mongodb


Cat.find({} , function(err , cat){
	if(err){
		console.log("error is " + err);
	} else{
		console.log("All the Cats are....");
		console.log(cat);
	}
});


// create function has both features new and save
// Cat.create({
// 	name: "billi",
// 	age: 8,
// 	temperament: "nice"
// } , function(err , cat){
// 	if(err) console.log(err);
// 	else console.log(cat);
// });





