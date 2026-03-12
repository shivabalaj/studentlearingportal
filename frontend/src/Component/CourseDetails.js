import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import VideoLearningPage from "./VideoLearningPage";

function CourseDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const course = location.state?.course;
  
  // Check if user is logged in
  const isLoggedIn = localStorage.getItem("token") !== null;
  
  if (!course) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>No course selected</h2>
        <button onClick={() => navigate('/')}>Back to Courses</button>
      </div>
    );
  }

  return (
    <>
      <NavBar />
      <div style={{ padding: '20px' }}>
        <button 
          onClick={() => navigate(-1)} 
          style={{ marginBottom: '20px', padding: '8px 16px', cursor: 'pointer' }}
        >
          ← Back
        </button>
        
        <div style={{ 
          border: '2px solid blue', 
          padding: '20px',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          <h1 style={{ color: 'blue' }}>{course.courseName}</h1>
          
          <div style={{ marginTop: '20px' }}>
            <p><strong>Trainer:</strong> {course.trainer}</p>
            <p><strong>Price:</strong> {course.price}</p>
          </div>
          
          <button 
            onClick={() => navigate('/')}
            style={{ 
              marginTop: '20px', 
              padding: '10px 20px',
              backgroundColor: 'blue',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Back to All Courses
          </button>
        </div>
        
        {/* Video playback section - only accessible if logged in */}
        <div style={{ marginTop: '30px' }}>
          {isLoggedIn ? (
            <VideoLearningPage course={course} />
          ) : (
            <div style={{ 
              textAlign: 'center', 
              padding: '40px', 
              backgroundColor: '#f5f5f5',
              borderRadius: '8px',
              border: '2px solid #ddd'
            }}>
              <h2 style={{ color: '#666' }}>Login Required</h2>
              <p style={{ fontSize: '18px', color: '#666' }}>
                Please login to watch the course videos.
              </p>
              <div style={{ marginTop: '20px' }}>
                <button 
                  onClick={() => navigate('/login')}
                  style={{ 
                    padding: '12px 30px',
                    backgroundColor: 'blue',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    marginRight: '10px'
                  }}
                >
                  Login
                </button>
                <button 
                  onClick={() => navigate('/signup')}
                  style={{ 
                    padding: '12px 30px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '16px'
                  }}
                >
                  Sign Up
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CourseDetails;
