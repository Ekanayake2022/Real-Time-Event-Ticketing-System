import { Mutex } from "async-mutex";

class TicketPool {
  constructor(maxCapacity) {
    this.tickets = [];
    this.maxCapacity = maxCapacity;
    this.mutex = new Mutex();
  }

  async addTicket(ticket) {
    const release = await this.mutex.acquire();
    try {
      if (this.tickets.length < this.maxCapacity) {
        this.tickets.push(ticket);
        console.log("Ticket added to the pool.");
        return true;
      } else {
        console.log("Ticket pool is full");
        return false;
      }
    } finally {
      release();
    }
  }

  async removeTicket() {
    const release = await this.mutex.acquire();
    try {
      if (this.tickets.length > 0) {
        const ticket = this.tickets.shift();
        console.log(`Ticket removed from the pool`);
        return ticket;
        return ticket;
      } else {
        console.log(`No tickets available in ticket pool`);
        return null;
      }
    } finally {
      release();
    }
  }
  getTickets() {
    return this.tickets;
  }
}

export default TicketPool;
