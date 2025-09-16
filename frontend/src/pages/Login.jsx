import { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE || 'http://localhost:5000'}/api/auth/login`, form);
      localStorage.setItem('tf_token', res.data.token);
      alert('Login OK — token saved');
      window.location.href = '/';
    } catch (err) {
      alert(err?.response?.data?.error || 'Login failed');
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <h2>Login</h2>
      <input placeholder="username" onChange={e => setForm({ ...form, username: e.target.value })} />
      <input type="password" placeholder="password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button type="submit">Login</button>
    </form>
  );
}
