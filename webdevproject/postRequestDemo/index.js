var express = require("express");
var app = express();
app.set("view engine","ejs");
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

var friendlist = ["suhail" , "paras" , "deepak" , "sourav" , "triyan"];
app.get("/" , function(req , res){
	res.render("home");
});

app.get("/friends" , function(req , res){
	
	res.render("friends" , {friend: friendlist});
});

app.post("/addFriend" , function(req , res){
	var newFriend = req.body.newfriend;
	friendlist.push(newFriend);
	res.redirect("/friends");
});

app.listen(3000,function(){
	console.log("server has started!!");
});