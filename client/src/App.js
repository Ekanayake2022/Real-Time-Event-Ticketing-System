import React, { useState } from "react";
import axios from "axios";
import ConfigurationForm from "./components/ConfigurationForm";
import TicketDisplay from "./components/TicketDisplay";
import ControlPanel from "./components/ControlPanel";
import LogDisplay from "./components/LogDisplay";
import "./App.css";
import AddVendorForm from "./components/DynamicVendor and Customer/AddVendorForm";
import RemoveVendorForm from "./components/DynamicVendor and Customer/RemoveVendorForm";
import AddCustomerForm from "./components/DynamicVendor and Customer/AddCustomerForm";
import RemoveCustomerForm from "./components/DynamicVendor and Customer/RemoveCustomerForm";

const App = () => {
  const [customers, setCustomers] = useState([]);
  const [isSystemRunning, setIsSystemRunning] = useState(false);
  const [config, setConfig] = useState({
    maxCapacity: 10,
    ticketReleaseInterval: 3000,
    retrievalInterval: 2000,
  });

  const addCustomer = (newCustomer) => {
    setCustomers([...customers, newCustomer]);
  };

  const handleConfigurationSubmit = (newConfig) => {
    setConfig(newConfig);
    axios
      .post("http://localhost:3001/config", newConfig)
      .then(() => console.log("Configuration saved"))
      .catch((error) => console.error("Error saving configuration:", error));
  };

  const startSystem = (newConfig) => {
    setIsSystemRunning(true);
    axios
      .post("http://localhost:3001/start", newConfig)
      .then(() => console.log("System started"))
      .catch((error) => console.error("Error starting system:", error));
  };

  const stopSystem = (newConfig) => {
    setIsSystemRunning(false);
    axios
      .post("http://localhost:3001/stop", newConfig)
      .then(() => console.log("System Stopped"))
      .catch((error) => console.error("Error Stopping system:", error));
  };

  return (
    <div className="App">
      <h1> Ticketing System </h1>
      <FormContainer onSubmit={handleConfigurationSubmit} />
      <SystemStatus isRunning={isSystemRunning} />
      <ControlPanel
        onStart={() => startSystem(config)}
        onStop={() => stopSystem(config)}
      />
      <TicketDisplay />
      <LogDisplay />

      <h1> Dynamic Vendor/ Customer Management </h1>
      <DynamicContainer addCustomer={addCustomer} />
    </div>
  );
};

const FormContainer = ({ onSubmit }) => (
  <div className="form-container">
    <ConfigurationForm onSubmit={onSubmit} />
  </div>
);

const SystemStatus = ({ isRunning }) => (
  <p>{isRunning ? "System is running" : "System is stopped"}</p>
);

const DynamicContainer = ({ addCustomer }) => (
  <div className="dynamic-container">
    <div className="vendor-form-container">
      <AddVendorForm />
      <RemoveVendorForm />
    </div>
    <div className="customer-form-container">
      <AddCustomerForm onSubmit={addCustomer} />
      <RemoveCustomerForm />
    </div>
  </div>
);

export default App;
