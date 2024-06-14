
const express = require('express');
const router = express.Router();
const restApiController = require("../controller/rest.controller")




// Simulate a REST API with varied response times
router.get('/slow', restApiController.restAPISlow);

router.get("/fast", restApiController.restAPIFast)





module.exports = router;