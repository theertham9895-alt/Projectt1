const API_URL = 'http://localhost:5000/api';

// Helper to get token
const getToken = () => localStorage.getItem('token');

// Helper for authenticated requests
const authHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${getToken()}`
});

// ========== AUTH ==========
export const loginUser = async (email, password) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (data.token) localStorage.setItem('token', data.token);
  return data;
};

export const registerUser = async (userData) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  return res.json();
};

// ========== EVENTS/ACTIVITIES ==========
export const getActivities = async () => {
  const res = await fetch(`${API_URL}/events`, {
    headers: authHeaders()
  });
  return res.json();
};

export const createActivity = async (eventData) => {
  const res = await fetch(`${API_URL}/events`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(eventData)
  });
  return res.json();
};

export const deleteActivity = async (id) => {
  const res = await fetch(`${API_URL}/events/${id}`, {
    method: 'DELETE',
    headers: authHeaders()
  });
  return res.json();
};

// ========== STUDENTS ==========
export const getStudents = async () => {
  const res = await fetch(`${API_URL}/students`, {
    headers: authHeaders()
  });
  return res.json();
};

export const getMyProfile = async () => {
  const res = await fetch(`${API_URL}/students/profile`, {
    headers: authHeaders()
  });
  return res.json();
};

export const getDashboard = async () => {
  const res = await fetch(`${API_URL}/students/dashboard`, {
    headers: authHeaders()
  });
  return res.json();
};

// ========== ATTENDANCE ==========
export const getMyAttendance = async () => {
  const res = await fetch(`${API_URL}/attendance/my`, {
    headers: authHeaders()
  });
  return res.json();
};

export const markAttendance = async (eventId, studentId, status) => {
  const res = await fetch(`${API_URL}/attendance/mark`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ eventId, studentId, status })
  });
  return res.json();
};