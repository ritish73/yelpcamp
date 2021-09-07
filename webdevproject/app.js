var express = require('express');
var app = express();

app.get("/" , function(req , res){
	res.send("hello g kidan paji");
});

app.get("/bye", function(req , res){
	res.send("bye bye!");
});

app.get("/r/:subredditName/comments/:id/:title/" , function(req , res){
	var name = req.params.subredditName;
	var ID = req.params.id;
	var tit = req.params.title;
	res.send("welcome to "  + name + "with id = " + ID +  "and title = " + tit);
});
app.get("*", function(req, res){
	res.send("this is a star mothafaka");
});

app.listen(3000, function(){
	console.log("server has started !!!");
});