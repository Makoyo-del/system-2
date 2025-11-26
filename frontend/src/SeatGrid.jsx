import React, { useState, useEffect } from "react";
import { holdSeats, confirmHold, getSeats } from "./api";

export default function SeatGrid({ showId, userId, email }) {
  const [seats, setSeats] = useState([]);
  const [selected, setSelected] = useState([]);
  const [reservationId, setReservationId] = useState(null);

  // Fetch seats from backend
  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const seatData = await getSeats(showId);
        setSeats(seatData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSeats();
  }, [showId]);

  // Toggle seat selection
  const toggleSeat = (seat) => {
    console.log("Seat clicked:", seat.id);
    if (seat.status !== "available") return;
    if (selected.includes(seat.id)) {
      setSelected(selected.filter((id) => id !== seat.id));
    } else {
      setSelected([...selected, seat.id]);
    }
  };

  // Hold selected seats
  const handleHold = async () => {
    if (selected.length === 0) return alert("Select seats first");
    try {
      const res = await holdSeats(showId, selected, userId, email);
      setReservationId(res.reservation_id);
      alert(`Seats held! Reservation ID: ${res.reservation_id}`);
      setSeats(
        seats.map((seat) =>
          selected.includes(seat.id) ? { ...seat, status: "held" } : seat
        )
      );
      setSelected([]);
    } catch (err) {
      alert(err.response?.data?.detail || err.message);
    }
  };

  // Confirm held seats
  const handleConfirm = async () => {
    if (!reservationId) return alert("No reservation to confirm");
    try {
      const res = await confirmHold(reservationId, email);
      alert(`Reservation confirmed! ID: ${res.reservation_id}`);
      setSeats(
        seats.map((seat) => (seat.status === "held" ? { ...seat, status: "sold" } : seat))
      );
      setReservationId(null);
    } catch (err) {
      alert(err.response?.data?.detail || err.message);
    }
  };

  // Render seats in a grid
  return (
    <div>
      <h2>Seat Map</h2>
      <div style={{ display: "flex", flexWrap: "wrap", maxWidth: 350 }}>
        {seats.map((seat) => (
          <div
            key={seat.id}
            onClick={() => toggleSeat(seat)}
            style={{
              width: 30,
              height: 30,
              margin: 2,
              backgroundColor:
                seat.status === "available"
                  ? "green"
                  : seat.status === "held"
                  ? "orange"
                  : "red",
              cursor: seat.status === "sold" ? "not-allowed" : "pointer",
              textAlign: "center",
              lineHeight: "30px",
              color: "white",
              fontWeight: selected.includes(seat.id) ? "bold" : "normal",
            }}
          >
            {seat.id}
          </div>
        ))}
      </div>

      <div style={{ marginTop: 10 }}>
        <button onClick={handleHold}>Hold Selected</button>
        <button onClick={handleConfirm} style={{ marginLeft: 10 }}>
          Confirm Hold
        </button>
      </div>

      <div style={{ marginTop: 20 }}>
        <h4>Legend:</h4>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <span style={{ display: "inline-block", width: 20, height: 20, backgroundColor: "green" }}></span> Available
          <span style={{ display: "inline-block", width: 20, height: 20, backgroundColor: "orange" }}></span> Held
          <span style={{ display: "inline-block", width: 20, height: 20, backgroundColor: "red" }}></span> Sold
        </div>
      </div>
    </div>
  );
}
