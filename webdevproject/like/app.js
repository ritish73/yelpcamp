var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/yelp_camp_v3");

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine" , "ejs");

var postSchema = new mongoose.Schema({
  title: String,
  likes: {type:Number,default:0}                    
});
var Post = mongoose.model("Post",postSchema);


app.get("/like" , function(req , res){
	res.render("like");
});

app.post("/liked" , function(req , res){
	res.redirect('/like');
	
});


app.listen(3000, function(){
	console.log("yelpcamp has started");
});



