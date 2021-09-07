var express = require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");
var middleware = require("../middleware");
router.get("/" , function(req , res){
	res.render("landing");
});

//************************
//Authentication Routes
//**************************


//show signup form
router.get("/register", (req,res)=>{
	res.render("register");
});

//handling user signup
router.post("/register",(req,res)=>{
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err) {
			req.flash("error", err.message);
			res.redirect("/register");
		} else{
			req.flash("success", "Welcome to yelpcamp  " + user.username);
			User.authenticate("local")(req,res,function(){
				res.redirect("/campgrounds");
			});
		}
	});
});

// login routes
router.get("/login", (req, res)=>{
	res.render("login");
});

//login post routes.................middleware
router.post("/login", passport.authenticate("local" , {
	successRedirect: "/campgrounds",
	failureRedirect: "/login"
}), (req, res)=>{
});

// logout

router.get("/logout" ,(req,res)=>{
	req.logout();
	req.flash("success", "logged you out!");
	res.redirect("/campgrounds");
});


module.exports = router;
