import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

// Fetch seat inventory for a show
export const getSeats = async (show_id) => {
  try {
    const res = await axios.get(`${API_URL}/seats/${show_id}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching seats:", err);
    throw err;
  }
};

// Hold seats
export const holdSeats = async (show_id, seat_ids, user_id, user_email) => {
  try {
    const res = await axios.post(`${API_URL}/hold`, {
      show_id,
      seat_ids,
      user_id,
      user_email, // pass user email to backend for confirmation
    });
    return res.data;
  } catch (err) {
    console.error("Error holding seats:", err);
    throw err;
  }
};

// Confirm held seats
export const confirmHold = async (reservation_id, user_email) => {
  try {
    const res = await axios.post(`${API_URL}/confirm`, {
      reservation_id,
      user_email, // pass user email to backend for confirmation
    });
    return res.data;
  } catch (err) {
    console.error("Error confirming reservation:", err);
    throw err;
  }
};

// Optional: login/signup functions for Supabase Auth or custom backend
export const loginUser = async (email, password) => {
  const res = await axios.post(`${API_URL}/auth/login`, { email, password });
  return res.data;
};

export const signupUser = async (email, password) => {
  const res = await axios.post(`${API_URL}/auth/signup`, { email, password });
  return res.data;
};
