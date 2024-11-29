import React, { useState } from "react";
import axios from "axios";

function RemoveVendorForm() {
  const [vendorId, setVendorId] = useState("");

  const handleRemoveVendor = (e) => {
    e.preventDefault();

    axios
      .delete(`http://localhost:3001/api/vendors/${vendorId}`)
      .then((response) => alert(response.data.message))
      .catch((error) => alert("Failed to remove vendor: " + error.message));
  };

  return (
    <form onSubmit={handleRemoveVendor}>
      <h3> Remove Vendor </h3>
      <label>
        Vendor ID:
        <input
          type="text"
          value={vendorId}
          onChange={(e) => setVendorId(e.target.value)}
          required
        />
      </label>
      <button type="submit"> Remove Vendor</button>
    </form>
  );
}

export default RemoveVendorForm;
