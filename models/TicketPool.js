import logger from "../utils/logger.js";
import { Mutex } from 'async-mutex';

class TicketPool {
  constructor(maxCapacity) {
    this.tickets = [];
    this.maxCapacity = maxCapacity;
    this.mutex = new Mutex();
  }

  // Add a ticket to the pool with thread safety and capacity checks
  async addTicket(ticket) {
    const release = await this.mutex.acquire();
    try {
      if (this.tickets.length < this.maxCapacity) {
        this.tickets.push(ticket);
        logger.log("Ticket added to the pool.");
        return true;
      } else {
        logger.log("Ticket pool is full! No more tickets can be added.");
        return false;
      }
    } catch (error) {
      logger.error(`Error adding ticket: ${error.message}`);
      return false;
    } finally {
      release();
    }
  }

  // Remove a ticket from the pool safely
  async removeTicket() {
    const release = await this.mutex.acquire();
    try {
      if (this.tickets.length > 0) {
        const ticket = this.tickets.shift();
        logger.log(`Ticket removed from the pool`);
        return ticket;
      } else {
        logger.log("No tickets available for purchase!");
        return null;
      }
    } catch (error) {
      logger.error(`Error removing ticket: ${error.message}`);
      return null;
    } finally {
      release();
    }
  }

  // Get current tickets
  async getTickets() {
    const release = await this.mutex.acquire();
    try {
      logger.log("Fetching tickets from Ticket pool.");
      return [...this.tickets];
    } catch (error) {
      logger.error(`Error fetching tickets: ${error.message}`);
      return [];
    } finally {
      release();
    }
  }
}

export default TicketPool;
