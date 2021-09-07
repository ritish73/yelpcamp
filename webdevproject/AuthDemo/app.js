var express = require("express");
var passport = require("passport");
var bodyParser = require("body-parser");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var mongoose = require("mongoose");
var User = require("./models/user.js");

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/auth_demo_app");
var app = express();
app.use(require("express-session")({
	secret: "dannu is cutest",
	resave: false,
	saveUninitialized: false 
}));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// **********************
//Routes
//***********************


app.get("/",function(req,res){
	res.render("home");
});

app.get("/secret", isLoggedIn ,function(req, res){
	res.render("secret");
});

// register routes

//show signup form
app.get("/register", (req,res)=>{
	res.render("register");
});

//handling user signup
app.post("/register",(req,res)=>{
	User.register(new User({username: req.body.username}), req.body.password, function(err, user){
		if(err) {
			console.log(err);
			res.redirect("/register");
		} else{
			User.authenticate("local")(req,res,function(){
				res.redirect("/secret");
			});
		}
	});
});

// login routes
app.get("/login", (req, res)=>{
	res.render("login");
});

//login post routes.................middleware
app.post("/login", passport.authenticate("local" , {
	successRedirect: "/secret",
	failureRedirect: "/login"
}), (req, res)=>{
});

// logout

app.get("/logout" ,(req,res)=>{
	req.logout();
	res.redirect("/");
});

//middleware function for secret route to check if user is logged in or not
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
		// here next refers to callback func in line 38
	}
	res.redirect("/login");
}


app.listen(3000, function(){
	console.log("server has started");
});