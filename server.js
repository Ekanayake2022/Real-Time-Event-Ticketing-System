import express from "express";
import cors from "cors";
import path from "path";
import bodyParser from "body-parser";
import fs from "fs";
import { fileURLToPath } from "url";
import Configuration from "./models/Configuration.js";
import TicketPool from "./models/TicketPool.js";
import Vendor from "./models/Vendor.js";
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
    `Configuration updated: maxCapacity=${maxCapacity}, ticketReleaseInterval=${ticketReleaseInterval}, retrievalInterval=${retrievalInterval}`
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
app.post("/api/start", async (req, res) => {
  if (isSystemRunning) {
    return res.status(400).json({ message: "System already running" });
  }

  const { maxCapacity, ticketReleaseInterval, retrievalInterval } =
    req.body.config || {};

  ticketPool = new TicketPool(maxCapacity || 10);

  vendors = [new Vendor(1, 5, ticketReleaseInterval || 3000, ticketPool)];

  customers = [
    new Customer(1, retrievalInterval || 2000, ticketPool, 2), // VIP customer
    new Customer(2, retrievalInterval || 3000, ticketPool, 0), // Regular customer
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

// Endpoint to add a customer
app.post("/api/customers", (req, res) => {
  const { customerId, priority, retrievalInterval } = req.body;

  if (!customerId || priority === undefined || !retrievalInterval) {
    return res.status(400).json({ message: "Invalid request body" });
  }

  const newCustomer = new Customer(
    customerId,
    retrievalInterval,
    ticketPool,
    priority
  );
  customers.push(newCustomer);
  newCustomer.startPurchasing();

  res
    .status(200)
    .json({ message: `Customer ${customerId} added and started purchasing.` });
});

// Endpoint to add a vendor
app.post("/api/vendors", (req, res) => {
  const { vendorId, ticketsPerRelease, releaseInterval } = req.body;

  if (!vendorId || !`ticketsPerRelease` || !releaseInterval) {
    return res.status(400).json({ message: "Invalid vendor data" });
  }

  const newVendor = new Vendor(
    vendorId,
    ticketsPerRelease,
    releaseInterval,
    ticketPool
  );
  vendors.push(newVendor);
  newVendor.startProducing();

  logger.log(`Vendor ${vendorId} added and start producing tickets.`);
  res
    .status(200)
    .json({ message: `Vendor ${vendorId} added and start producing tickets.` });
});

//  Endpoint to remove a vendor
app.delete("/api/vendors/:vendorId", (req, res) => {
  const vendorId = parseInt(req.params.vendorId);
  const vendorIndex = vendors.findIndex(
    (vendor) => vendor.vendorId === vendorId
  );

  if (vendorIndex === -1) {
    return res.status(404).json({ message: "Vendor not found" }, vendorIndex);
  }

  vendors[vendorIndex].stopProducing();
  vendors.splice(vendorIndex, 1);

  logger.log(`Vendor ${vendorId} removed and stop producing tickets.`);
  res.status(200).json({
    message: `Vendor ${vendorId} removed and stop producing tickets.`,
  });
});

// Endpoint to add a customer 
app.post("/api/customers", (req, res) => {
  const { customerId, priority, retrievalInterval } = req.body;

  if (!customerId || priority === undefined || !retrievalInterval) {
    return res.status(400).json({ message: "Invalid request body" });
  }

  const newCustomer = new Customer(
    customerId,
    retrievalInterval,
    ticketPool,
    priority
  );
  customers.push(newCustomer);
  newCustomer.startPurchasing();

  logger.log(`Customer ${customerId} added and started purchasing tickets.`);
  res.status(200).json({
    message: `Customer ${customerId} added and started purchasing tickets.`,
  });
});

// Endpoint to remove a customer
app.delete("/api/customers/:customerId", (req, res) => {
  const customerId = parseInt(req.params.customerId);
  const customerIndex = customers.findIndex(
    (customer) => customer.customerId === customerId
  );

  if (customerIndex === -1) {
    return res.status(404).json({ message: "Customer not found" });
  }
  customers[customerIndex].stopPurchasing();
  customers.splice(customerIndex, 1);

  logger.log(`Customer ${customerId} removed and stop purchasing tickets.`);
  res.status(200).json({
    message: `Customer ${customerId} removed and stop purchasing tickets.`,
  });
});

// Endpoint to retrieve pending requests
app.get("/api/requests", (req, res) => {
  const requests = ticketPool.requestQueue.queue.map((customer) =>
    customer.toJSON()
  );
  res.status(200).json(requests);
});

// Endpoint to retrieve tickets
app.get("/api/tickets", async (req, res) => {
  try {
    const tickets = ticketPool.getTickets();
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving tickets" });
  }
});

// Endpoint to retrieve customers
app.get("/api/customers", (req, res) => {
  try {
    const customerData = customers.map((customer) => customer.toJSON());
    res.status(200).json(customerData);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving customers" });
  }
});

// Endpoint to retrieve logs
app.get("/api/logs", (req, res) => {
  try {
    const logs = logger.getLogs();
    res.status(200).json({ logs });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving logs" });
  }
});


 // * Start the server and listen on the specified port

app.listen(PORT, () => {
  logger.log(`Server is running on port ${PORT}`);
});
