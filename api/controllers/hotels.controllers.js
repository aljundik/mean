// var dbconn = require ('../data/dbconnection.js');
// var ObjectId = require('mongodb').ObjectId;
// var hotelData = require('../data/hotel-data.json');
var mongoose = require ('mongoose');
var Hotel = mongoose.model('Hotel');


var runGeoQuery = function(req,res){

	var lng = parseFloat(req.query.lng);
	var lat = parseFloat(req.query.lat);
	// a geojson point object
	var point = {
		type: "Point",
		coordinates:[lng, lat]
	};
	var geoOptions= {
		spherical: true,
		maxDistance: 2000,// the max distance limit allowed to search
		num : 5 //variable that define the max number of records to get 
	};
	// pass the points with its options to the geoNear methods, and call back function 
	Hotel
	.geoNear(point,geoOptions, function (err, results,stats){
		console.log('GEO results: ', results);
		console.log('Geo stats: ', stats);
		res
		.status(200)
		.json(results);

	});
};

module.exports.hotelsGetAll = function(req,res){
	
	// var db = dbconn.get();
	// var collection = db.collection('hotels');

	var offset = 0;
	var count =5;
	var maxCount= 10;

	if(req.query && req.query.lat && req.query.lng) { // checking if the parameters of lat and lng have been passed
		// in the url

		runGeoQuery(req,res);
		return;
	} 

	if (req.query && req.query.offset){// check if query(URL) exist, and then check if it does hold the value offset
		offset= parseInt (req.query.offset,10);//since the request url is string, we need to change it to number by using parse int and 10 is to represent the numerical system used, in this case it is a decimal value
	}
	if (req.query && req.query.count){// check if query(URL) exist, and then check if it does hold the value count
		count= parseInt (req.query.count,10);//since the request url is string, we need to change it to number by using parse int
	}
		if (isNaN(offset) || isNaN(count)){// check if passed parameters are numbers
			res
			.status(400)
			.json({
				"message" : "if supplied in query string count and offset be number"
			});
			return;
		}
		if (count > maxCount){
			res
			.status(400)
			.json({
				"message" : "Count limit of " + maxCount + " exceeded"
			});
			return;
		}
		Hotel
		.find()
		.skip(offset)
		.limit(count)
		.exec(function(err,hotels){ 

			if(err) {
				console.log("Error finding hotels");
				res
				.status(500)
				.json(err);
			} else{
				console.log("found hotels", hotels.length);
				res
				.json(hotels);
			}
		});
	// collection

	// .find()
	// .skip(offset)
	// .limit(count)
	// .toArray(function(err,docs){

	// 	console.log("Found hotels", docs);
	// 	res
	// 	.status(200)
	// 	.json(docs);
	// });
};

module.exports.hotelsGetOne = function(req,res){
	// var db = dbconn.get();
	// var collection = db.collection('hotels');
	var hotelId = req.params.hotelId;// req parameters handles the url partamters 


	Hotel
	.findById(hotelId)
	.exec (function(err,doc){
		var response = {
			status : 200,
			message : doc
		};
		if(err) {
			console.log("Error finding hotels");
			response.status = 500;
			response.message = err;
		} else if (!doc){
			response.status = 404;
				response.message = {
					"message" : "Hotel ID not found"
				};
		}
		res
		.status(response.status)
		.json(response.message);
		
	});
	console.log("get hotelID", hotelId);	
};

var _splitArray = function (input) {
	var output;
	if (input && input.length >0){
		output = input.split(";");
	} else {
		output = [];
	}
	return output;
};

module.exports.hotellsAddOne = function(req,res){
	// getting the info from post method and create new in mongose
	Hotel
		.create({
			name: req.body.name,
			description: req.body.description,
			stars: parseInt(req.body.stars,10),
			services: _splitArray(req.body.services),// empty array 
			photos: _splitArray(req.body.photos),
			currency : req.body.currency,
			location : {
				address : req.body.address,
				coodrinates : [parseFloat(req.body.lng), parseFloat(req.body.lat)]
			}

		},function(err, hotel){

			if(err){
				console.log("Error Creating hotel");
				res
					.status(400)
					.json(err);
			} else {
				console.log("Hotel Created", hotel);
				res
					.status(201)
					.json(hotel);
			}
		});



	// var db = dbconn.get();
	// var collection = db.collection('hotels');
	// var newHotel;

	// console.log("post new hotel");

	// if(req.body && req.body.name && req.body.stars){
	// 	newHotel = req.body;
	// 	newHotel.stars = parseInt(req.body.stars,10);
	// 	console.log(newHotel);// will put all the data coming from the posted form to the log using the middlewar tools we defined in app.js

	// 	collection.insertOne(newHotel,function(err,response){

	// 		console.log(response.ops);

	// 		res
	// 		.status(201)
	// 		.json(response.ops); 

	// 	});
	// }
	// else {
	// 	console.log("Data missing from body");
	// 	res
	// 	.status(400)
	// 	.json({message : "Required data missing from body"});
	// }
};

module.exports.hotelsUpdateOne = function(req,res){
	
	var hotelId = req.params.hotelId;// req parameters handles the url partamters 
	Hotel
	.findById(hotelId)
	.select("-reviews -rooms") // to exclude reviews and rooms property in db
	.exec (function(err,doc){
		var response = {
			status : 200,
			message : doc
		};
		if(err) {
			console.log("Error finding hotels");
			response.status = 500;
			response.message = err;
		} else if (!doc){
			response.status = 404;
				response.message = {
					"message" : "Hotel ID not found"
				};
		} 
		if (response.status !==200){
			res
				.status(response.status)
				.json(response.message);
			}else {
				doc.name = req.body.name;
				doc.description = req.body.description;
				doc.stars = parseInt(req.body.stars,10);
				doc.services =_splitArray(req.body.services);
				doc.photos = _splitArray(req.body.photos);
				doc.currency = req.body.currency;
				doc.location = {
					address : req.body.address,
					coodrinates : [
						parseFloat(req.body.lng),
						parseFloat(req.body.lat)
					]
				};
				doc.save(function(err,hotelsUpdated){
					if (err) {
						res
							.status(500)
							.json(err);
					}else{
						res
							.status(204)
							.json();
					}
				});
			}
		
	});	
};

module.exports.hotelsDeleteOne = function(req,res){
	var hotelId = req.params.hotelId;

	Hotel
		.findByIdAndRemove(hotelId)
		.exec(function(err,hotel){

			if (err) {
				res
					.status(404)
					.json(err);
			} else{
				console.log("Hotel deleted , id: " , hotelId);
				res
					.status(204)
					.json();
			}

		});


};





