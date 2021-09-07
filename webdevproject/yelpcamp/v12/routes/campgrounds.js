 var express = require("express");
var router = express.Router();
var Campground = require("../models/campground")
// now replce app.get of app.post with router.get ......
var middleware = require("../middleware");

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
router.post("/", middleware.isLoggedIn, function(req , res){
	var name = req.body.name;
	var img = req.body.image;
	var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var newcampground = {name: name , image: img , description: desc, author: author};
	
	//create a new campground and save to database
	Campground.create(
	newcampground,function(err , campground){
		if(err) console.log(err);
		else {
			
			res.redirect("/campgrounds");
		}
	}); 
	
});

//NEW
router.get("/new" , middleware.isLoggedIn, function(req , res){
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


// edit campground route
router.get("/:id/edit", middleware.checkCampgroundOwnership, (req,res)=>{
	Campground.findById(req.params.id, function(err, foundCampground){
		res.render("campgrounds/edit", {campground: foundCampground});
	});
});


// update campground route

router.put("/:id" ,middleware.checkCampgroundOwnership, (req, res)=>{
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, campground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		} else{
			res.redirect("/campgrounds/" + req.params.id);
		}
	})
});


router.delete("/:id",middleware.checkCampgroundOwnership, (req, res)=>{
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err)
			console.log(err);
		else{
			res.redirect("/campgrounds");
		}
	});
});


// //middleware function for secret route to check if user is logged in or not
// function isLoggedIn(req, res, next){
// 	if(req.isAuthenticated()){
// 		return next();
// 		// here next refers to callback func in line 38
// 	}
// 	res.redirect("/login");
// }

// function checkCampgroundOwnership(req, res, next){
// 	//autentication and autorization
// 	// check if user is logged in                                    => autentication
// 	if(req.isAuthenticated()){
// 		Campground.findById(req.params.id, function(err, foundCampground){
// 			if(err) {
// 				res.redirect("back");
// 			} else {
// 				 // if yes then check if current user owns the campground        => autorization
// 				if(foundCampground.author.id.equals(req.user._id)){
// 					next();
// 				} else {
// 					res.redirect("back");
// 				}
				
// 			}
// 		});
// 		// if no the redirect to login page
// 	} else{
// 		res.redirect("back"); // brings back user to the previous page where the came from
// 	}
// }

module.exports = router;