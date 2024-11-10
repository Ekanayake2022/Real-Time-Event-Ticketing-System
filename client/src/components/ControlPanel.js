import React from "react";
import axios from "axios";
import "./controlPanel.css";

function ControlPanel({ onStart, onStop }) {
  const startSystem = () => {
    axios
      .post("http://localhost:3001/api/start")
      .then((response) => {
        console.log(response.data.message);
        onStart();
      })
      .catch((error) => {
        console.error("Error starting system:", error);
      });
  };

  const stopSystem = () => {
    axios
      .post("http://localhost:3001/api/stop")
      .then((response) => {
        console.log(response.data.message);
        onStop();
      })
      .catch((error) => {
        console.error("Error stopping system:", error);
      });
  };
  return (
    <div className="control-container">
      <button onClick={startSystem}> Start </button>
      <button onClick={stopSystem}> Stop </button>
    </div>
  );
}

export default ControlPanel;
