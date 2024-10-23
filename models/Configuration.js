import fs from "fs";
import path from "path";

class Configuration {
  constructor(
    totalTickets,
    ticketReleaseRate,
    customerRetrievalRate,
    maxTicketCapacity
  ) {
    this.totalTickets = totalTickets;
    this.ticketReleaseRate = ticketReleaseRate;
    this.customerRetrievalRate = customerRetrievalRate;
    this.maxTicketCapacity = maxTicketCapacity;
  }

  validate() {
    if (
      this.totalTickets <= 0 ||
      this.ticketReleaseRate <= 0 ||
      this.customerRetrievalRate <= 0 ||
      this.maxTicketCapacity <= 0
    ) {
      throw new Error("Invalid configuration. Values must be greater than 0");
    }
  }

  saveToJson(filePath) {
    try {
      const data = {
        totalTickets: this.totalTickets,
        ticketReleaseRate: this.ticketReleaseRate,
        customerRetrievalRate: this.customerRetrievalRate,
        maxTicketCapacity: this.maxTicketCapacity,
      };
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      console.log("Configuration saved to JSON file.");
    } catch (error) {
      console.error("Can't save configuration to JSON.", error);
    }
  }

  static loadFromJson(filePath) {
    try {
      const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      return new Configuration(
        data.totalTickets,
        data.ticketReleaseRate,
        data.customerRetrievalRate,
        data.maxTicketCapacity
      );
    } catch (error) {
      console.error("Can't load configuration from JSON.", error);
      return null;
    }
  }

  saveToText(filePath) {
    try {
      const configString = `Total Tickets: ${this.totalTickets}\n
      Ticket Release Rate: ${this.ticketReleaseRate}\n
      Customer Retrieval Rate: ${this.customerRetrievalRate}\n
      Max Ticket Capacity: ${this.maxTicketCapacity}\n`;
      fs.writeFileSync(filePath, configString);
      console.log("Configuration saved to text file.");
    } catch (error) {
      console.error("Can't save configuration to text file", error);
    }
  }

  static loadFromText(filePath) {
    try {
      const configLines = fs.readFileSync(filePath, "utf-8").split("\n");
      const totalTickets = parseInt(configLines[0].split(": ")[1], 10);
      const ticketReleaseRate = parseInt(configLines[1].split(": ")[1], 10);
      const customerRetrievalRate = parseInt(configLines[2].split(": ")[1], 10);
      const maxTicketCapacity = parseInt(configLines[3].split(": ")[1], 10);
      return new Configuration(
        totalTickets,
        ticketReleaseRate,
        customerRetrievalRate,
        maxTicketCapacity
      );
    } catch (error) {
      console.error("Can't load configuration from text file", error);
      return null;
    }
  }
}

export default Configuration;
