var express = require('express');
var router = express.Router();
var ctrlHotels = require('../controllers/hotels.controllers.js');

router
	.route('/hotels') 	
	.get(ctrlHotels.hotelsGetAll);

router
	.route('/hotels/:hotelId') //define a dynamic parameter and look for it 	
	.get(ctrlHotels.hotelsGetOne);// get the function htelGetOne from the controller

router
	.route('/hotels/new')
	.post(ctrlHotels.hotellsAddOne);
	module.exports = router;