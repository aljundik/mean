var express = require('express');
var router = express.Router();
var ctrlHotels = require('../controllers/hotels.controllers.js');
var ctrlReviews = require('../controllers/reviews.controllers.js');

router
	.route('/hotels') 	
	.get(ctrlHotels.hotelsGetAll)
	.post(ctrlHotels.hotellsAddOne);

router
	.route('/hotels/:hotelId') //define a dynamic parameter and look for it 	
	.get(ctrlHotels.hotelsGetOne)// get the function htelGetOne from the controller
	.put(ctrlHotels.hotelsUpdateOne)
	.delete(ctrlHotels.hotelsDeleteOne);	

//reviews routes
router
	.route('/hotels/:hotelId/reviews') 	
	.get(ctrlReviews.reviewsGetAll)
	.post(ctrlReviews.reviewsAddOne);

router
	.route('/hotels/:hotelId/reviews/:reviewId') //define a dynamic parameter and look for it 	
	.get(ctrlReviews.reviewsGetOne)// get the function htelGetOne from the controller
	.put(ctrlReviews.reviewsUpdateOne)
	.delete(ctrlReviews.reviewsDeleteOne);	


module.exports = router;