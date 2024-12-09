import fs from "fs";
import path from "path";

class Configuration {
  constructor(
    totalTickets,  // Total number of tickets.
    // ticketReleaseRate,
    ticketReleaseInterval, // The interval at which tickets are released by the vendor.
    retrievalInterval, //The interval at which tickets are retrieved.
    maxCapacity // The maximum capacity of tickets.
  ) {
    this.totalTickets = totalTickets;
    this.ticketReleaseInterval = ticketReleaseInterval;
    this.retrievalInterval = retrievalInterval;
    this.maxCapacity = maxCapacity;
  }

  // Validate the configuration values.
  validate() {
    if (
      this.totalTickets <= 0 ||
      this.ticketReleaseInterval <= 0 ||
      this.retrievalInterval <= 0 ||
      this.maxCapacity <= 0
    ) {
      throw new Error("Invalid configuration. Values must be greater than 0");
    }
  }

  // Save the configuration to a JSON file.
  saveToJson(filePath) {
    try {
      const data = {
        totalTickets: this.totalTickets,
        ticketReleaseInterval: this.ticketReleaseInterval,
        retrievalInterval: this.retrievalInterval,
        maxCapacity: this.maxCapacity,
      };
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      console.log("Configuration saved to JSON file.");
    } catch (error) {
      console.error("Can't save configuration to JSON.", error);
    }
  }

  // Load the configuration from a JSON file.
  static loadFromJson(filePath) {
    try {
      const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      return new Configuration(
        data.totalTickets,
        data.ticketReleaseInterval,
        data.retrievalInterval,
        data.maxCapacity
      );
    } catch (error) {
      console.error("Can't load configuration from JSON.", error);
      return null;
    }
  }
// Save the configuration to a text file.
  saveToText(filePath) {
    try {
      const configString = `Total Tickets: ${this.totalTickets}\n
      Ticket Release Rate: ${this.ticketReleaseInterval}\n
      Customer Retrieval Rate: ${this.retrievalInterval}\n
      Max Ticket Capacity: ${this.maxCapacity}\n`;
      fs.writeFileSync(filePath, configString);
      console.log("Configuration saved to text file.");
    } catch (error) {
      console.error("Can't save configuration to text file", error);
    }
  }

  // Load the configuration from a text file.
  static loadFromText(filePath) {
    try {
      const configLines = fs.readFileSync(filePath, "utf-8").split("\n");
      const totalTickets = parseInt(configLines[0].split(": ")[1], 10);
      const ticketReleaseInterval = parseInt(configLines[1].split(": ")[1], 10);
      const retrievalInterval = parseInt(configLines[2].split(": ")[1], 10);
      const maxCapacity = parseInt(configLines[3].split(": ")[1], 10);
      return new Configuration(
        totalTickets,
        ticketReleaseInterval,
        retrievalInterval,
        maxCapacity
      );
    } catch (error) {
      console.error("Can't load configuration from text file", error);
      return null;
    }
  }

  // Convert the configuration to a plain object.
  toPlainObject() {
    return {
      totalTickets: this.totalTickets,
      ticketReleaseInterval: this.ticketReleaseInterval,
      retrievalInterval: this.retrievalInterval,
      maxCapacity: this.maxCapacity,
    };
  }
}

export default Configuration;
