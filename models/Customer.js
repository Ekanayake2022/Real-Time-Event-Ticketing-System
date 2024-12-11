import logger from "../utils/logger.js";
import User from "./User.js";

class Customer extends User {
  constructor(id, retrievalInterval, ticketPool, priority = 0) {
    super(id, retrievalInterval, ticketPool);
    this.priority = priority; // Priority for the customer
  }

  // Start the customer "thread", which attempts to purchase tickets at intervals
  startPurchasing() {
    logger.log(`Customer ${this.id} started attempting to purchase tickets.`);
    this.timer = setInterval(() => {
      this.ticketPool.addRequest(this);
    }, this.interval);
  }

  // Stop the customer from purchasing tickets
  stopPurchasing() {
    this.stop();
    logger.log(`Customer ${this.id} stopped purchasing tickets.`);
  }

  toJSON() {
    return {
      id: this.id,
      retrievalInterval: this.interval,
      priority: this.priority,
    };
  }
}

export default Customer;
