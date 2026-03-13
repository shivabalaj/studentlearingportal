import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Login from './Component/login';
import Signup from './Component/signup';
import Contact from './signin';
import CourseDetails from './Component/CourseDetails';
import Services from './services';
import AdminDashboard from './adminpannel/AdminDashboard';
import AdminCourses from './adminpannel/AdminCourses';
import AdminVideos from './adminpannel/AdminVideos';
import AdminUsers from './adminpannel/AdminUsers';
import AdminLogin from './adminpannel/AdminLogin';
import Cards from './cards/cards';
import About from './Component/About';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={
            <div className="container my-5">
              <h1 className="display-4 fw-bold text-center mb-5">
                Welcome to Student Learning Portal
              </h1>
              <Cards />
            </div>
          } />
          <Route path="about" element={<About />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Contact />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/CourseDetails" element={<CourseDetails />} />
        <Route path="/services" element={<Services/>}/>
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/courses" element={<AdminCourses />} />
        <Route path="/admin/courses/:courseId/videos" element={<AdminVideos />} />
        <Route path="/admin/users" element={<AdminUsers />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more about https://bit.ly/CRA-vitals
reportWebVitals();

