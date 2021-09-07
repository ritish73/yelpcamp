var mongoose = require("mongoose");
// USER - name , email
var userSchema = new mongoose.Schema({
	name: String,
	email: String,
	posts: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Post"
		}
	]
});
module.exports =  mongoose.model("User", userSchema);
