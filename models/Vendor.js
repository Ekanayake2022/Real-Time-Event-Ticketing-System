import logger from "../utils/logger.js";

class Vendor {
  constructor(vendorId, ticketsPerRelease, releaseInterval, ticketPool) {
    this.vendorId = vendorId;
    this.ticketsPerRelease = ticketsPerRelease; // Number of tickets released each time
    this.releaseInterval = releaseInterval; // Time interval between releases (in ms)
    this.ticketPool = ticketPool; // Shared ticket pool
    this.timer = null; // Holds the setInterval reference
  }

  // Start releasing tickets at regular intervals
  startProducing() {
    logger.log(`Vendor ${this.vendorId} started releasing tickets.`);
    this.timer = setInterval(() => {
      this.releaseTickets();
    }, this.releaseInterval);
  }

  // Stop producing tickets
  stopProducing() {
    clearInterval(this.timer);
    logger.log(`Vendor ${this.vendorId} stopped producing tickets.`);
  }

  // Logic for releasing tickets, respecting the pool capacity
  async releaseTickets() {
    logger.log(
      `Vendor ${this.vendorId} is attempting to release ${this.ticketsPerRelease} tickets.`
    );

    // Check if there's enough space in the pool before adding tickets
    if (
      this.ticketPool.getTickets().length + this.ticketsPerRelease >
      this.ticketPool.maxCapacity
    ) {
      logger.log(
        `Vendor ${this.vendorId} cannot release tickets. Pool is at or near capacity.`
      );
      return;
    }

    // If space is available, add tickets to the pool
    for (let i = 0; i < this.ticketsPerRelease; i++) {
      const newTicket = {
        id: Date.now() + Math.random(), // Unique ticket ID
        event: `Event by Vendor ${this.vendorId}`,
        price: Math.floor(Math.random() * 100) + 1, // Random price between 1 and 100
      };
      await this.ticketPool.addTicket(newTicket);
    }
  }
}

export default Vendor;
