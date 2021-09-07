var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var User = require("./models/user");
var seedDB = require("./seeds");

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect("mongodb://localhost/yelp_camp_v3");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine" , "ejs");
app.use(express.static(__dirname + "/public")); // provides path for the stylesheet

seedDB();
// passport configration

app.use(require("express-session")({
	secret: "Dannu is cutest",
	resave: false,
	saveUninitialized: false 
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//it is important that we add this app.use() at the end
// it is important that we add this ejs templates instead of passing req.user as an object everytime we render a template , we use :
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});


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
			res.render("campgrounds/index" , {campGrounds: allcampgrounds});
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
	res.render("campgrounds/new");
});

//SHOW
app.get("/campgrounds/:id" , function(req , res){
	//capture the id of campgrounds
	
	Campground.findById(req.params.id).populate("comments").exec(function(err , foundCampground){
		
		if(err) console.log(err);
		else
			 res.render("campgrounds/show",{campground: foundCampground});
		
		// res.render("show" , {campground: foundCampground});
		
	});
	
});


// ******************
// comments routes
// ******************

app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){
	// find the campground in which u want to add comment
	Campground.findById(req.params.id, function(err, campground){
		if(err) console.log(err);
		else
			res.render("comments/new" ,{campground: campground});
	});
});

app.post("/campGrounds/:id/comments", isLoggedIn, function(req, res){
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

//**************************
//Authentication Routes
//**************************


//show signup form
app.get("/register", (req,res)=>{
	res.render("register");
});

//handling user signup
app.post("/register",(req,res)=>{
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
app.get("/login", (req, res)=>{
	res.render("login");
});

//login post routes.................middleware
app.post("/login", passport.authenticate("local" , {
	successRedirect: "/campgrounds",
	failureRedirect: "/login"
}), (req, res)=>{
});

// logout

app.get("/logout" ,(req,res)=>{
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



app.listen(3000, function(){
	console.log("yelpcamp has started");
});
