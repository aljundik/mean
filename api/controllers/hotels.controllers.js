module.exports.hotelsGetAll = function(req,res){
	console.log("we are in the hotels page page GET");
	res
		.status(200)
		.json({"json" : true});

};