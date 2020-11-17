const express 				= require('express');
const bodyParser 			= require('body-parser');
const router  				= express.Router();
const taskController = require('../controller/taskController')


router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

router.use(function(error, req,res, next) {
	if(error) {
		res.send('invalid json');
	}
})



router.get('/document', taskController.fetchDocument);




module.exports = router;