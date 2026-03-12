import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import './AdminVideos.css';

function AdminVideos() {
  const { courseId } = useParams();
  const location = useLocation();
  const course = location.state?.course;
  const [videos, setVideos] = useState(course?.videos || []);
  const [loading, setLoading] = useState(!course);
  const [showForm, setShowForm] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    google_drive_file_id: '',
    duration: '',
    instructor: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');
    
    if (!token || userRole !== 'admin') {
      navigate('/admin-login');
      return;
    }

    if (!course && courseId) {
      fetchCourse();
    }
  }, [courseId, course, navigate]);

  const fetchCourse = async () => {
    try {
      const token = localStorage.getItem('token');
      const API_URL = process.env.REACT_APP_API_URL || '/api';
      
      const response = await fetch(`${API_URL}/admin/courses`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        const foundCourse = data.find(c => c._id === courseId);
        if (foundCourse) {
          setVideos(foundCourse.videos || []);
        }
      }
    } catch (error) {
      console.error('Error fetching course:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const API_URL = process.env.REACT_APP_API_URL || '/api';
      
      if (editingVideo) {
        // Update video
        const response = await fetch(
          `${API_URL}/admin/courses/${courseId}/videos/${editingVideo._id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(formData)
          }
        );

        if (response.ok) {
          const updatedCourse = await response.json();
          setVideos(updatedCourse.videos || []);
        }
      } else {
        // Add new video
        const response = await fetch(
          `${API_URL}/admin/courses/${courseId}/videos`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(formData)
          }
        );

        if (response.ok) {
          const updatedCourse = await response.json();
          setVideos(updatedCourse.videos || []);
        }
      }
      resetForm();
    } catch (error) {
      console.error('Error saving video:', error);
    }
  };

  const handleEdit = (video) => {
    setEditingVideo(video);
    setFormData({
      title: video.title,
      description: video.description,
      google_drive_file_id: video.google_drive_file_id,
      duration: video.duration,
      instructor: video.instructor
    });
    setShowForm(true);
  };

  const handleDelete = async (videoId) => {
    if (!window.confirm('Are you sure you want to delete this video?')) return;
    
    try {
      const token = localStorage.getItem('token');
      const API_URL = process.env.REACT_APP_API_URL || '/api';
      
      const response = await fetch(
        `${API_URL}/admin/courses/${courseId}/videos/${videoId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.ok) {
        const updatedCourse = await response.json();
        setVideos(updatedCourse.course?.videos || []);
      }
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingVideo(null);
    setFormData({
      title: '',
      description: '',
      google_drive_file_id: '',
      duration: '',
      instructor: ''
    });
  };

  if (loading) {
    return <div className="admin-loading">Loading videos...</div>;
  }

  return (
    <div className="admin-videos">
      <div className="video-header">
        <button className="back-button" onClick={() => navigate('/admin/courses')}>
          ← Back to Courses
        </button>
        <h1>Video Management - {course?.courseName}</h1>
      </div>
      
      <button className="add-button" onClick={() => setShowForm(true)}>
        + Add New Video
      </button>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{editingVideo ? 'Edit Video' : 'Add New Video'}</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                placeholder="Video Title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
              <textarea
                name="description"
                placeholder="Video Description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                required
              />
              <input
                type="text"
                name="google_drive_file_id"
                placeholder="Google Drive File ID"
                value={formData.google_drive_file_id}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="duration"
                placeholder="Duration (e.g., 45:30)"
                value={formData.duration}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="instructor"
                placeholder="Instructor Name"
                value={formData.instructor}
                onChange={handleInputChange}
                required
              />
              <div className="form-buttons">
                <button type="submit" className="save-button">
                  {editingVideo ? 'Update' : 'Save'}
                </button>
                <button type="button" className="cancel-button" onClick={resetForm}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="videos-list">
        {videos.map(video => (
          <div key={video._id} className="video-card">
            <div className="video-info">
              <h3>{video.title}</h3>
              <p className="video-description">{video.description}</p>
              <div className="video-meta">
                <span>👤 {video.instructor}</span>
                <span>⏱ {video.duration}</span>
                <span>👁 {video.views || 0} views</span>
              </div>
            </div>
            <div className="video-actions">
              <button onClick={() => handleEdit(video)} className="edit-btn">Edit</button>
              <button onClick={() => handleDelete(video._id)} className="delete-btn">Delete</button>
            </div>
          </div>
        ))}
        {videos.length === 0 && (
          <p className="no-data">No videos found. Add your first video!</p>
        )}
      </div>
    </div>
  );
}

export default AdminVideos;

