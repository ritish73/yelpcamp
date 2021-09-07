var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var request = require("request");
// var mongoose = require("mongoose");
// mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);
// mongoose.set('useUnifiedTopology', true);

// mongoose.connect("mongodb://localhost/practiceApi");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine" , "ejs");
app.use(express.static(__dirname + "/public")); // provides path for the stylesheet

app.get("/", (req, res)=>{
	res.send("home page");
});

app.get("/photos", (req, res)=>{
	console.log(req);
	request("https://jsonplaceholder.typicode.com/photos" , function(error , response , body){
		if(error){
			console.log(error);
		} else{
			if(response.statusCode === 200){
				var parsedData = JSON.parse(body);
				res.render("photos", {data: parsedData});
				// parsedData.forEach(function(image){
				// 	console.log(image.url);
				// });
				// console.log("name : "  + parsedData.name + " email: " + parsedData.address.city);
			}
		}
	});
});

app.listen(3000, function(){
	console.log("server has started");
});
