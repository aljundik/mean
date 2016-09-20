var express = require('express'); // import express
var app = express();// assigh express to the variable

app.set('port',3000); // set up the port to be 3000
var server = app.listen(app.get('port'),function(){
	var port = server.address().port;// defin a variable port and assign the current addres to it
	console.log("the port is " + port);
});// set the app to listen to the retrieved port and run the statment after conferming that it is runnin (call back function)
