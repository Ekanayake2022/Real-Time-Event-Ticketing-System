import React, { useState } from "react";
import axios from "axios";
import "./configurationForm.css";

function ConfigurationForm({ onSubmit }) {
  const [maxCapacity, setMaxCapacity] = useState(10);
  const [ticketReleaseInterval, setTicketReleaseInterval] = useState(3000);
  const [retrievalInterval, setRetrievalInterval] = useState(2000);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Convert string values to numbers
    const configData = {
      totalTickets: maxCapacity,
      ticketReleaseRate: ticketReleaseInterval,
      customerRetrievalRate: retrievalInterval,
      maxTicketCapacity: maxCapacity,
    };

    // Send the configuration to the backend
    axios
      .post("http://localhost:3001/api/config", configData)
      .then((response) => {
        console.log(response.data.message);
        onSubmit && onSubmit(configData);
      })
      .catch((error) => {
        console.error("Error saving configuration:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3> Configurations </h3>
      <label>
        Max ticket capacity
        <input
          type="number"
          value={maxCapacity}
          onChange={(event) => setMaxCapacity(Number(event.target.value))}
        />
      </label>
      <label>
        Ticket release interval
        <input
          type="number"
          value={ticketReleaseInterval}
          onChange={(event) =>
            setTicketReleaseInterval(Number(event.target.value))
          }
        />
      </label>
      <label>
        Ticket retrieval interval
        <input
          type="number"
          value={retrievalInterval}
          onChange={(event) => setRetrievalInterval(Number(event.target.value))}
        />
      </label>
      <button type="submit">Save Configuration</button>
    </form>
  );
}

export default ConfigurationForm;
