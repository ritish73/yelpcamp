var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var seedDB = require("./seeds");

seedDB();
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/yelp_camp_v3");

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine" , "ejs");




// Campground.create({name: "India", 
// 				   image:"https://www.thoughtco.com/thmb/l6mjGqVnMW8z53UcD86DE16ZG5c=/2576x2576/smart/filters:no_upscale()/sunrise-at-taj-mahal--agra--uttar-pradash--india-583682538-5b91840bc9e77c0050bdc67b.jpg",
// 				   description: "taj mahal made by shah jahan "},function(err,camp){
// 	if(err) console.log(err); 
// 	else console.log(camp);
// });

// var campGrounds = [
		 // {name: "india" image: "https://www.thoughtco.com/thmb/l6mjGqVnMW8z53UcD86DE16ZG5c=/2576x2576/smart/filters:no_upscale()/sunrise-at-taj-mahal--agra--uttar-pradash--india-583682538-5b91840bc9e77c0050bdc67b.jpg"}
// 		{name: "italy", image: "https://www.traveldailymedia.com/assets/2020/01/italy.jpg" },
// 		{name: "austria" , image: "https://images.unsplash.com/photo-1520503922584-590e8f7a90d7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"},
// 		{name: "germany" ,image: "https://www.studying-in-germany.org/wp-content/uploads/2018/07/German-Culture-and-Traditions-696x464.jpg"},
// 		{name: "france", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"},
// 		{name: "singapore", image: "https://hacked.com/wp-content/uploads/2018/03/singapore.jpg"}
// 	];

app.get("/" , function(req , res){
	res.render("landing");
});

//INDEX
app.get("/playgame" , function(req, res){
	res.render("game");
});

//INDEX
app.get("/campGrounds" , function(req , res){
	Campground.find({},function(err , allcampgrounds){
		if(err) console.log(err);
		else{
			res.render("index" , {campGrounds: allcampgrounds});
		}
	});
	

});

//CREATE
app.post("/campGrounds", function(req , res){
	var name = req.body.name;
	var img = req.body.image;
	var desc = req.body.description;
	var newcampground = {name: name , image: img , description: desc};
	//create a new campground and save to database
	Campground.create(
	newcampground,
	function(err , campground){
		if(err) console.log(err);
		else res.redirect("/campGrounds");
	});
	
});

//NEW
app.get("/campGrounds/new" , function(req , res){
	res.render("new");
});

//SHOW
app.get("/campgrounds/:id" , function(req , res){
	//capture the id of campgrounds
	
	Campground.findById(req.params.id).populate("comments").exec(function(err , foundCampground){
		
		if(err) console.log(err);
		else
			 res.render("show",{campground: foundCampground});
		
		// res.render("show" , {campground: foundCampground});
		
	});
	
});

app.listen(3000, function(){
	console.log("yelpcamp has started");
});
