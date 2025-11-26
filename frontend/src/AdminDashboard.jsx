import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

export default function AdminDashboard() {
  const [reservations, setReservations] = useState([]);
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resSeats = await axios.get(`${API_URL}/seats/1`); // Example show_id=1
        const resReservations = await axios.get(`${API_URL}/reservations`);
        setSeats(resSeats.data);
        setReservations(resReservations.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading admin dashboard...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Admin Dashboard</h1>

      <h2>Seat Inventory</h2>
      <table border="1" cellPadding="5" cellSpacing="0">
        <thead>
          <tr>
            <th>Seat ID</th>
            <th>Status</th>
            <th>Reservation ID</th>
          </tr>
        </thead>
        <tbody>
          {seats.map(seat => (
            <tr key={seat.id}>
              <td>{seat.id}</td>
              <td>{seat.status}</td>
              <td>{seat.hold_id || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={{ marginTop: 20 }}>Reservations</h2>
      <table border="1" cellPadding="5" cellSpacing="0">
        <thead>
          <tr>
            <th>Reservation ID</th>
            <th>User ID</th>
            <th>Seat IDs</th>
            <th>Status</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map(res => (
            <tr key={res.id}>
              <td>{res.id}</td>
              <td>{res.user_id}</td>
              <td>{res.seat_ids.join(", ")}</td>
              <td>{res.status}</td>
              <td>{res.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
