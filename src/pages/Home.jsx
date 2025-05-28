import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaFileAlt, FaComments, FaBullhorn, FaImages, FaGraduationCap, FaUsers } from 'react-icons/fa';

const Home = () => {
  const features = [
    {
      icon: <FaFileAlt />,
      title: 'Notes & Documents',
      description: 'Upload, download, and share study materials, PDFs, and documents with your classmates.',
      link: '/notes',
      color: '#3498db'
    },
    {
      icon: <FaComments />,
      title: 'Group Discussions',
      description: 'Join group chats and discussions with fellow MSc Physics students.',
      link: '/chat',
      color: '#2ecc71'
    },
    {
      icon: <FaBullhorn />,
      title: 'Official Notices',
      description: 'Stay updated with exam dates, important announcements, and university notices.',
      link: '/notices',
      color: '#e74c3c'
    },
    {
      icon: <FaImages />,
      title: 'Image Gallery',
      description: 'Share and view photos from events, labs, and campus activities.',
      link: '/gallery',
      color: '#9b59b6'
    }
  ];

  const stats = [
    { number: '150+', label: 'Students' },
    { number: '500+', label: 'Notes Shared' },
    { number: '1000+', label: 'Discussions' },
    { number: '50+', label: 'Notices' }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <motion.section 
        className="hero"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-content">
          <h1>DTU MSc Physics Hub</h1>
          <p>Your one-stop platform for academic collaboration, resource sharing, and community building</p>
          <Link to="/about" className="cta-button">
            Learn More <FaGraduationCap />
          </Link>
        </div>
      </motion.section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="stat-item"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                <h3>{stat.number}</h3>
                <p>{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2>Platform Features</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
              >
                <div className="feature-icon" style={{ color: feature.color }}>
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <Link to={feature.link} className="feature-link">
                  Explore →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="quick-access">
        <div className="container">
          <h2>Quick Access</h2>
          <div className="quick-links">
            <Link to="/notes" className="quick-link">
              <FaFileAlt />
              <span>Upload Notes</span>
            </Link>
            <Link to="/chat" className="quick-link">
              <FaComments />
              <span>Join Chat</span>
            </Link>
            <Link to="/notices" className="quick-link">
              <FaBullhorn />
              <span>Latest Notices</span>
            </Link>
            <Link to="/gallery" className="quick-link">
              <FaImages />
              <span>View Gallery</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
