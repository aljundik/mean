var MongoClient = require('mongodb').MongoClient;
var dburl = 'mongodb://localhost:27017/hotels';//setup the url to find the db usin the protocols,, somthins simillar to https

var _connection = null;

var open = function(){ // to open connection
	MongoClient.connect(dburl,function(err,db){
		if (err) {
			console.log("DB connection failed");
			return;
		}
		_connection =db;
		console.log("Db Connection open",db);
	});
	//set_connection
};

var get = function(){ // to get the conncection

	return _connection;
};

module.exports = {
	open : open,
	get : get
};
