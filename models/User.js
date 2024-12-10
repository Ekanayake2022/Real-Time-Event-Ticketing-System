class User {
  constructor(id, interval, ticketPool) {
    this.id = id;
    this.interval = interval;
    this.ticketPool = ticketPool;
    this.timer = null;
  }

  start() {
    console.log(`User ${this.id} started attempting to purchase tickets.`);
    this.timer = setInterval(() => {
      this.ticketPool.addRequest(this);
    }, this.interval);
  }

  stop() {
    clearInterval(this.timer);
    console.log(`User ${this.id} stopped purchasing tickets.`);
  }
}

export default User;
