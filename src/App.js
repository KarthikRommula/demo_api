import React, { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserData = async () => {
    if (!name.trim()) {
      setError('Please enter a name');
      return;
    }

    setLoading(true);
    setError(null);
    setUserData(null);

    try {
      const response = await fetch(
        `https://jtxlt2n1m9.execute-api.ap-south-1.amazonaws.com/Prod/users/${name}`
      );
      
      const data = await response.json();

      if (response.ok) {
        setUserData(data);
      } else {
        setError(data.error || 'Failed to fetch user data');
      }
    } catch (err) {
      setError('An error occurred while fetching data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>User Information</h1>

        <div className="search-container">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter user name"
            className="search-input"
          />
          <button
            onClick={fetchUserData}
            disabled={loading}
            className="search-button"
          >
            {loading ? 'Loading...' : 'Search'}
          </button>
        </div>

        {error && <p className="error-message">{error}</p>}

        {userData && (
          <div className="user-card">
            <h2>User Details</h2>
            <p>{userData.message}</p>
            {userData.company && <p><strong>Company:</strong> {userData.company}</p>}
            {userData.project && <p><strong>Project:</strong> {userData.project}</p>}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
