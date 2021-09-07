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

var commentRoutes = require("./routes/comments.js");
var campgroundRoutes = require("./routes/campgrounds.js");
var indexRoutes = require("./routes/index.js")

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

app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes); // all routes in campgrounds file start with /campground so we tell it here and don't need to write /campgrounds in frount of every route it automatically appends it in front of all the routes in campground routes file
app.use(indexRoutes);

app.listen(3000, function(){
	console.log("yelpcamp has started");
});
