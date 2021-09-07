var express = require("express");
var app = express();

app.get("/" , function(req, res){
	res.send("hi there, welcome to my assignment!");		
});

app.get("/speak/:animal/" , function(req, res){
	var ani = req.params.animal;
	var sounds = {
		pig : "Oink",
		cow : "moo!",
		dog : "woof woof bsdk"
	};
	var sound = sounds[ani];
	res.send("The " + ani + " says " + sound);		
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