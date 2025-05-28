import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaFileAlt, FaDownload, FaUpload, FaFilePdf, FaFileWord, FaTrash } from 'react-icons/fa';

const Notes = () => {
  const [files, setFiles] = useState([
    { id: 1, name: 'Quantum Mechanics Chapter 1.pdf', type: 'pdf', uploadedBy: 'Rahul Sharma', date: '2025-05-20', size: '2.5 MB' },
    { id: 2, name: 'Statistical Physics Notes.docx', type: 'docx', uploadedBy: 'Priya Singh', date: '2025-05-19', size: '1.8 MB' },
    { id: 3, name: 'Solid State Physics.pdf', type: 'pdf', uploadedBy: 'Amit Kumar', date: '2025-05-18', size: '3.2 MB' }
  ]);

  const [dragActive, setDragActive] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const fileInputRef = useRef(null);

  const categories = [
    { value: 'all', label: 'All Files' },
    { value: 'quantum', label: 'Quantum Mechanics' },
    { value: 'statistical', label: 'Statistical Physics' },
    { value: 'solid', label: 'Solid State Physics' },
    { value: 'nuclear', label: 'Nuclear Physics' }
  ];

  const handleFileUpload = (uploadedFiles) => {
    Array.from(uploadedFiles).forEach(file => {
      const newFile = {
        id: Date.now() + Math.random(),
        name: file.name,
        type: file.name.split('.').pop(),
        uploadedBy: 'Current User',
        date: new Date().toISOString().split('T')[0],
        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB'
      };
      setFiles(prev => [newFile, ...prev]);
    });
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const getFileIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'pdf': return <FaFilePdf style={{ color: '#e74c3c' }} />;
      case 'docx':
      case 'doc': return <FaFileWord style={{ color: '#3498db' }} />;
      default: return <FaFileAlt style={{ color: '#95a5a6' }} />;
    }
  };

  const deleteFile = (id) => {
    setFiles(files.filter(file => file.id !== id));
  };

  return (
    <div className="notes-page">
      <div className="container">
        <motion.div
          className="page-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Notes & Documents</h1>
          <p>Share and access study materials with your classmates</p>
        </motion.div>

        {/* Upload Section */}
        <motion.div
          className="upload-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div
            className={`upload-dropzone ${dragActive ? 'active' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <FaUpload />
            <h3>Upload Files</h3>
            <p>Drag and drop files here or click to browse</p>
            <small>Supports PDF, DOC, DOCX files up to 10MB</small>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.doc,.docx"
              onChange={(e) => handleFileUpload(e.target.files)}
              style={{ display: 'none' }}
            />
          </div>
        </motion.div>

        {/* Category Filter */}
        <div className="category-filter">
          {categories.map(category => (
            <button
              key={category.value}
              className={`category-btn ${selectedCategory === category.value ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.value)}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Files List */}
        <div className="files-grid">
          {files.map((file, index) => (
            <motion.div
              key={file.id}
              className="file-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="file-icon">
                {getFileIcon(file.type)}
              </div>
              <div className="file-info">
                <h3>{file.name}</h3>
                <p>Uploaded by: {file.uploadedBy}</p>
                <p>Date: {file.date}</p>
                <p>Size: {file.size}</p>
              </div>
              <div className="file-actions">
                <button className="download-btn">
                  <FaDownload />
                </button>
                <button className="delete-btn" onClick={() => deleteFile(file.id)}>
                  <FaTrash />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notes;
