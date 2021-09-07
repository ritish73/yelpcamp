var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var expressSanitizer = require("express-sanitizer");
var mongoose = require("mongoose");
var methodOverride = require("method-override");

var ObjectId = require('mongodb').ObjectID;

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/restfulBlogApp");   // this will create a new databse in mongoose with name = restfullBlogApp
// APP CONFIG
app.set("view engine" , "ejs");
app.use(express.static("public"));  // it is used to show the path(to app.js) of css files inside public directory
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer());

// MONGOOSE CONFIG
// now create the schema of your collection and model it into an object which can be used to call functions like modelledObject.func();
//schemaa 
var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body:  String,
	created: {type: Date, default: Date.now}
});
// modelling schema to an object = restfulBlog
var Blog = mongoose.model("Blog" , blogSchema);

//RESTFUL ROUTES

app.get("/",function(req,res){
	res.redirect("/blogs");
});

//INDEX ROUTE
app.get("/blogs",function(req,res){
	Blog.find({} , function(err , blogs){
		if(err) console.log(err);
		else{
			res.render("index" ,{blogs: blogs});
		} 	
	});
	
});

//NEW ROUTE
app.get("/blogs/new", function(req,res){
	res.render("new");
});

//CREATE ROUTE
app.post("/blogs" , function(req , res){
	// CREATE BLOG
	console.log(req.body);
	req.body.blog.body = req.sanitize(req.body.blog.body);
	console.log("after sanitization");
	console.log(req.body);
	Blog.create(req.body.blog, function(error , newBlog){
		if (error) res.render("new");
		else{
			// REDIRECT TO THE INDEX
			res.redirect("/blogs");
		}
	});
	
});

//SHOW PAGE
app.get("/blogs/:id", function(req,res){
	Blog.findById(req.params.id , function(err , foundBlog){
		if(err){
			res.redirect("/blogs");
		}
		else{
			res.render("show" , {blog: foundBlog});
		}
	});
});

// EDIT ROUTE
app.get("/blogs/:id/edit", function(req,res){
	Blog.findById(req.params.id , function(err, blog){
		if(err){
			res.redirect("/blogs");
		}
		else{
			res.render("edit" , {blog: blog});
		}
	});
});

//UPDATE ROUTE
app.put("/blogs/:id", function(req,res){
	req.body.blog.body = req.sanitize(req.body.blog.body);
	var ID = {_id: req.params.id};
	Blog.updateOne(ID, req.body.blog, function(err , updatedBlog){
		if(err){
	
			console.log(err);
			res.redirect("/blogs");
		} else{
			res.redirect("/blogs/"+req.params.id);
		}
	});
});

// DELETE ROUTE

app.delete("/blogs/:id" , function(req, res){
	Blog.findByIdAndRemove(req.params.id, function(err){
		if(err) res.redirect("/blogs");
		else res.redirect("/blogs");
	});
});


app.listen(3000,function(){
	console.log("server has started");
});



