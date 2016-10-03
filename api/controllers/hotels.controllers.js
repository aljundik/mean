var dbconn = require ('../data/dbconnection.js');
var ObjectId = require('mongodb').ObjectId;
var hotelData = require('../data/hotel-data.json');



module.exports.hotelsGetAll = function(req,res){
	
	var db = dbconn.get();
	var collection = db.collection('hotels');

	var offset = 0;
	var count =5; 

	if (req.query && req.query.offset){// check if query(URL) exist, and then check if it does hold the value offset
		offset= parseInt (req.query.offset,10);//since the request url is string, we need to change it to number by using parse int and 10 is to represent the numerical system used, in this case it is a decimal value
	}
	if (req.query && req.query.count){// check if query(URL) exist, and then check if it does hold the value count
		count= parseInt (req.query.count,10);//since the request url is string, we need to change it to number by using parse int
	}

	collection

	.find()
	.skip(offset)
	.limit(count)
	.toArray(function(err,docs){

		console.log("Found hotels", docs);
		res
		.status(200)
		.json(docs);
	});

};

module.exports.hotelsGetOne = function(req,res){
	var db = dbconn.get();
	var collection = db.collection('hotels');

		var hotelId = req.params.hotelId;// req parameters handles the url partamters 
		collection
		.findOne({
			_id : ObjectId(hotelId)
		},function(err,doc){

			res
			.status(200)
			.json(doc);
		});
		console.log("get hotelID", hotelId);
		
	};

	module.exports.hotellsAddOne = function(req,res){
		var db = dbconn.get();
		var collection = db.collection('hotels');
		var newHotel;

		console.log("post new hotel");

		if(req.body && req.body.name && req.body.stars){
			newHotel = req.body;
			newHotel.stars = parseInt(req.body.stars,10);
			console.log(newHotel);// will put all the data coming from the posted form to the log using the middlewar tools we defined in app.js


			collection.insertOne(newHotel,function(err,response){

				console.log(response.ops);
				res
					.status(201)
					.json(response.ops); 

			});

			

		}
		else {
			console.log("Data missing from body");
			res
			.status(400)
			.json({message : "Required data missing from body"});
		}


		
	};






