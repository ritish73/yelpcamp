var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine" , "ejs");

var campGrounds = [
		{name: "switzerland", image: "https://www.travelanddestinations.com/wp-content/uploads/2019/03/Switzerland-landscape-px.jpg"}, 
		{name: "italy", image: "https://www.traveldailymedia.com/assets/2020/01/italy.jpg" },
		{name: "austria" , image: "https://images.unsplash.com/photo-1520503922584-590e8f7a90d7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"},
		{name: "germany" ,image: "https://www.studying-in-germany.org/wp-content/uploads/2018/07/German-Culture-and-Traditions-696x464.jpg"},
		{name: "france", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"},
		{name: "singapore", image: "https://hacked.com/wp-content/uploads/2018/03/singapore.jpg"}
	];

app.get("/" , function(req , res){
	res.render("landing");
});

app.get("/playgame" , function(req, res){
	res.render("game");
});

app.get("/campGrounds" , function(req , res){
	console.log(campGrounds);
	
	res.render("campgrounds" , {campGrounds: campGrounds});
});

app.post("/campGrounds", function(req , res){
	var name = req.body.name;
	var img = req.body.image;
	var newcampground = {name: name , image: img};
	campGrounds.push(newcampground);
	res.redirect("/campGrounds");
});

app.get("/campGrounds/new" , function(req , res){
	res.render("new");
});

app.listen(3000, function(){
	console.log("yelpcamp has started");
});
