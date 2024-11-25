import React, { useState } from "react";
import axios from "axios";
import "./configurationForm.css";

function ConfigurationForm({ onSubmit }) {
  const [totalTickets, setTotalTickets] = useState(0);
  const [ticketReleaseInterval, setTicketReleaseInterval] = useState(0);
  const [retrievalInterval, setRetrievalInterval] = useState(0);
  const [maxCapacity, setMaxCapacity] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();

    const configData = {
      totalTickets,
      ticketReleaseInterval,
      retrievalInterval,
      maxCapacity,
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
      <h3>Configurations</h3>
      <label>
        Total Tickets
        <input
          type="number"
          value={totalTickets}
          onChange={(event) => setTotalTickets(Number(event.target.value))}
        />
      </label>
      <label>
        Ticket Release Interval
        <input
          type="number"
          value={ticketReleaseInterval}
          onChange={(event) =>
            setTicketReleaseInterval(Number(event.target.value))
          }
        />
      </label>
      <label>
        Ticket Retrieval Interval
        <input
          type="number"
          value={retrievalInterval}
          onChange={(event) => setRetrievalInterval(Number(event.target.value))}
        />
      </label>
      <label>
        Max Ticket Capacity
        <input
          type="number"
          value={maxCapacity}
          onChange={(event) => setMaxCapacity(Number(event.target.value))}
        />
      </label>
      <button type="submit">Save Configuration</button>
    </form>
  );
}

export default ConfigurationForm;
