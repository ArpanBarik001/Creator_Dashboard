import React from 'react'
import axios from 'axios';
import { useState } from 'react';
// import { useEffect } from 'react';

export default function Post({post}) {
    const token = localStorage.getItem("token");
    // console.log(token);
//   const [credits, setCredits] = useState(0);
//   const [creditLog, setCreditLog] = useState([]);
  const [error, setError] = useState('');
//   const [message, setMessage] = useState('');

  const headers = {
    Authorization: `${token}`
  };
    const triggerAction = async (path) => {
        try {
          await axios.post(`http://localhost:5000/auth/earn/${path}`, {}, { headers });
        //   setMessage(res.data.message);
        alert("Earn credit succesfully +5");
        } catch (err) {
          setError("Action failed");
        }
      };
      console.log(error);
    const formatPost = (p) => ({
        postId: p.id,
        title: p.title,
        permalink: p.permalink,
        thumbnail: p.thumbnail,
        selftext: p.selftext,
      });
      
    const handleSave = async () => {
        try {
          await axios.post(
            "http://localhost:5000/auth/save-post",
            { post: formatPost(post) },
            { headers: { Authorization: `${token}` } }
          );
          alert("Post saved successfully");
        } catch (error) {
          alert(error.response?.data?.message || "Error saving post");
        }
      };
    
      const handleReport = async () => {
        try {
          await axios.post(
            "http://localhost:5000/auth/report-post",
            { post: formatPost(post) },
            { headers: { Authorization: `${token}` } }
          );
          alert("Post reported");
        } catch (error) {
          alert(error.response?.data?.message || "Error reporting post");
        }
      };
    const handleShare = () => {
        const url = `https://reddit.com${post.permalink}`;
        navigator.clipboard.writeText(url);
        alert("Post link copied to clipboard!");
      };
  return (
    <div>
      <div className="post">
        <h2>{post.title}</h2>
        <p>
            <strong>Author:</strong> {post.author}
        </p>
        <p>
            <strong>Score:</strong> {post.score}
        </p>
        <a href={`https://reddit.com${post.permalink}`} target='_blank' rel="noopener noreferrer">View Post</a>
        <div className="post-actions">
        <button onClick={() => {triggerAction("feed-interaction"); handleSave()}}>Save</button>
        <button onClick={() => {triggerAction("feed-interaction"); handleShare()}}>Share</button>
        <button onClick={() => {triggerAction("feed-interaction"); handleReport()}}>Report</button>
      </div>
      </div>
    </div>
  )
}
