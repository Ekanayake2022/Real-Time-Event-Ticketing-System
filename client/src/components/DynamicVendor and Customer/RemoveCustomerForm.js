import React, { useState } from "react";
import axios from "axios";

function RemoveCustomerForm() {
  const [customerId, setCustomerId] = useState("");

  const handleRemoveCustomer = (e) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:3001/api/customers/${customerId}`)
      .then((response) => {
        console.log(response.data.message);
        alert(response.data.message);
      })
      .catch((err) => {
        console.error("Error removing customer:", err.message);
        alert("Failed to remove customer");
      });
  };

  return (
    <form onSubmit={handleRemoveCustomer}>
      <h3>Remove Customer</h3>
      <label>
        Customer ID:
        <input
          type="text"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          required
        />
      </label>
      <button type="submit">Remove Customer</button>
    </form>
  );
}

export default RemoveCustomerForm;
