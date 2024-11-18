import express from "express";
import cors from "cors";
import path from "path";
import bodyParser from "body-parser";
import fs from "fs";
import { fileURLToPath } from "url";
import Configuration from "./models/Configuration.js";
import TicketPool from "./models/TicketPool.js";
import TicketVendor from "./models/Vendor.js";
import Customer from "./models/Customer.js";
import logger from "./utils/logger.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const CONFIG_PATH = path.join(__dirname, "config.json");

app.use(cors());
app.use(bodyParser.json());

let ticketPool = new TicketPool(10);
let vendors = [];
let customers = [];
let isSystemRunning = false;

// Endpoint to save configuration to JSON file
app.post("/api/config", (req, res) => {
  const { maxCapacity, ticketReleaseInterval, retrievalInterval } = req.body;

  // Log the configuration update
  logger.log(
    `Configuration updated: Max Capacity - ${maxCapacity}, Ticket Release Interval - ${ticketReleaseInterval}, Retrieval Interval - ${retrievalInterval}`
  );

  // Save configuration to JSON file
  const config = { maxCapacity, ticketReleaseInterval, retrievalInterval };
  fs.writeFile(CONFIG_PATH, JSON.stringify(config, null, 2), (err) => {
    if (err) {
      console.error("Error saving configuration to JSON:", err);
      return res.status(500).json({ message: "Error saving configuration." });
    }
    console.log("Configuration saved to JSON file.");
    res.status(200).json({ message: "Configuration updated" });
  });
});

// Endpoint to start the ticketing system
app.post("/api/start", (req, res) => {
  if (isSystemRunning) {
    return res.status(400).json({ message: "System already running" });
  }

  const { maxCapacity, ticketReleaseInterval, retrievalInterval } =
    req.body.config || {};

  ticketPool = new TicketPool(maxCapacity || 10);

  vendors = [
    new TicketVendor(1, 5, ticketReleaseInterval || 3000, ticketPool),
  ];

  customers = [
    new Customer(1, retrievalInterval || 2000, ticketPool),
  ];

  vendors.forEach((vendor) => vendor.startProducing());
  customers.forEach((customer) => customer.startPurchasing());

  isSystemRunning = true;
  logger.log("System started");
  res.status(200).json({ message: "System started" });
});

// Endpoint to stop the ticketing system
app.post("/api/stop", (req, res) => {
  if (!isSystemRunning) {
    return res.status(400).json({ message: "System already stopped" });
  }

  vendors.forEach((vendor) => vendor.stopProducing());
  customers.forEach((customer) => customer.stopPurchasing());

  isSystemRunning = false;
  logger.log("System stopped");
  res.status(200).json({ message: "System stopped" });
});

// Endpoint to retrieve tickets
app.get("/api/tickets", async (req, res) => {
  try {
    const tickets = await ticketPool.getTickets();
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tickets" });
  }
});

// Endpoint to retrieve logs
app.get("/api/logs", (req, res) => {
  const logs = logger.getLogs();
  res.json({ logs });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
