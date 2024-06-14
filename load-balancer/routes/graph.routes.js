
const express = require('express');
const router = express.Router();


// require controllers
const graphApiController = require("../controller/graphQl.controller")


// Simulate a GraphQL API
router.post('/slow', graphApiController.graphAPISlow);
router.post('/fast', graphApiController.graphAPIFast);



module.exports = router;