const { apiServers, getRandomServer, processQueue } = require("./helpers/helper");
const { PriorityQueue, Queue, RoundRobinQueue } = require("./loadBalancer/queues");


// Queues
const fifoQueue = new Queue();
const priorityQueue = new PriorityQueue();
const roundRobinQueue = new RoundRobinQueue(Object.values(apiServers).flat());

const RouteBalance = async (req) => {
    const { type } = req.params;
    const payload = req.body;

    if (!apiServers[type]) {
        return res.status(400).send('Invalid API type');
    }

    const serverUrl = getRandomServer(apiServers[type], payload);
    if (!serverUrl) {
        return res.status(400).send('Invalid API type or no available servers');
    }

    // Add request to the appropriate queue
    const request = { req, res, serverUrl };

    switch (req.query.queue) {
        case 'priority':
            priorityQueue.enqueue(request, payload.priority || 1);
            break;
        case 'roundrobin':
            roundRobinQueue.enqueue(request);
            break;
        default:
            fifoQueue.enqueue(request);
            break;
    }
}


module.exports = {
    RouteBalance
}
