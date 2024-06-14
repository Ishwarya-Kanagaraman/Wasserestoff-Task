// queue to perform the positioning of servers

class Queue {
    constructor() {
        this.items = [];
    }

    enqueue(item) {
        this.items.push(item);
    }

    dequeue() {
        return this.items.shift();
    }

    isEmpty() {
        return this.items.length === 0;
    }
}

// PriorityQueue to perform the positioning of servers

class PriorityQueue {
    constructor() {
        this.items = [];
    }

    enqueue(item, priority) {
        const newItem = { item, priority };
        if (this.isEmpty()) {
            this.items.push(newItem);
        } else {
            let added = false;
            for (let i = 0; i < this.items.length; i++) {
                if (newItem.priority < this.items[i].priority) {
                    this.items.splice(i, 0, newItem);
                    added = true;
                    break;
                }
            }
            if (!added) {
                this.items.push(newItem);
            }
        }
    }

    dequeue() {
        return this.items.shift().item;
    }

    isEmpty() {
        return this.items.length === 0;
    }
}

//  RoundRobinQueue to perform the positioning of servers

class RoundRobinQueue {
    constructor(servers) {
        this.items = [];
        this.servers = servers;
        this.index = 0;
    }

    enqueue(item) {
        this.items.push(item);
    }

    dequeue() {
        if (this.isEmpty()) return null;
        const server = this.servers[this.index];
        this.index = (this.index + 1) % this.servers.length;
        return { ...this.items.shift(), serverUrl: server };
    }

    isEmpty() {
        return this.items.length === 0;
    }
}

module.exports = { Queue, PriorityQueue, RoundRobinQueue };
