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
  const [config, setConfig] = useState({});

  const addCustomer = (newCustomer) => {
    setCustomers([...customers, newCustomer]);
  };

  const handleConfigurationSubmit = (config) => {
    setConfig(config);
  };

  const startSystem = (config) => {
    setIsSystemRunning(true);
    // Add logic to start the system with the given config
  };

  const stopSystem = (config) => {
    setIsSystemRunning(false);
    // Add logic to stop the system with the given config
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
  <p className="status-message">
    {isRunning ? "System is running" : "System is stopped"}
  </p>
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
