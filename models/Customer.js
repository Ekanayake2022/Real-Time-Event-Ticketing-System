import logger from "../utils/logger.js";

class Customer {
  constructor(customerId, retrievalInterval, ticketPool) {
    this.customerId = customerId; // Unique ID for the customer
    this.retrievalInterval = retrievalInterval; // Time interval between ticket purchases (in ms)
    this.ticketPool = ticketPool; // Shared ticket pool
    this.timer = null;
  }

  // Start the customer "thread", which attempts to purchase tickets at intervals
  startPurchasing() {
    logger.log(
      `Customer ${this.customerId} started attempting to purchase tickets.`
    );
    this.timer = setInterval(() => {
      this.purchaseTicket();
    }, this.retrievalInterval);
  }

  // Stop the customer from purchasing tickets
  stopPurchasing() {
    clearInterval(this.timer);
    logger.log(`Customer ${this.customerId} stopped purchasing tickets.`);
  }

  // Attempt to retrieve a ticket from the ticket pool
  purchaseTicket() {
    const purchasedTicket = this.ticketPool.removeTicket();

    if (purchasedTicket) {
      // logger.log(
      //   `Customer ${this.customerId} purchased ticket for event: ${purchasedTicket.event} at $${purchasedTicket.price}`
      // );
      logger.log(`Customer ${this.customerId} purchased ticket`);
    } else {
      logger.log(
        `Customer ${this.customerId} could not purchase a ticket, none available.`
      );
    }
  }
}

export default Customer;
