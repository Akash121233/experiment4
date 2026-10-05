import { useState, useEffect } from "react";
import axios from "axios";

const API = "https://experiment4-wkhk.onrender.com/api";

function Events() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  function loadEvents() {
    axios.get(API + "/events")
      .then((res) => setEvents(res.data))
      .catch(() => setError("Could not load events"));
  }

  useEffect(() => {
    loadEvents();
  }, []);

  async function registerForEvent(eventId) {
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: "Bearer " + token } };
    try {
      const res = await axios.post(
        API + "/registrations", { eventId: eventId }, config
      );
      setMessage(res.data.message);
      loadEvents();   // refresh: seats go down
    } catch (err) {
      if (err.response) setMessage(err.response.data.message);
      else setMessage("Server not reachable");
    }
  }

  // Admin: delete an event (bonus)
  async function deleteEvent(id) {
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: "Bearer " + token } };
    try {
      await axios.delete(API + "/events/" + id, config);
      loadEvents();
    } catch (err) {
      setMessage(err.response.data.message);
    }
  }

  const role = localStorage.getItem("role");

  return (
    <div>
      <h2>Events</h2>
      <p className="error">{error}</p>
      <p className="msg">{message}</p>
      {events.map((ev) => {
        let deleteButton = null;
        if (role === "admin") {
          deleteButton = (
            <button onClick={() => deleteEvent(ev._id)}>Delete</button>
          );
        }
        return (
          <div className="card" key={ev._id}>
            <h3>{ev.name}</h3>
            <p>{ev.category} | Rs. {ev.fee} | Seats: {ev.seats}</p>
            <p>Date: {new Date(ev.date).toDateString()}</p>
            <button onClick={() => registerForEvent(ev._id)}>
              Register
            </button>
            {deleteButton}
          </div>
        );
      })}
    </div>
  );
}

export default Events;
