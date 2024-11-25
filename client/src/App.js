import React, { useState } from "react";
import axios from "axios";
import ConfigurationForm from "./components/ConfigurationForm";
import TicketDisplay from "./components/TicketDisplay";
import ControlPanel from "./components/ControlPanel";
import LogDisplay from "./components/LogDisplay";
import "./App.css";
import CustomerForm from "./components/CustomerForm";

function App() {
  const [isSystemRunning, setIsSystemRunning] = useState(false);
  const [config, setConfig] = useState({
    maxCapacity: 10,
    ticketReleaseInterval: 3000,
    retrievalInterval: 2000,
  });

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
      <ConfigurationForm onSubmit={handleConfigurationSubmit} />
      {isSystemRunning ? <p>System is running</p> : <p>System is stopped</p>}
      <CustomerForm />
      <ControlPanel
        onStart={() => startSystem(config)}
        onStop={() => stopSystem(config)}
      />
      <TicketDisplay />
      <LogDisplay />
    </div>
  );
}

export default App;
