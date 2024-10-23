import express from "express";
import cors from "cors";
import path from "path";
import Configuration from "./models/configuration.js"; // Include .js extension
import TicketPool from "./models/TicketPool.js"; // Include .js extension
import TicketVendor from "./models/Vendor.js"; // Include .js extension
import Customer from "./models/Customer.js";

const app = express();
// const port = process.env.PORT || 3001;
const port = 3001;

app.use(cors());
app.use(express.json());

const config = new Configuration(100, 5, 5, 1000);
config.validate();

// const jsonPath = path.join(__dirname, "config.json");
// const textPath = path.join(__dirname, "config.txt");

// config.saveToJson(jsonPath); // Corrected method name
// config.saveToText(textPath);

// const loadedJson = Configuration.loadFromJson(jsonPath); // Corrected method name
// const loadedText = Configuration.loadFromText(textPath); // Corrected method name

// Initialize the shared TicketPool with a maximum capacity of 50 tickets
const ticketPool = new TicketPool(50);

// Create multiple TicketVendor instances
const vendor1 = new TicketVendor(1, 5, 3000, ticketPool); // Vendor 1 releases 5 tickets every 3 seconds
const vendor2 = new TicketVendor(2, 3, 2000, ticketPool); // Vendor 2 releases 3 tickets every 2 seconds

// Start the vendors producing tickets
vendor1.startProducing();
vendor2.startProducing();

const customer1 = new Customer(1, 2500, ticketPool);
customer1.startPurchase();

// Optionally, stop vendors after a certain amount of time (for testing purposes)
setTimeout(() => {
  vendor1.stopProducing();
  vendor2.stopProducing();
  customer1.stopPurchase();
}, 20000); // Stop both vendors after 20 seconds

app.get("/", (req, res) => {
  res.send("Hello from the server!");
});

app.post("/submit", (req, res) => {
  res.send("Post request from client");
});
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
