var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
	name: {
		type : String,
		required: true
	},
	rating: {
		type : Number,
		min : 0,
		maz : 5,
		required: true
	},
	review: {
		type : String,
		required: true
	},
	createdOn: {
		type : Date,
		"default" : Date.now
	}
});

var roomsSchema = new mongoose.Schema({
	type : String,
	number: Number,
	description : String,
	photos : [String],
	price: Number
});


var hotelSchema = new mongoose.Schema({
	name: {
		type : String,
		required: true
	},
	stars: {
		type: Number,
		min : 0,
		max : 5,
		"default" : 0 // some js engines don't expet that word
	},
	services: [String], // array of strings
	description: String,
	photos : [String],
	currency: String,
	reviews : [reviewSchema], // notice that we refrenced the reviewsschema
	rooms : [roomsSchema],
	location : {
		address: String,
		coordinates : {
			type: [Number],
			index : '2dsphere'// index so we can so search

		} // always tore coodinates long/lat order 
	}
});

mongoose.model('Hotel',hotelSchema); // to compile the schema into model
