var hotelData = require('../data/hotel-data.json');
module.exports.hotelsGetAll = function(req,res){
	console.log("we are in the hotels page GET");


	var offset = 0;
	var count =5; 

	if (req.query && req.query.offset){// check if query(URL) exist, and then check if it does hold the value offset
		offset= parseInt (req.query.offset,10);//since the request url is string, we need to change it to number by using parse int and 10 is to represent the numerical system used, in this case it is a decimal value
	}
	if (req.query && req.query.count){// check if query(URL) exist, and then check if it does hold the value count
		count= parseInt (req.query.count,10);//since the request url is string, we need to change it to number by using parse int
	}

	var returnData = hotelData.slice(offset,offset+count);

	res
		.status(200)
		.json(returnData);

};

module.exports.hotelsGetOne = function(req,res){
	var hotelId = req.params.hotelId;// req parameters handles the url partamters 
	var thisHotel = hotelData[hotelId];// get that particular item from the array hotelData(json)
	console.log("get hotelID", hotelId);
	res
		.status(200)
		.json(thisHotel);

};

module.exports.hotellsAddOne = function(req,res){
	console.log("post new hotel");
	console.log(req.body);// will put all the data coming from the posted form to the log using the middlewar tools we defined in app.js

	res
		.status(200)
		.json(req.body);




};






