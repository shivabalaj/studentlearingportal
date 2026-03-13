import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-5 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 mb-4">
            <h5 className="fw-bold mb-3">Student Learning Portal</h5>
            <p className="text-light-50">
              Your gateway to quality education. Learn anytime, anywhere with our comprehensive courses and video content.
            </p>
          </div>
          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="fw-bold mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-light-50 text-decoration-none">Home</Link></li>
              <li><Link to="/about" className="text-light-50 text-decoration-none">About</Link></li>
              <li><Link to="/services" className="text-light-50 text-decoration-none">Services</Link></li>
              <li><Link to="/contact" className="text-light-50 text-decoration-none">Contact</Link></li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 mb-4">
            <h6 className="fw-bold mb-3">Account</h6>
            <ul className="list-unstyled">
              <li><Link to="/login" className="text-light-50 text-decoration-none">Login</Link></li>
              <li><Link to="/signup" className="text-light-50 text-decoration-none">Sign Up</Link></li>
              <li><Link to="/profile" className="text-light-50 text-decoration-none">Profile</Link></li>
            </ul>
          </div>
          <div className="col-lg-3 mb-4">
            <h6 className="fw-bold mb-3">Connect</h6>
            <div>
              <a href="https://facebook.com" className="text-light-50 me-3" aria-label="Facebook"><i className="bi bi-facebook fs-4"></i></a>
              <a href="https://twitter.com" className="text-light-50 me-3" aria-label="Twitter"><i className="bi bi-twitter fs-4"></i></a>
              <a href="https://linkedin.com" className="text-light-50 me-3" aria-label="LinkedIn"><i className="bi bi-linkedin fs-4"></i></a>
              <a href="https://youtube.com" className="text-light-50" aria-label="YouTube"><i className="bi bi-youtube fs-4"></i></a>
            </div>
          </div>
        </div>
        <hr className="my-4" />
        <div className="row align-items-center">
          <div className="col-md-6">
            <p className="mb-0">&copy; 2024 Student Learning Portal. All rights reserved.</p>
          </div>
          <div className="col-md-6 text-md-end">
            <Link to="/privacy" className="text-light-50 me-3 text-decoration-none">Privacy Policy</Link>
            <Link to="/terms" className="text-light-50 text-decoration-none">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

