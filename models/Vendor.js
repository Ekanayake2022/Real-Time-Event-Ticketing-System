class Vendor {
  constructor(vendorId, ticketsPerRelease, releaseInterval, ticketPool) {
    this.vendorId = vendorId;
    this.ticketsPerRelease = ticketsPerRelease;
    this.releaseInterval = releaseInterval;
    this.ticketPool = ticketPool;
    this.timer = null;
  }

  startProducing() {
    console.log(`Vendor ${this.vendorId} started releasing tickets.`);

    this.timer = setInterval(() => {
      this.releaseTickets();
    }, this.releaseInterval);
  }

  stopProducing() {
    clearInterval(this.timer);
    console.log(`Vendor ${this.vendorId} stopped producing tickets.`);
  }

  releaseTickets() {
    console.log(
      `Vendor ${this.vendorId} is releasing ${this.ticketsPerRelease} tickets.`
    );
    for (let i = 0; i < this.ticketsPerRelease; i++) {
      const newTicket = {
        id: Date.now() + Math.random(),
        event: `Event by vendor ${this.vendorId}`,
        price: Math.floor(Math.random() * 100) + 20,
      };
      const isAdded = this.ticketPool.addTicket(newTicket);

      if (isAdded) {
        console.log(
          `Vendor ${this.vendorId} released ticket: ${newTicket.event} at price: ${newTicket.price}`
        );
      } else {
        console.log(
          `Vendor ${this.vendorId} failed to release tickets, pool is full`
        );
        break;
      }
    }
  }
}

export default Vendor;
