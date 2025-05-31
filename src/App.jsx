import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaFileAlt, FaComments, FaBullhorn, FaImages, FaInfoCircle, FaBars, FaTimes } from 'react-icons/fa';
import { useState } from 'react';

// Import pages
import Home from './pages/Home';
import About from './pages/About';
import Notes from './pages/Notes';
import Chat from './pages/Chat';
import Notices from './pages/Notices';
import Gallery from './pages/Gallery';

import './App.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', name: 'Home', icon: <FaHome /> },
    { path: '/notes', name: 'Notes', icon: <FaFileAlt /> },
    { path: '/chat', name: 'Chat', icon: <FaComments /> },
    { path: '/notices', name: 'Notices', icon: <FaBullhorn /> },
    { path: '/gallery', name: 'Gallery', icon: <FaImages /> },
    { path: '/about', name: 'About', icon: <FaInfoCircle /> }
  ];

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          DTU MSc Physics
        </Link>
        
        <div className={`nav-menu ${isOpen ? 'active' : ''}`}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
        
        <div className="nav-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter basename="/college-hub">
      {/* 👆 Add basename to match your GitHub Pages repo */}
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/notices" element={<Notices />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <footer className="footer">
          <p>&copy; 2025 DTU MSc Physics Hub. All rights reserved.</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
