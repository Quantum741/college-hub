import React from 'react';
import { motion } from 'framer-motion';
import { FaUniversity, FaUsers, FaGraduationCap, FaFlask, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const About = () => {
  const features = [
    {
      icon: <FaGraduationCap />,
      title: 'Academic Excellence',
      description: 'Comprehensive MSc Physics program with cutting-edge curriculum and research opportunities.'
    },
    {
      icon: <FaFlask />,
      title: 'Research Focus',
      description: 'State-of-the-art laboratories and facilities for advanced physics research.'
    },
    {
      icon: <FaUsers />,
      title: 'Collaborative Learning',
      description: 'Interactive platform for students to share knowledge and collaborate on projects.'
    },
    {
      icon: <FaUniversity />,
      title: 'DTU Heritage',
      description: 'Part of Delhi Technological University\'s prestigious academic legacy.'
    }
  ];

  const stats = [
    { number: '50+', label: 'Faculty Members' },
    { number: '200+', label: 'MSc Students' },
    { number: '15+', label: 'Research Areas' },
    { number: '95%', label: 'Placement Rate' }
  ];

  const contact = {
    address: 'Department of Physics, Delhi Technological University, Shahbad Daulatpur, Main Bawana Road, Delhi-110042',
    phone: '+91-11-27871023',
    email: 'physics@dtu.ac.in'
  };

  return (
    <div className="about-page">
      {/* Hero Section */}
      <motion.section
        className="about-hero"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <div className="hero-content">
            <h1>About DTU MSc Physics Hub</h1>
            <p>
              Welcome to the official platform for MSc Physics students at Delhi Technological University. 
              Our hub connects students, facilitates academic collaboration, and enhances the learning experience 
              through digital innovation.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Department Overview */}
      <section className="department-overview">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h2>Department of Physics</h2>
            <p>
              The Department of Physics at DTU is a center of excellence in physics education and research. 
              Established with a vision to promote scientific temper and research culture, the department 
              offers comprehensive programs in theoretical and experimental physics.
            </p>
          </motion.div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
              >
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="stats-section">
        <div className="container">
          <h2>Department at a Glance</h2>
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="stat-card"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
              >
                <h3>{stat.number}</h3>
                <p>{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-vision">
        <div className="container">
          <div className="content-grid">
            <motion.div
              className="mission"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <h2>Our Mission</h2>
              <p>
                To provide world-class education in physics, foster innovative research, 
                and develop scientific leaders who contribute to society through their 
                knowledge and skills in physics and related interdisciplinary areas.
              </p>
            </motion.div>

            <motion.div
              className="vision"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <h2>Our Vision</h2>
              <p>
                To be a premier department of physics that excels in education, research, 
                and innovation, contributing significantly to the advancement of science 
                and technology for the betterment of humanity.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="platform-features">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <h2>Platform Features</h2>
            <p>Our digital hub enhances the academic experience through various features:</p>
          </motion.div>

          <div className="platform-grid">
            <div className="platform-item">
              <h3>Notes & Document Sharing</h3>
              <p>Upload, download, and share study materials with fellow students</p>
            </div>
            <div className="platform-item">
              <h3>Group Discussions</h3>
              <p>Real-time chat and discussion forums for academic collaboration</p>
            </div>
            <div className="platform-item">
              <h3>Official Notices</h3>
              <p>Stay updated with important announcements and deadlines</p>
            </div>
            <div className="platform-item">
              <h3>Image Gallery</h3>
              <p>Share photos from academic events and laboratory sessions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="contact-section">
        <div className="container">
          <motion.div
            className="contact-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
          >
            <h2>Contact Information</h2>
            <div className="contact-grid">
              <div className="contact-item">
                <FaMapMarkerAlt />
                <div>
                  <h3>Address</h3>
                  <p>{contact.address}</p>
                </div>
              </div>
              <div className="contact-item">
                <FaPhone />
                <div>
                  <h3>Phone</h3>
                  <p>{contact.phone}</p>
                </div>
              </div>
              <div className="contact-item">
                <FaEnvelope />
                <div>
                  <h3>Email</h3>
                  <p>{contact.email}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
