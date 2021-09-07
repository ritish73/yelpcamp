var express = require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");

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
			console.log(err);
			res.redirect("/register");
		} else{
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
	res.redirect("/campgrounds");
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
