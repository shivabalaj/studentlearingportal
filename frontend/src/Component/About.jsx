import React from 'react';

const About = () => {
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-lg-8 mx-auto text-center">
          <h1 className="display-4 fw-bold mb-4">About Student Learning Portal</h1>
          <p className="lead mb-5">
            Empowering students worldwide with accessible, high-quality education through innovative online learning.
          </p>
        </div>
      </div>
      
      <div className="row g-5">
        <div className="col-lg-4">
          <div className="text-center">
            <i className="bi bi-book-half display-1 text-primary mb-3"></i>
            <h3 className="h4">Comprehensive Courses</h3>
            <p>Explore thousands of courses across various subjects, from beginner to advanced levels.</p>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="text-center">
            <i className="bi bi-play-circle display-1 text-success mb-3"></i>
            <h3 className="h4">Video Learning</h3>
            <p>Engage with interactive video content and hands-on learning experiences.</p>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="text-center">
            <i className="bi bi-people display-1 text-warning mb-3"></i>
            <h3 className="h4">Community</h3>
            <p>Join a global community of learners, educators, and professionals.</p>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-lg-6">
          <h3 className="mb-4">Our Mission</h3>
          <p>
            At Student Learning Portal, we believe education should be accessible to everyone, everywhere. 
            Our platform bridges the gap between traditional classroom learning and modern digital needs, 
            offering flexible, self-paced learning paths tailored to individual goals.
          </p>
        </div>
        <div className="col-lg-6">
          <h3 className="mb-4">Why Choose Us?</h3>
          <ul className="list-unstyled">
            <li className="mb-2"><i className="bi bi-check-circle text-success me-2"></i>Expert instructors</li>
            <li className="mb-2"><i className="bi bi-check-circle text-success me-2"></i>24/7 support</li>
            <li className="mb-2"><i className="bi bi-check-circle text-success me-2"></i>Certificates on completion</li>
            <li className="mb-2"><i className="bi bi-check-circle text-success me-2"></i>Progress tracking</li>
          </ul>
        </div>
      </div>

      <div className="text-center mt-5">
        <a href="/" className="btn btn-primary btn-lg">Get Started Today</a>
      </div>
    </div>
  );
};

export default About;

