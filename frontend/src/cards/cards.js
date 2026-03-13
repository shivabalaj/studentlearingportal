import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./cards.css";

function Cards() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Hardcode prod backend for Render static site
    const API_URL = 'https://studentlearingportal-backend.onrender.com';
    fetch(`${API_URL}/api/courses`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "fetch failed");
        setLoading(false);
      });
  }, []);

  

  if (loading) {
    return <div className="cards-container">Loading courses...</div>;
  }

  if (error) {
    return <div className="cards-container">Error loading courses: {error}</div>;
  }

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold text-primary mb-3">
            Our Courses
          </h2>
          <p className="lead text-muted">Showing <strong>{courses.length}</strong> available courses</p>
        </div>
        <div className="row g-4">
          {courses.map((course) => (
            <div key={course.id || course._id} className="col-lg-6 col-xl-4">
              <div 
                className="card h-100 shadow-sm border-0 hover-lift cursor-pointer"
                style={{cursor: 'pointer'}}
                onClick={() => navigate('/CourseDetails', { state: { course } })}
              >
                {course.thumbnail && (
                  <img 
                    src={course.thumbnail} 
                    className="card-img-top" 
                    alt={course.courseName}
                    style={{height: '200px', objectFit: 'cover'}}
                  />
                )}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold text-primary mb-3">{course.courseName}</h5>
                  <p className="card-text flex-grow-1 mb-3">
                    <small className="text-muted d-block mb-2">
                      <i className="bi bi-person-circle me-2"></i>
                      Trainer: <strong>{course.trainer}</strong>
                    </small>
                  </p>
                  <div className="text-success fw-bold fs-4 mb-3">${course.price}</div>
                  <button className="btn btn-primary w-100 mt-auto">
                    View Course
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Cards;

