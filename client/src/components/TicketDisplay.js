import React, { useState, useEffect } from "react";
import axios from "axios";

function TicketDisplay() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = () => {
      axios
        .get("http://localhost:3001/api/tickets")
        .then((response) => setTickets(response.data))
        .catch((error) => console.error("Error fetching tickets:", error));
    };

    fetchTickets();
    const interval = setInterval(fetchTickets, 2000); // Poll every 2 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div>
      <h3>Ticket Availability</h3>
      <ul>
        {tickets.length > 0 ? (
          tickets.map((ticket) => (
            <li key={ticket.id}>
              {ticket.event} - ${ticket.price}
            </li>
          ))
        ) : (
          <p>No tickets available</p>
        )}
      </ul>
    </div>
  );
}

export default TicketDisplay;
