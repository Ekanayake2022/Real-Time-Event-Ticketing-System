import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch data from the backend when the component mounts
    axios
      .get("http://localhost:3000")
      .post("http://localhost:3000")
      .then((response) => {
        setMessage(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching data:", error);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Real-Time Event Ticketing System</h1>
        <p>{message}</p>
      </header>
    </div>
  );
}

export default App;
