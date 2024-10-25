import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get the directory name in an ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Correct the filePath definition
const filePath = path.join(__dirname, "..", "logs", "system.log");

// Ensure the logs directory exists
if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
  fs.mkdirSync(path.join(__dirname, "..", "logs"));
}

const logger = {
  log: (message) => {
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp}: ${message}\n`;

    console.log(logMessage);

    // Append the log message to the log file
    fs.appendFileSync(filePath, logMessage, { encoding: "utf-8" });
  },
  error: (message) => {
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp} [ERROR]: ${message}\n`;

    console.error(logMessage);

    // Append the error message to the log file
    fs.appendFileSync(filePath, logMessage, { encoding: "utf-8" });
  },
};

export default logger;
