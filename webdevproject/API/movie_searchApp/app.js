var express = require("express");
var app = express();
var request = require("request");
app.set("view engine" , "ejs");

app.get("/" , function(req, res){
	console.log(req.query);
	res.render("search");
	console.log(req.query);
});
app.get("/results" , function(req , res){
	console.log(req.query);
	var search = req.query.search;
	var url = "http://www.omdbapi.com/?apikey=thewdb&s=" + search;
	request( url , function(error , response , body){
		if(!error && response.statusCode == 200){
			var parsedData = JSON.parse(body);
			
			res.render( "app" , {data: parsedData});
		}
		 else{
			console.log("error : " + error);
		}
	});
});



app.listen(3000, function(){
	console.log("server has started");
});