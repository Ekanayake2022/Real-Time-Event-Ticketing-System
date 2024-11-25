class PriorityQueue {
  constructor() {
    this.queue = [];
  }

  enqueue(element) {
    this.queue.push(element);
    this.queue.sort((a, b) => b.priority - a.priority);
  }

  dequeue() {
    return this.queue.shift();
  }

  isEmpty() {
    return this.queue.length === 0;
  }
}

export default PriorityQueue;
