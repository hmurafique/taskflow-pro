import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem('tf_token');

  useEffect(() => {
    if (!token) return;
    axios.get(`${import.meta.env.VITE_API_BASE || 'http://localhost:5000'}/api/tasks`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(r => setTasks(r.data)).catch(() => {});
  }, [token]);

  const create = async () => {
    const t = prompt('Task title');
    if (!t) return;
    await axios.post(`${import.meta.env.VITE_API_BASE || 'http://localhost:5000'}/api/tasks`, { title: t }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    window.location.reload();
  };

  return (
    <div>
      <h2>Dashboard</h2>
      {token ? (
        <>
          <button onClick={create}>Create Task</button>
          <ul>
            {tasks.map(t => <li key={t._id}><b>{t.title}</b> — {t.status}</li>)}
          </ul>
        </>
      ) : (
        <p>Please login to see tasks.</p>
      )}
    </div>
  );
}
