import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Post from './Post.js';
export default function Dashboard() {
    // const token=localStorage.getItem("token");
    const[subreddit, setSubReddit]=useState("");
    const [Error, setError]=useState("");
    const [loading, setLoading]=useState(false);
    const[debounceTimer, setDebounceTimer]=useState(null);
    const [posts, setPosts]=useState([]);

    const navigate=useNavigate();

    // console.log(posts);
    const fetchPosts=async(subredditName)=>{
        if(!subredditName || subredditName.trim()===""){
            setError("Subreddit name cannot be empty");
            return;
        }
        setLoading(true);
        setError("");
        setPosts([]);
        try{
            const response=await axios.get(`https://www.reddit.com/r/${subredditName}/top.json?limit=10`)
            const fetchedPosts=response.data.data.children.map((post)=>post.data);
            setPosts(fetchedPosts);
        }catch(error){
            console.log("Failed to fetch post");
        }finally{
            setLoading(false)
        }
    }
    const handleInputChange = (e) => {
      const value = e.target.value;
      setSubReddit(value);
  
      // Clear previous timer
      if (debounceTimer) clearTimeout(debounceTimer);
  
      // Set new timer
      const timer = setTimeout(() => {
        if (value.trim().length > 3) {
          fetchPosts(value);
        }
      }, 700); // Wait 700ms after user stops typing
  
      setDebounceTimer(timer);
    };

    // useEffect(()=>{
    //   if(subreddit){
    //     fetchPosts(subreddit);
    //   }
        
    // },[subreddit]);

    const handlelogout=()=>{
        localStorage.removeItem("token");
        navigate("/login")
    }
    const handleDashboardClick = () => {
        const role = localStorage.getItem('userRole'); // Read stored role
        if (role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/activity');
        }
      };

  return (
    <div>
      <nav>
        <button onClick={handleDashboardClick}className='logo'>
            Creater-Dashboard
        </button>
      <div className='dashboard'>
      <button onClick={handlelogout}>Logout</button>
        </div>
      </nav>

        <div className="reddit-feed-container">
            <h1>Reddit Feed Reader</h1>
            <div className="search-bar">
                <input type="text"
                value={subreddit}
                onChange={handleInputChange}
                placeholder='Enter Subreddit name'
                />

                <button onClick={()=>fetchPosts(subreddit)}>Fetch Posts</button>
            </div>
            {loading && <p className='loading'>Loading Posts</p>}
            {Error && <p className='error'>{Error}</p>}

            <div className="posts">
                {
                    posts.length>0 ? (
                        posts.map((post)=><Post key={post.id} post={post}/>)
                    ):(
                        !loading && <p>No post to display</p>
                    )
                }
            </div>
        </div>



    </div>
  )
}
