import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Activity() {
    const [savedPosts, setSavedPosts] = useState([]);
  const [reportedPosts, setReportedPosts] = useState([]);
  const [error, setError] = useState("");
  const [credits, setCredits] = useState(0);
  const [creditLog, setCreditLog] = useState([]);
  useEffect(() => {
  const token = localStorage.getItem("token");
  const fetchPosts = async () => {
    try {
      const savedRes = await axios.get("https://creator-dashboard-server.onrender.com/auth/saved-posts", {
        headers: { Authorization: `${token}` },
      });

      const reportedRes = await axios.get("https://creator-dashboard-server.onrender.com/auth/reported-posts", {
        headers: { Authorization: `${token}` },
      });

      setSavedPosts(savedRes.data);
      setReportedPosts(reportedRes.data);
    } catch (err) {
      setError("Failed to load posts");
      console.error(err);
    }
  };

  const headers = {
    Authorization: `${token}`
  };

  const fetchCredits = async () => {
    try {
      const res = await axios.get("https://creator-dashboard-server.onrender.com/auth/credits", { headers });
      setCredits(res.data.credits);
      setCreditLog(res.data.creditLog);
    } catch (err) {
      setError("Failed to load credit data");
    }
  };

    fetchPosts();
    fetchCredits();
  }, []);
  return (
    <div className="user-posts">
    <h2>Saved Posts</h2>
    {savedPosts.length > 0 ? (
      savedPosts.map((post) => (
        <div key={post.postId} className="post-card">
          <h4>{post.title}</h4>
          <a
            href={`https://reddit.com${post.permalink}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on Reddit
          </a>
        </div>
      ))
    ) : (
      <p>No saved posts</p>
    )}

    <h2>Reported Posts</h2>
    {reportedPosts.length > 0 ? (
      reportedPosts.map((post) => (
        <div key={post.postId} className="post-card">
          <h4>{post.title}</h4>
          <a
            href={`https://reddit.com${post.permalink}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on Reddit
          </a>
        </div>
      ))
    ) : (
      <p>No reported posts</p>
    )}

    {error && <p className="error">{error}</p>}

    <h2>🎯 Credit Points</h2>
    <p><strong>Total Credits:</strong> {credits}</p>

    <h3>📜 Credit History</h3>
      {creditLog.length > 0 ? (
        <ul>
          {creditLog.map((log, index) => (
            <li key={index}>
              {log.reason} — +{log.points} points on {new Date(log.date).toLocaleDateString()}
            </li>
          ))}
        </ul>
      ) : (
        <p>No activity yet.</p>
      )}

  </div>
  )
}
