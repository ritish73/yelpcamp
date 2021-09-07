var express = require("express");
var router = express.Router();
var Campground = require("../models/campground")
// now replce app.get of app.post with router.get ......

//INDEX
router.get("/playgame" , function(req, res){
	res.render("game");
});

//INDEX
router.get("/" , function(req , res){
	Campground.find({},function(err , allcampgrounds){
		
		if(err) console.log(err);
		else{
			res.render("campgrounds/index" , {campGrounds: allcampgrounds});
		}
	});
	

});

//CREATE
router.post("/", function(req , res){
	var name = req.body.name;
	var img = req.body.image;
	var desc = req.body.description;
	var newcampground = {name: name , image: img , description: desc};
	//create a new campground and save to database
	Campground.create(
	newcampground,
	function(err , campground){
		if(err) console.log(err);
		else res.redirect("/campgrounds");
	}); 
	
});

//NEW
router.get("/new" , function(req , res){
	res.render("campgrounds/new");
});

//SHOW
router.get("/:id" , function(req , res){
	//capture the id of campgrounds
	
	Campground.findById(req.params.id).populate("comments").exec(function(err , foundCampground){
		
		if(err) console.log(err);
		else
			 res.render("campgrounds/show",{campground: foundCampground});
		
		// res.render("show" , {campground: foundCampground});
		
	});
	
});

module.exports = router;