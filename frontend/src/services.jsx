import React, { useState, useEffect } from 'react';
import NavBar from "./Component/NavBar";
import "./Services.css";
import Cards from "./cards/cards";


function Services() {
   

    return (
        <>
            <NavBar />
            <div className="services-container">
                {/* Header Section with API Status */}
                <div className="services-header">
                    <h1 className="services-title">Our Services</h1>
                    <p className="services-subtitle">
                        Discover our wide range of educational services powered by real-time data
                    </p>
                    <div className="api-status">
                        <span className="status-dot"></span>
                        Live data from API
                    </div>
                    <Cards/>
                </div>
            </div>
        </>
    );
}

export default Services;