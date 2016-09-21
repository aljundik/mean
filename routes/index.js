var express = require('express');
var router = express.Router();


router
	.route('/json')
	.get(function(req,res){

		console.log("we are in the json page GET");
		res
		.status(200)
		.json({"json" : true});

	})
	.post(function(req,res){

		console.log("we are in the json page post");
		res
		.status(200)
		.json({"json" : "post working in a great way"});

	});

	module.exports = router;