import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminCourses.css';

function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState({
    courseName: '',
    trainer: '',
    price: '',
    level: 'Beginner',
    thumbnail: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');
    
    if (!token || userRole !== 'admin') {
      navigate('/admin-login');
      return;
    }

    fetchCourses();
  }, [navigate]);

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem('token');
      // Use explicit backend URL since proxy might not work
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      
      const response = await fetch(`${API_URL}/api/admin/courses`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Courses response:', data);
        setCourses(data);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
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
      const API_URL = process.env.REACT_APP_API_URL || '';
      
      const courseId = editingCourse ? (editingCourse._id || editingCourse.id) : '';
      const url = courseId 
        ? `${API_URL}/api/admin/courses/${courseId}`
        : `${API_URL}/api/admin/courses`;
      
      const method = courseId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        fetchCourses();
        resetForm();
      }
    } catch (error) {
      console.error('Error saving course:', error);
    }
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setFormData({
      courseName: course.courseName,
      trainer: course.trainer,
      price: course.price,
      level: course.level,
      thumbnail: course.thumbnail
    });
    setShowForm(true);
  };

  const handleDelete = async (courseId) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    
    try {
      const token = localStorage.getItem('token');
      const API_URL = process.env.REACT_APP_API_URL || '';
      
      const response = await fetch(`${API_URL}/api/admin/courses/${courseId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchCourses();
      }
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingCourse(null);
    setFormData({
      courseName: '',
      trainer: '',
      price: '',
      level: 'Beginner',
      thumbnail: ''
    });
  };

  if (loading) {
    return <div className="admin-loading">Loading courses...</div>;
  }

  return (
<div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h2 mb-0">Course Management</h1>
        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#courseModal" onClick={() => {
          resetForm();
          setEditingCourse(null);
        }}>
          <i className="bi bi-plus-circle me-2"></i>Add New Course
        </button>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Course Name</th>
                  <th>Trainer</th>
                  <th>Price</th>
                  <th>Level</th>
                  <th>Videos</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map(course => (
                  <tr key={course._id || course.id}>
                    <td>{course.courseName}</td>
                    <td>{course.trainer}</td>
                    <td><span className="badge bg-success">{course.price}</span></td>
                    <td><span className="badge bg-info">{course.level}</span></td>
                    <td><span className="badge bg-warning">{course.videos?.length || 0}</span></td>
                    <td>
                      <div className="btn-group" role="group">
                        <button className="btn btn-outline-primary btn-sm" onClick={() => handleEdit(course)} data-bs-toggle="modal" data-bs-target="#courseModal">
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button className="btn btn-outline-info btn-sm" onClick={() => navigate(`/admin/courses/${course._id || course.id}/videos`, { state: { course } })}>
                          <i className="bi bi-play-circle"></i> Videos
                        </button>
                        <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(course._id || course.id)}>
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {courses.length === 0 && (
              <div className="text-center py-5">
                <i className="bi bi-inbox display-1 text-muted mb-3"></i>
                <p className="text-muted">No courses found. <button className="btn btn-link p-0" onClick={() => {
                  resetForm();
                  setEditingCourse(null);
                }} data-bs-toggle="modal" data-bs-target="#courseModal">Add your first course!</button></p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bootstrap Modal */}
      <div className="modal fade" id="courseModal" tabIndex="-1">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{editingCourse ? 'Edit Course' : 'Add New Course'}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={resetForm}></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Course Name</label>
                    <input className="form-control" type="text" name="courseName" placeholder="Course Name" value={formData.courseName} onChange={handleInputChange} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Trainer</label>
                    <input className="form-control" type="text" name="trainer" placeholder="Trainer Name" value={formData.trainer} onChange={handleInputChange} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Price</label>
                    <input className="form-control" type="text" name="price" placeholder="$99" value={formData.price} onChange={handleInputChange} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Level</label>
                    <select className="form-select" name="level" value={formData.level} onChange={handleInputChange}>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="form-label">Thumbnail URL</label>
                    <input className="form-control" type="url" name="thumbnail" placeholder="https://example.com/thumbnail.jpg" value={formData.thumbnail} onChange={handleInputChange} required />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={resetForm}>Cancel</button>
                <button type="submit" className="btn btn-primary">
                  {editingCourse ? 'Update Course' : 'Add Course'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminCourses;

