var mongoose = require("mongoose");

var Post = require("./models/post.js");
var User = require("./models/user.js"); 

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/blog_demo");  



// creating refrenced posts for a user
// Post.create({
// 	title: "refrencing post 3",
// 	content: "just learning how to refrence posts for a particulaar user as one user can have many of them agaiiinnn!!   !!!!!!!"
// },function(err, newpost){
// 	User.findOne({email: "kali23@gmail.com"} , function(err, founduser){
// 		if(err) console.log(err);
// 		else{
// 			founduser.posts.push(newpost);
// 			founduser.save(function(err, data){
// 				if(err) console.log(err);
// 				else{
// 					console.log(data);
// 				}
// 			});
// 		}
// 		});
// 	}
// );

// now finding the user along with it's refrenced posts with full data

User.findOne({name: "kali"}).populate("posts").exec(function(err, user){
	if(err) console.log(err);
	else{
		console.log(user);
	}
});


