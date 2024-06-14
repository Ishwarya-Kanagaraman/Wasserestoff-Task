
const express = require('express');
const router = express.Router();
// require routes
const restApiRoutes = require("./rest.routes");
const graphApiRoutes = require("./graph.routes");

// require controllers

const grpcController = require("../controller/grpc.controller")

router.get("/", (req, res) => {
    res.send("Welcome to app");
    setTimeout(() => res.send('Fast REST response'), 100);
})

// Simulate a REST API with varied response times
router.use('/rest', restApiRoutes);

// Simulate a GraphQL API
router.use('/graphQl', graphApiRoutes);

// Simulate a gRPC API
router.get('/grpc',grpcController.grpcFast);

module.exports = router;