'use client';
import { useState } from 'react';
import axios from 'axios';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('technician');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/signup', { username, password, role });
      alert('User created successfully');
    } catch (error) {
      alert('Error creating user');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full p-2 border rounded"
      >
        <option value="technician">Technician</option>
        <option value="engineer">Engineer</option>
        <option value="manager">Manager</option>
      </select>
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Sign Up</button>
    </form>
  );
}