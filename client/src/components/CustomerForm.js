import React, { useState } from "react";
import axios from "axios";

function CustomerForm() {
  const [customerId, setCustomerId] = useState("");
  const [priority, setPriority] = useState("");
  const [retrievalInterval, setRetrievalInterval] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCustomer = {
      customerId: parseInt(customerId, 10),
      priority: parseInt(priority, 10),
      retrievalInterval: parseInt(retrievalInterval, 10),
    };

    axios
      .post("http://localhost:3001/api/customers", newCustomer)
      .then((response) => {
        console.log(response.data.message);
        alert(response.data.message);
      })
      .catch((err) => {
        console.error("Error adding customer:", err.message);
        alert("Failed to add customer");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3> Add customer </h3>
      <label>
        Customer ID:
        <input
          type="text"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          required
        />
      </label>
      <label>
        Priority (0 = Regular, Higher = VIP):
        <input
          type="number"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          required
        />
      </label>
      <label>
        Retrieval Interval (ms):
        <input
          type="number"
          value={retrievalInterval}
          onChange={(e) => setRetrievalInterval(e.target.value)}
        />
      </label>
      <button type="submit"> Add Customer </button>
    </form>
  );
}

export default CustomerForm;
