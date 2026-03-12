import React, { useState, useEffect } from 'react';
import './VideoLearningPage.css';

const VideoLearningPage = ({ course }) => {
  const [courseVideos, setCourseVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get videos from the course object
  useEffect(() => {
    if (course && course.videos) {
      setCourseVideos(course.videos);
      // Set first video as default selected
      if (course.videos.length > 0) {
        setSelectedVideo(course.videos[0]);
      }
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [course]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading videos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-icon"></div>
        <h2>Oops! Something went wrong</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="retry-btn">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="video-learning-page">
      {selectedVideo && (
        <div className="video-player-container">
          <h2 className="video-title">{selectedVideo.title}</h2>
          <div className="video-wrapper">
            <iframe
              src={`https://drive.google.com/file/d/${selectedVideo.google_drive_file_id}/preview`}
              className="video-iframe"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title={selectedVideo.title}
            ></iframe>
          </div>
          
          <div className="video-info">
            <div className="video-meta">
              <span className="instructor">{selectedVideo.instructor}</span>
              <span className="duration">{selectedVideo.duration}</span>
              <span className="views">{selectedVideo.views.toLocaleString()} views</span>
            </div>
            <p className="video-description">{selectedVideo.description}</p>
          </div>
        </div>
      )}

      {course && courseVideos.length > 0 && (
        <div className="video-list-container">
          <h3 className="list-title">Course Videos ({courseVideos.length})</h3>
          <div className="video-list">
            {courseVideos.map((video) => (
              <div 
                key={video.videoId} 
                className={`video-list-item ${selectedVideo?.videoId === video.videoId ? 'active' : ''}`}
                onClick={() => setSelectedVideo(video)}
              >
                <div className="video-list-thumbnail">
                  <div className="thumbnail-placeholder">
                  </div>
                  <span className="video-list-duration">{video.duration}</span>
                </div>
                <div className="video-list-details">
                  <h4 className="video-list-title">{video.title}</h4>
                  <p className="video-list-instructor">{video.instructor}</p>
                  <div className="video-list-meta">
                    <span className="video-list-views">{video.views.toLocaleString()} views</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoLearningPage;
