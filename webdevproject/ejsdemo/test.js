var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine" , "ejs");

app.get("/" , function(req, res){
	res.send("<h1>this is the home page</h1>");	
});

// posts array
app.get("/posts" , function(req , res){
	var posts = [
		{title: "3500 GT", author: "maserati"},
		{title: "veron", author: "buggati"},
		{title: "c class", author: "mercedes"}
	];
	res.render("posts" , {posts: posts});
});

app.get("/:name" , function(req , res){
	var Name = req.params.name;
	res.render("rend" , {theName: Name});
});

app.get("/speak/:animal/" , function(req, res){
	var ani = req.params.animal;
	var sounds = {
		pig : "Oink",
		cow : "moo!",
		dog : "woof woof bsdk"
	};
	var sound = sounds[ani];
	res.render("soundsejs" , {theAnimal: ani ,theSound: sound});		
});

app.get("/repeat/:string/:number/" , function(req, res){
	var num = req.params.number;
	var str = req.params.string;
	var ans="";
	for(var i=0;i<num;i++){
		ans = ans + str + " ";
	}		
	res.send(ans);
});

app.get("*" , function(req, res){
	res.send("sorry yaar!");		
});

app.listen(3000 , function(){
	console.log("server has started");
});