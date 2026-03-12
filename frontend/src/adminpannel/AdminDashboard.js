import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

function AdminDashboard() {
  const [stats, setStats] = useState({ totalUsers: 0, totalCourses: 0, totalVideos: 0 });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');
    
    if (!token || userRole !== 'admin') {
      navigate('/admin-login');
      return;
    }

    fetchStats();
  }, [navigate]);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      // Use explicit backend URL since proxy might not work
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      
      const response = await fetch(`${API_URL}/api/admin/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Stats response:', data);
        setStats(data);
      } else {
        console.error('Stats response not ok:', response.status);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="admin-loading">Loading dashboard...</div>;
  }

  return (
    <div className="container-fluid py-5 bg-light min-vh-100">
      <div className="row mb-5">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="display-4 fw-bold mb-1">
                <i className="bi bi-speedometer2 text-primary me-3 fs-1"></i>
                Admin Dashboard
              </h1>
              <p className="lead text-muted mb-0">Welcome back! Manage your learning platform</p>
            </div>
            <div className="dropdown">
              <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                Actions
              </button>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="/admin/users">Manage Users</a></li>
                <li><a className="dropdown-item" href="/admin/courses">Manage Courses</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row g-4 mb-5">
        <div className="col-xl-4 col-md-6">
          <div className="card border-start border-primary border-4 shadow-lg h-100 hover-shadow">
            <div className="card-body p-4">
              <div className="row align-items-center">
                <div className="col">
                  <div className="text-primary mb-1">
                    <i className="bi bi-people-fill fa-2x"></i>
                  </div>
                  <h2 className="mb-0 fw-bold text-gray-800">{stats.totalUsers}</h2>
                  <p className="text-muted mb-0">Total Users</p>
                </div>
                <div className="col-auto">
                  <div className="bg-primary rounded-circle p-3">
                    <i className="bi bi-people text-white fa-2x"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer bg-transparent border-0">
              <a href="/admin/users" className="small text-decoration-none fw-bold text-primary">
                View Details <i className="bi bi-arrow-right ms-1"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="col-xl-4 col-md-6">
          <div className="card border-start border-success border-4 shadow-lg h-100 hover-shadow">
            <div className="card-body p-4">
              <div className="row align-items-center">
                <div className="col">
                  <div className="text-success mb-1">
                    <i className="bi bi-book-fill fa-2x"></i>
                  </div>
                  <h2 className="mb-0 fw-bold text-gray-800">{stats.totalCourses}</h2>
                  <p className="text-muted mb-0">Total Courses</p>
                </div>
                <div className="col-auto">
                  <div className="bg-success rounded-circle p-3">
                    <i className="bi bi-book text-white fa-2x"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer bg-transparent border-0">
              <a href="/admin/courses" className="small text-decoration-none fw-bold text-success">
                Manage Courses <i className="bi bi-arrow-right ms-1"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="col-xl-4 col-md-6">
          <div className="card border-start border-info border-4 shadow-lg h-100 hover-shadow">
            <div className="card-body p-4">
              <div className="row align-items-center">
                <div className="col">
                  <div className="text-info mb-1">
                    <i className="bi bi-play-circle-fill fa-2x"></i>
                  </div>
                  <h2 className="mb-0 fw-bold text-gray-800">{stats.totalVideos}</h2>
                  <p className="text-muted mb-0">Total Videos</p>
                </div>
                <div className="col-auto">
                  <div className="bg-info rounded-circle p-3">
                    <i className="bi bi-play-circle text-white fa-2x"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer bg-transparent border-0">
              <a href="/admin/courses" className="small text-decoration-none fw-bold text-info">
                View Videos <i className="bi bi-arrow-right ms-1"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8">
          <div className="card shadow-lg">
            <div className="card-header bg-gradient-primary text-white border-0 py-3">
              <h5 className="mb-0 fw-bold">
                <i className="bi bi-lightning-charge me-2"></i>
                Quick Actions
              </h5>
            </div>
            <div className="card-body py-4">
              <div className="row g-3">
                <div className="col-md-6">
                  <a href="/admin/courses" className="btn btn-primary btn-lg w-100 h-100 shadow-sm">
                    <i className="bi bi-book-half me-2"></i>
                    Courses & Videos
                  </a>
                </div>
                <div className="col-md-6">
                  <a href="/admin/users" className="btn btn-success btn-lg w-100 h-100 shadow-sm">
                    <i className="bi bi-person-lines-fill me-2"></i>
                    User Management
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card shadow">
            <div className="card-header bg-transparent">
              <h6 className="mb-0 fw-bold">Platform Status</h6>
            </div>
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="bg-success rounded-circle p-2 me-3">
                  <i className="bi bi-check-circle-fill text-white"></i>
                </div>
                <div>
                  <h6 className="mb-0">Backend Running</h6>
                  <small className="text-success">Port 5000 ✓</small>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div className="bg-primary rounded-circle p-2 me-3">
                  <i className="bi bi-database-fill text-white"></i>
                </div>
                <div>
                  <h6 className="mb-0">MongoDB Connected</h6>
                  <small className="text-primary">4 Courses ✓</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

