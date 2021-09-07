var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
// ******************
// comments routes
// ******************

router.get("/new", isLoggedIn, function(req, res){
	// find the campground in which u want to add comment
	Campground.findById(req.params.id, function(err, campground){
		if(err) console.log(err);
		else
			res.render("comments/new" ,{campground: campground});
	});
});

router.post("/", isLoggedIn, function(req, res){
	// find the campground in which u want to add comment
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			 console.log(err);
			res.redirect("/campgrounds");
		}
		else{
			// grab the comment from the object "comment" submitted in the form and create it
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					console.log(err);
				}
				else{
					campground.comments.push(comment);
					// save the comment to the campground in the database
					campground.save();
					//redirect to the show page
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	});
});

//middleware function for secret route to check if user is logged in or not
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
		// here next refers to callback func in line 38
	}
	res.redirect("/login");
}


module.exports = router;