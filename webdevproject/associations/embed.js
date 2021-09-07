var mongoose = require("mongoose");

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/blog_demo");  

// POST - title ,content
var postSchema = new mongoose.Schema({
	title: String,
	content: String
});
var Post = mongoose.model("Post" , postSchema);

// USER - name , email
var userSchema = new mongoose.Schema({
	name: String,
	email: String,
	posts: [postSchema]
});
var User = mongoose.model("User", userSchema);

User.findOne({name: "peli"} , (err, founduser)=>{
	if(err) console.log(err);
	else {
		founduser.posts.push({
			title: "djvdu",
			content: "buivguwb vudwhiuvhwufo i gsygdi  cygygigwf  igydigiycg w gsuih9c  gibberish"
		});
		founduser.save(function(err, user){
		if(err) console.log(err);
		else console.log(user);
		});
	}
})



// var newUser = new User({
// 	name: "peli",
// 	email: "peeli231@gmail.com"
// });
// newUser.posts.push({
// 	title: "second post",
// 	content: "this is my second  post on this website"
// })
// newUser.save(function(err, user){
// 	if(err) console.log(err);
// 	else console.log(user);
// });


//to check if users collection in database is working
// var newUser = new User({
// 	name: "kali",
// 	email: "kali23@gmail.com"
// });
// newUser.save();

// to check if postModel collection in blog_demo database is working
// var newpost = new Post({
// 	title: "first post",
// 	content: "this is my first post in this website"
// });
// newpost.save(function(err, post){
// 	if(err) console.log(err);
// 	else console.log(post);
// });

