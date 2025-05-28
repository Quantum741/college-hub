import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBullhorn, FaCalendarAlt, FaUser, FaPlus, FaTimes } from 'react-icons/fa';

const Notices = () => {
  const [notices, setNotices] = useState([
    {
      id: 1,
      title: 'Mid-term Examination Schedule',
      content: 'Mid-term examinations for MSc Physics will be conducted from June 15-22, 2025. Please check the detailed schedule on the department website.',
      author: 'Dr. A.K. Sharma',
      date: '2025-05-25',
      priority: 'high',
      category: 'exam'
    },
    {
      id: 2,
      title: 'Research Proposal Submission Deadline',
      content: 'All MSc students must submit their research proposals by June 10, 2025. Late submissions will not be accepted.',
      author: 'Prof. S. Gupta',
      date: '2025-05-24',
      priority: 'medium',
      category: 'academic'
    },
    {
      id: 3,
      title: 'Physics Department Seminar',
      content: 'Guest lecture on "Quantum Computing Applications" by Dr. R. Verma from IIT Delhi on June 5, 2025, at 2:00 PM in Room 301.',
      author: 'Dr. M. Singh',
      date: '2025-05-23',
      priority: 'low',
      category: 'event'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    priority: 'medium',
    category: 'general'
  });

  const [filter, setFilter] = useState('all');

  const categories = [
    { value: 'all', label: 'All Notices' },
    { value: 'exam', label: 'Examinations' },
    { value: 'academic', label: 'Academic' },
    { value: 'event', label: 'Events' },
    { value: 'general', label: 'General' }
  ];

  const priorities = [
    { value: 'high', label: 'High Priority', color: '#e74c3c' },
    { value: 'medium', label: 'Medium Priority', color: '#f39c12' },
    { value: 'low', label: 'Low Priority', color: '#27ae60' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const newNotice = {
      id: Date.now(),
      ...formData,
      date: new Date().toISOString().split('T')[0]
    };
    setNotices([newNotice, ...notices]);
    setFormData({ title: '', content: '', author: '', priority: 'medium', category: 'general' });
    setShowForm(false);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const filteredNotices = filter === 'all' ? notices : notices.filter(notice => notice.category === filter);

  const getPriorityColor = (priority) => {
    return priorities.find(p => p.value === priority)?.color || '#95a5a6';
  };

  return (
    <div className="notices-page">
      <div className="container">
        <motion.div
          className="page-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Official Notices</h1>
          <p>Stay updated with important announcements and information</p>
          <button 
            className="add-notice-btn"
            onClick={() => setShowForm(true)}
          >
            <FaPlus /> Post Notice
          </button>
        </motion.div>

        {/* Category Filter */}
        <div className="filter-section">
          {categories.map(category => (
            <button
              key={category.value}
              className={`filter-btn ${filter === category.value ? 'active' : ''}`}
              onClick={() => setFilter(category.value)}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Notice Form Modal */}
        {showForm && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="notice-form-modal"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <div className="modal-header">
                <h2>Post New Notice</h2>
                <button onClick={() => setShowForm(false)}>
                  <FaTimes />
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Content</label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    rows="5"
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Author</label>
                    <input
                      type="text"
                      name="author"
                      value={formData.author}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Priority</label>
                    <select
                      name="priority"
                      value={formData.priority}
                      onChange={handleInputChange}
                    >
                      {priorities.map(priority => (
                        <option key={priority.value} value={priority.value}>
                          {priority.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                    >
                      {categories.slice(1).map(category => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="form-actions">
                  <button type="button" onClick={() => setShowForm(false)}>
                    Cancel
                  </button>
                  <button type="submit">Post Notice</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}

        {/* Notices List */}
        <div className="notices-list">
          {filteredNotices.map((notice, index) => (
            <motion.div
              key={notice.id}
              className="notice-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="notice-header">
                <div className="notice-priority" style={{ backgroundColor: getPriorityColor(notice.priority) }}>
                  <FaBullhorn />
                </div>
                <div className="notice-meta">
                  <h3>{notice.title}</h3>
                  <div className="notice-info">
                    <span><FaUser /> {notice.author}</span>
                    <span><FaCalendarAlt /> {notice.date}</span>
                    <span className="category-tag">{notice.category}</span>
                  </div>
                </div>
              </div>
              <div className="notice-content">
                <p>{notice.content}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notices;
