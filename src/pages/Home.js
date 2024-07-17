import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VideoCard from '../components/VideoCard';
import './App.css'; // Importa el CSS

const Home = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/videos')
      .then(response => {
        setVideos(response.data);
      })
      .catch(error => {
        console.error('Error fetching videos:', error);
      });
  }, []);

  return (
    <div className="home">
      <header>
        <h1>ALURAFILX</h1>
        <nav>
          <button onClick={() => window.location.href = '/'}>Home</button>
          <button onClick={() => window.location.href = '/new'}>Nuevo Video</button>
        </nav>
      </header>
      <div className="video-section">
        {videos.map(video => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default Home;
