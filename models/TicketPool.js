import logger from "../utils/logger.js";
import { Mutex } from "async-mutex";
import PriorityQueue from "./PriorityQueue.js"; // Ensure the correct path and file extension

class TicketPool {
  constructor(maxCapacity) {
    this.tickets = [];
    this.maxCapacity = maxCapacity; //Maximum number of tickets in the pool
    this.mutex = new Mutex();
    this.requestQueue = new PriorityQueue(); // Priority queue for ticket requests
  }

  // Add a ticket to the pool with thread safety and capacity checks
  async addTicket(ticket) {
    const release = await this.mutex.acquire();
    try {
      if (this.tickets.length < this.maxCapacity) {
        this.tickets.push(ticket);
        logger.log(`Ticket added: ${ticket.event} at $${ticket.price}`);
        this.processRequest(); // Process any pending requests
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

  // Add a customer request to the queue
  addRequest(customer) {
    this.requestQueue.enqueue(customer);
    logger.log(
      `Customer ${customer.id} (Priority: ${customer.priority}) added to the queue.`
    );
    this.processRequest();
  }

  // Process ticket requests based on priority
  async processRequest() {
    const release = await this.mutex.acquire();
    try {
      if (!this.requestQueue.isEmpty() && this.tickets.length > 0) {
        const customer = this.requestQueue.dequeue();
        const ticket = this.tickets.shift();
        logger.log(
          `Customer ${customer.id} (Priority: ${customer.priority}) purchased ticket: ${ticket.event} at $${ticket.price}`
        );
      } else if (this.tickets.length === 0) {
        logger.log("No tickets available to process requests.");
      }
    } catch (error) {
      logger.error(`Error processing request: ${error.message}`);
    } finally {
      release();
    }
  }

  // Get the list of tickets
  getTickets() {
    return this.tickets;
  }
}

export default TicketPool;
