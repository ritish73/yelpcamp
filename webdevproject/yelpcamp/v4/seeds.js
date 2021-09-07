var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment")
var data = [
	{
		name: "India", 
		image:"https://www.thoughtco.com/thmb/l6mjGqVnMW8z53UcD86DE16ZG5c=/2576x2576/smart/filters:no_upscale()/sunrise-at-taj-mahal--agra--uttar-pradash--india-583682538-5b91840bc9e77c0050bdc67b.jpg",
		description: "taj mahal made by shah jahan"
	},
	{
		name: "italy", 
		image: "https://www.traveldailymedia.com/assets/2020/01/italy.jpg",
		description: "this is venice"
	},
	{
		name: "italy", 
		image: "https://www.traveldailymedia.com/assets/2020/01/italy.jpg",
		description: "this is venice"
	}
];


function seedDB(){
	// remove data
	Campground.remove({}, function(err){
		if(err) console.log(err);
		else{
		console.log("removed all campgrounds");
			//create few campgrounds
			data.forEach(function(seed){
				Campground.create(seed, function(err, campground){
					if(err) console.log(err);
					else{
						console.log("created new campgrounds");
						// create a comment
						Comment.create(
						{
							text: "this is the comment used as a seed that is iniital dta to work with",
							author: "hermioni"
						}, function(err , comment){
							// associate comment to the campground
							campground.comments.push(comment);
							campground.save();
							console.log("new comment created");
						});
					}
				});
			});
		}
	});
	
}
module.exports = seedDB;
