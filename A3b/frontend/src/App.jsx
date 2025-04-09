import { useEffect, useState } from 'react';

const API = 'http://localhost:5000/api';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await fetch(`${API}/users`);
    const data = await res.json();
    setUsers(data);
  };

  const register = async () => {
    const res = await fetch(`${API}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    alert((await res.json()).message);
    fetchUsers();
  };

  const login = async () => {
    const res = await fetch(`${API}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    alert((await res.json()).message);
  };

  const deleteUser = async (username) => {
    await fetch(`${API}/user/${username}`, { method: 'DELETE' });
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center mb-6 text-blue-600">User Authentication</h2>
        <input
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <div className="flex justify-between mb-6">
          <button onClick={register} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Register
          </button>
          <button onClick={login} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Login
          </button>
        </div>

        <h3 className="text-lg font-medium mb-2">All Users</h3>
        <ul className="space-y-2">
          {users.map(u => (
            <li key={u.username} className="flex justify-between items-center bg-gray-50 p-2 rounded border">
              {u.username}
              <button
                onClick={() => deleteUser(u.username)}
                className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
