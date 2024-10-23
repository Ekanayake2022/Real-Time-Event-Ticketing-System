class Customer {
  constructor(customerId, retrievalInterval, ticketPool) {
    this.customerId = customerId;
    this.retrievalInterval = retrievalInterval;
    this.ticketPool = ticketPool;
    this.timer = null;
  }

  retrieveTickets() {
    console.log(`Customer ${this.customerId} is retrieving tickets.`);
    this.purchaseTicket(); // Add logic to purchase tickets
  }

  startPurchase() {
    console.log(`Customer ${this.customerId} started purchasing tickets.`);

    this.timer = setInterval(() => {
      this.retrieveTickets(); // Call the renamed method
    }, this.retrievalInterval); // Use the retrievalInterval property
  }

  stopPurchase() {
    clearInterval(this.timer);
    console.log(`Customer ${this.customerId} stopped purchasing tickets.`);
  }

  purchaseTicket() {
    const purchasedTicket = this.ticketPool.removeTicket();

    if (purchasedTicket) {
      console.log(
        `Customer ${this.customerId} purchased ticket for event: ${purchasedTicket.event}`
      );
    } else {
      console.log(`Customer ${this.customerId} could not purchase a ticket`);
    }
  }
}

export default Customer;
