var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");
// ******************
// comments routes
// ******************

router.get("/new", middleware.isLoggedIn, function(req, res){
	// find the campground in which u want to add comment
	Campground.findById(req.params.id, function(err, campground){
		if(err) console.log(err);
		else
			res.render("comments/new" ,{campground: campground});
	});
});

router.post("/", middleware.isLoggedIn, function(req, res){
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
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					campground.comments.push(comment);
					// save the comment to the campground in the database
					campground.save();
					//redirect to the show page
					req.flash("success", "successfully added commnt");
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	});
});

//comment edit route
router.get("/:comment_id/edit" ,middleware.checkCommentOwnership, (req, res)=>{
	Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err) {
			req.flash("error", "something went wrong");
			console.log(err);
		}
		else {
			res.render("comments/edit" , {campground_id: req.params.id, comment: foundComment});
		}
	})
});

//comment update route
router.put("/:comment_id",middleware.checkCommentOwnership, (req, res)=>{
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updtaedComment){
		if(err) {
			res.redirect("back");
		}else{
			res.redirect("/campgrounds/" + req.params.id);
		}
	}); 
});

// delete comment route
router.delete("/:comment_id",middleware.checkCommentOwnership, (req, res)=>{
	Comment.findByIdAndRemove(req.params.comment_id, (err)=>{
		if(err) res.redirect("back");
		else{
			req.flash("success", "comment deleted");
			res.redirect("/campgrounds/" + req.params.id);
		}
	})
});


// //middleware function for secret route to check if user is logged in or not
// function isLoggedIn(req, res, next){
// 	if(req.isAuthenticated()){
// 		return next();
// 		// here next refers to callback func in line 38
// 	}
// 	res.redirect("/login");
// }

// function checkCommentOwnership(req, res, next){
// 	//autentication and autorization
// 	// check if user is logged in                                    => autentication
// 	if(req.isAuthenticated()){
// 		Comment.findById(req.params.comment_id, function(err, foundComment){
// 			if(err) {
// 				res.redirect("back");
// 			} else {
// 				 // if yes then check if current user owns the comment        => autorization
// 				if(foundComment.author.id.equals(req.user._id)){
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