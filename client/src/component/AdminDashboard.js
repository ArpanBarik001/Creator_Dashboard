import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');


  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchData = async () => {
      try {
        const res = await axios.get("https://creator-dashboard-server.onrender.com/auth/current", {
          headers: {
            Authorization: `${token}`
          }
        });
        setUsers(res.data);
      } catch (err) {
        setError("Failed to load user data");
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard - User Activity</h2>
      {error && <p className="error">{error}</p>}

      {users.map((user) => (
        <div key={user._id} className="user-card">
          <h3>{user.name} ({user.email})</h3>
          <p><strong>Credits:</strong> {user.credits}</p>

          <div className="section">
            <h4>Saved Posts:</h4>
            {user.savedPosts?.length > 0 ? (
              user.savedPosts.map((post, i) => (
                <p key={i}>
                  <a href={`https://reddit.com${post.permalink}`} target="_blank" rel="noopener noreferrer">
                    {post.title}
                  </a>
                </p>
              ))
            ) : <p>No saved posts.</p>}
          </div>

          <div className="section">
            <h4>Reported Posts:</h4>
            {user.reportedPosts?.length > 0 ? (
              user.reportedPosts.map((post, i) => (
                <p key={i}>
                  <a href={`https://reddit.com${post.permalink}`} target="_blank" rel="noopener noreferrer">
                    {post.title}
                  </a>
                </p>
              ))
            ) : <p>No reported posts.</p>}
          </div>

          <hr />
        </div>
      ))}
    </div>
  );
}
