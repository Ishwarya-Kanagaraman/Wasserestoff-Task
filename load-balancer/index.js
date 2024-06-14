// loadBalancer.js
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 4000;
const router = require("./routes");
const { RouteBalance } = require('./loadBalancer');
const bodyParser = require('body-parser');
const { Queue, PriorityQueue, RoundRobinQueue } = require('./loadBalancer/queues');
const { apiServers, processQueue } = require('./helpers/helper');

// Queues
const fifoQueue = new Queue();
const priorityQueue = new PriorityQueue();
const roundRobinQueue = new RoundRobinQueue(Object.values(apiServers).flat());


// Middleware for logging
app.use((req, res, next) => {
    req.startTime = Date.now();
    next();
});

// to parse the JSON requests
app.use(bodyParser.json());
app.use("/api", router);


// Main load balancer route
app.all('/:type', async (req, res) => {
    await RouteBalance(req);
});



// Start processing queues
processQueue(fifoQueue, 'FIFO');
processQueue(priorityQueue, 'Priority');
processQueue(roundRobinQueue, 'RoundRobin');

app.listen(PORT, () => console.log(`Load balancer running on port ${PORT}`));
