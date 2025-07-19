import React, { useState, useEffect } from 'react';

function App() {
  const [name, setName] = useState('');
  const [users, setUsers] = useState([]);

  // Fetch users from backend
  const fetchUsers = async () => {
    const res = await fetch('http://localhost:5000/api/users');
    const data = await res.json();
    setUsers(data);
  };

  // Run on first load
  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) return;

    await fetch('http://localhost:5000/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });

    setName('');
    fetchUsers(); // refresh list
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h2>Simple MongoDB User Form</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: '0.5rem', marginRight: '0.5rem' }}
        />
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>
          Save
        </button>
      </form>

      <h3>Saved Users:</h3>
      <ul>
        {users.map((user) => (
          <li key={user._id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
