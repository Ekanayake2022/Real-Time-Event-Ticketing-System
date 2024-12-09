class PriorityQueue {
  constructor() {
    this.queue = []; //Create a priority queue.
  }

  // add an element to the queue.
  enqueue(element) {
    this.queue.push(element);
    this.queue.sort((a, b) => b.priority - a.priority);
  }

//Remove and return the highest priority element from the queue.
  dequeue() {
    return this.queue.shift();
  }

  //Check if the queue is empty.
  isEmpty() {
    return this.queue.length === 0;
  }
}

export default PriorityQueue;
