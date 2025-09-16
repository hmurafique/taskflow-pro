import { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const [form, setForm] = useState({ username: '', password: '' });
  const onSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE || 'http://localhost:5000'}/api/auth/register`, form);
      alert('Registered — please login');
      window.location.href = '/login';
    } catch (err) {
      alert(err?.response?.data?.error || 'Register failed');
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <h2>Register</h2>
      <input placeholder="username" onChange={e => setForm({ ...form, username: e.target.value })} />
      <input type="password" placeholder="password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button type="submit">Register</button>
    </form>
  );
}
