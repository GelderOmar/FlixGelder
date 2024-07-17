import React, { useState } from 'react';
import axios from 'axios';
import './VideoCard.css'; // Asegúrate de que este archivo CSS esté en el lugar correcto

const VideoCard = ({ video }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableFields, setEditableFields] = useState({
    title: video.title,
    category: video.category,
    image: video.image,
    video: video.video,
    description: video.description
  });

  const handleDelete = () => {
    axios.delete(`http://localhost:5000/videos/${video.id}`)
      .then(response => {
        alert('Video deleted successfully');
        window.location.reload();
      })
      .catch(error => {
        console.error('Error deleting video:', error);
      });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCloseModal = () => {
    setIsEditing(false);
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setEditableFields(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleUpdate = () => {
    const updatedVideo = {
      ...video,
      title: editableFields.title,
      category: editableFields.category,
      image: editableFields.image,
      video: editableFields.video,
      description: editableFields.description
    };

    axios.put(`http://localhost:5000/videos/${video.id}`, updatedVideo)
      .then(response => {
        alert('Video updated successfully');
        setIsEditing(false);
        window.location.reload();
      })
      .catch(error => {
        console.error('Error updating video:', error);
      });
  };

  return (
    <div className="video-card-container">
      <h3>{video.title}</h3>
      <p>{video.description}</p>
      <img src={video.image} alt={video.title} className="video-card-image" />
      <div className="video-card-button-container">
        <button className="video-card-btn-delete" onClick={handleDelete}>Eliminar</button>
        <button className="video-card-btn-edit" onClick={handleEdit}>Editar</button>
      </div>

      {isEditing && (
        <div className="video-card-modal-overlay">
          <div className="video-card-modal-content">
            <span className="video-card-modal-close" onClick={handleCloseModal}>&times;</span>
            <h2>Editar Video</h2>
            <input type="text" name="title" value={editableFields.title} onChange={handleFieldChange} placeholder="Título" />
            <input type="text" name="category" value={editableFields.category} onChange={handleFieldChange} placeholder="Categoría" />
            <input type="text" name="image" value={editableFields.image} onChange={handleFieldChange} placeholder="Imagen" />
            <input type="text" name="video" value={editableFields.video} onChange={handleFieldChange} placeholder="Video" />
            <textarea name="description" value={editableFields.description} onChange={handleFieldChange} placeholder="Descripción"></textarea>
            <button onClick={handleUpdate}>Actualizar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCard;
