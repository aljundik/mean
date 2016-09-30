	require('./api/data/dbconnection.js').open();
	var express = require('express'); // import express
	var app = express();// assigh express to the variable
	var path = require('path');// import path module (to deal with files)
	var bodyParser = require('body-parser');

	var routes = require('./api/routes')
	app.set('port',3000); // set up the port to be 3000

	app.use(function(req,res,next){ // again we are using anonymos function

		console.log(req.method,req.url);// console some infromation just to see the cabiblites of middleware

		next();// middleware handle functions needed to be run between request and respond
	});

		//test
	
	app.use(express.static(path.join(__dirname, 'public')));//define a static path for the routes
	app.use(bodyParser.urlencoded({extended : false }));// only string and json,, this is a middleware to deal with requests paramaeters
	app.use('/api',routes);


	var server = app.listen(app.get('port'),function(){
		var port = server.address().port;// defin a variable port and assign the current addres to it
		console.log("the port is " + port);
	});// set the app to listen to the retrieved port and run the statment after conferming that it is runnin (call back function)
