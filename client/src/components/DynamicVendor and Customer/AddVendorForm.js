import React, { useState } from "react";
import axios from "axios";

function AddVendorForm() {
  const [vendorId, setVendorId] = useState("");
  const [ticketsPerRelease, setTicketsPerRelease] = useState(5);
  const [releaseInterval, setReleaseInterval] = useState(3000);

  const handleAddVendor = (e) => {
    e.preventDefault();

    const newVendor = {
      vendorId,
      ticketsPerRelease,
      releaseInterval,
    };

    axios
      .post("http://localhost:3001/api/vendors", newVendor)
      .then((response) => alert(response.data.message))
      .catch((error) => alert("Failed to add vendor: " + error.message));
  };

  return (
    <form onSubmit={handleAddVendor}>
      <h3>Add Vendor</h3>
      <label>
        Vendor ID:
        <input
          type="text"
          value={vendorId}
          onChange={(e) => setVendorId(e.target.value)}
          required
        />
      </label>
      <label>
        Tickets Per Release:
        <input
          type="number"
          value={ticketsPerRelease}
          onChange={(e) => setTicketsPerRelease(Number(e.target.value))}
          required
        />
      </label>
      <label>
        Release Interval (ms):
        <input
          type="number"
          value={releaseInterval}
          onChange={(e) => setReleaseInterval(Number(e.target.value))}
          required
        />
      </label>
      <button type="submit">Add Vendor</button>
    </form>
  );
}

export default AddVendorForm;
