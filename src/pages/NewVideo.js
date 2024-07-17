import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Importa el CSS

const NewVideo = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [video, setVideo] = useState('');
  const [description, setDescription] = useState('');

  const handleSave = () => {
    const newVideo = { title, category, image, video, description };
    axios.post('http://localhost:5000/videos', newVideo)
      .then(response => {
        alert('Video added successfully');
        window.location.href = '/';
      })
      .catch(error => {
        console.error('Error adding video:', error);
      });
  };

  return (
    <div className="new-video">
      <header>
        <h1>ALURAFILX</h1>
        <nav>
          <button onClick={() => window.location.href = '/'}>Home</button>
          <button onClick={() => window.location.href = '/new'}>Nuevo Video</button>
        </nav>
      </header>
      <div className="form">
        <h2>Nuevo Video</h2>
        <input type="text" placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Seleccionar Categoría</option>
          <option value="Fútbol">Fútbol</option>
          <option value="Tecnología">Tecnología</option>
          <option value="Naturaleza">Naturaleza</option>
          <option value="Streamer">Streamer</option>
        </select>
        <input type="text" placeholder="Imagen" value={image} onChange={(e) => setImage(e.target.value)} />
        <input type="text" placeholder="Video" value={video} onChange={(e) => setVideo(e.target.value)} />
        <textarea placeholder="Descripción" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        <button onClick={handleSave}>Guardar</button>
      </div>
    </div>
  );
};

export default NewVideo;
