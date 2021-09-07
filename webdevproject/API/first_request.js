
var request = require("request");
request("https://jsonplaceholder.typicode.com/photos" , function(error , response , body){
	if(error){
		console.log(error);
	} else{
		if(response.statusCode === 200){
			var parsedData = JSON.parse(body);
			parsedData.forEach(function(image){
				console.log(image.url);
			});
			// console.log("name : "  + parsedData.name + " email: " + parsedData.address.city);
		}
	}
});