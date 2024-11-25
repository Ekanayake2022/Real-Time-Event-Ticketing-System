import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ticketDisplay.css";

function TicketDisplay() {
  const [tickets, setTickets] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchTickets = () => {
      axios
        .get("http://localhost:3001/api/tickets")
        .then((response) => setTickets(response.data))
        .catch((error) => console.error("Error fetching tickets:", error));
    };

    const fetchRequests = () => {
      axios
        .get("http://localhost:3001/api/requests")
        .then((response) => setRequests(response.data))
        .catch((error) => console.error("Error fetching requests:", error));
    };

    fetchTickets();
    fetchRequests();
    // Poll every 2 seconds
    const interval = setInterval(() => {
      fetchTickets();
      fetchRequests();
    }, 2000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="ticket-container">
      <h3>Ticket Availability</h3>
      <ul className="ticket-list">
        {tickets.length > 0 ? (
          tickets.map((ticket) => (
            <li key={ticket.id}>
              <span className="ticket-event">{ticket.event}</span>
              <span className="ticket-price">{ticket.price}</span>
            </li>
          ))
        ) : (
          <p>No tickets available</p>
        )}
      </ul>

      <h3>Pending Requests</h3>
      <ul>
        {requests.length > 0 ? (
          requests.map((request) => (
            <li key={request.id}>
              <span className="request-customer">{request.customerId}</span>
              <span className="request-priority">{request.priority}</span>
            </li>
          ))
        ) : (
          <p>No pending requests</p>
        )}
      </ul>
    </div>
  );
}

export default TicketDisplay;
