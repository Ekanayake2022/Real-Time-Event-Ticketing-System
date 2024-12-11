import React, { useState } from "react";
import axios from "axios";

function AddCustomerForm() {
  const [id, setid] = useState("");
  const [priority, setPriority] = useState(0);
  const [retrievalInterval, setRetrievalInterval] = useState(2000);

  const handleAddCustomer = (e) => {
    e.preventDefault();
    const newCustomer = {
      id,
      priority,
      retrievalInterval,
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
    <form onSubmit={handleAddCustomer}>
      <h3> Add customer </h3>
      <label>
        Customer ID:
        <input
          type="text"
          value={id}
          onChange={(e) => setid(e.target.value)}
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

export default AddCustomerForm;
