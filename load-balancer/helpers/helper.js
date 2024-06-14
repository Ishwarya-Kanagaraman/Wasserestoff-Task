// Mock API servers
const apiServers = {
    rest: ['http://localhost:4000/api/rest/fast', 'http://localhost:4000/api/rest/slow'],
    graphql: ['http://localhost:4000/api/graphql'],
    grpc: ['http://localhost:4000/api/grpc'],
    // we can add more routes here, based on the custom requirements
};

// Randomly select an API server
function getRandomServer(servers, payload) {

    if (!servers) return null;

    // Routing based on payload size
    if (payload) {
        const payloadSize = JSON.stringify(payload).length;

        //  if payload size is large, use 'slow' endpoint for REST
        if (type === 'rest' && payloadSize > 1000) {
            servers = servers.filter(server => server.includes('slow'));
        }
        //  if payload size is small, use 'fast' endpoint for REST
        else if (type === 'rest' && payloadSize <= 1000) {
            servers = servers.filter(server => server.includes('fast'));
        }
    }

    // Example custom criteria based on payload content (if a field 'priority' exists)
    if (payload && payload.priority === 'high') {
        // Route to a grpc endpoint if high priority
        servers = servers.filter(server => server.includes('grpc'));
        if (type === 'graphql') {
            servers = servers.filter(server => server.includes('graphql'));
        }
    }

    // Fallback to random server selection if no other criteria matched
    return servers[Math.floor(Math.random() * servers.length)];

}

// processing servers based on the type of queue
// queue --> priority Queues/round robin/queue

const processQueue = async (queue, name) => {
    while (true) {
        const request = queue.dequeue();
        if (request) {
            const { req, res, serverUrl } = request;
            const options = {
                method: req.method,
                url: serverUrl,
                data: req.body,
                headers: { ...req.headers, host: new URL(serverUrl).host }
            };
            try {
                const response = await axios(options);
                res.send(response.data);
            } catch (error) {
                res.status(500).send('Error in fetching response from API');
            } finally {
                const requestTime = Date.now() - req.startTime;
                // logging the latency or time taken by the request
                console.log(`${name} Request to ${serverUrl} took ${requestTime}ms`);
            }

        }
    }
}
module.exports = {
    getRandomServer, apiServers, processQueue
}