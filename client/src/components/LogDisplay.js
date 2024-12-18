import React, { useState, useEffect } from "react";
import axios from "axios";
import "./logDisplay.css";

function LogDisplay() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = () => {
      axios
        .get("http://localhost:3001/api/logs")
        .then((response) => {
          const logData = response.data.logs;
          // Check if logData is a string and split by newline
          setLogs(
            typeof logData === "string"
              ? logData.split("\n").reverse()
              : logData.reverse()
          );
        })
        .catch((error) => console.error("Error fetching logs:", error));
    };

    fetchLogs();
    const interval = setInterval(fetchLogs, 2000); // Poll every 2 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div>
      <h2>System Logs</h2>
      <div className="log-display">
        {logs.map((log, index) => (
          <p key={index}>{log}</p>
        ))}
      </div>
    </div>
  );
}

export default LogDisplay;
