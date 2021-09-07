var middlewareObj = {};
var Campground = require("../models/campground");
var Comment = require("../models/comment");
middlewareObj.checkCampgroundOwnership = function(req, res, next){
	//autentication and autorization
	// check if user is logged in                                    => autentication
	if(req.isAuthenticated()){
		Campground.findById(req.params.id, function(err, foundCampground){
			if(err) {
				req.flash("error", "Campground not found");
				res.redirect("back");
			} else {
				 // if yes then check if current user owns the campground        => autorization
				if(foundCampground.author.id.equals(req.user._id)){
					next();
				} else {
					req.flash("error", "You don't have permissions to do that");
					res.redirect("back");
				}
				
			}
		});
		// if no the redirect to login page
	} else{
		req.flash("error", "You need to be logged in to do that");
		res.redirect("back"); // brings back user to the previous page where the came from
	}
}


middlewareObj.checkCommentOwnership = function(req, res, next){
	//autentication and autorization
	// check if user is logged in                                    => autentication
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err, foundComment){
			if(err) {
				res.redirect("back");
			} else {
				 // if yes then check if current user owns the comment        => autorization
				if(foundComment.author.id.equals(req.user._id)){
					next();
				} else {
					req.flash("error", "You don't have permissions to do that");
					res.redirect("back");
				}
				
			}
		});
		// if no the redirect to login page
	} else{
		req.flash("error", "You need to be logged in to do that");
		res.redirect("back"); // brings back user to the previous page where the came from
	}
}

middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
		// here next refers to callback func in line 38
	}
	req.flash("error", "You need to be logged in to do that");
	res.redirect("/login");
};


module.exports = middlewareObj;


