import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Ticketing System API",
      version: "1.0.0",
      description:
        "A simple ticketing system API for managing ticket pools, vendors, and customers",
    },
  },
  apis: [path.join(__dirname, "../server.js")], // Adjust the path to server.js
};

const specs = swaggerJSDoc(options);

export default (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};
