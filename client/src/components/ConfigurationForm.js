import React, { useState } from "react";
import "./configurationForm.css";

function ConfigurationForm({ onSubmit }) {
  const [maxCapacity, setMaxCapacity] = useState(10);
  const [ticketReleaseInterval, setTicketReleaseInterval] = useState(3000);
  const [retrievalInterval, setRetrievalInterval] = useState(2000);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      maxCapacity,
      ticketReleaseInterval,
      retrievalInterval,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3> Configuration settings </h3>
      <label>
        Max ticket capacity:
        <input
          type="number"
          value={maxCapacity}
          onChange={(event) => setMaxCapacity(event.target.value)}
        />
      </label>
      <label>
        Ticket release interval:
        <input
          type="number"
          value={ticketReleaseInterval}
          onChange={(event) => setTicketReleaseInterval(event.target.value)}
        />
      </label>
      <label>
        Ticket retrieval interval:
        <input
          type="number"
          value={retrievalInterval}
          onChange={(event) => setRetrievalInterval(event.target.value)}
        />
      </label>
      <button type="submit"> Save Configuration </button>
    </form>
  );
}

export default ConfigurationForm;
