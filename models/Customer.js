import logger from "../utils/logger.js";

class Customer {
  constructor(customerId, retrievalInterval, ticketPool, priority = 0) {
    this.customerId = customerId; // Unique ID for the customer
    this.retrievalInterval = retrievalInterval; // Time interval between ticket purchases (in ms)
    this.ticketPool = ticketPool; // Shared ticket pool
    this.timer = null;
    this.priority = priority;
  }

  // Start the customer "thread", which attempts to purchase tickets at intervals
  startPurchasing() {
    logger.log(
      `Customer ${this.customerId} started attempting to purchase tickets.`
    );
    this.timer = setInterval(() => {
      this.ticketPool.addRequest(this);
    }, this.retrievalInterval);
  }

  // Stop the customer from purchasing tickets
  stopPurchasing() {
    clearInterval(this.timer);
    logger.log(`Customer ${this.customerId} stopped purchasing tickets.`);
  }

  toJSON() {
    return {
      customerId: this.customerId,
      retrievalInterval: this.retrievalInterval,
      priority: this.priority,
    };
  }
}

export default Customer;
