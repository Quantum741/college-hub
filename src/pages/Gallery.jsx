import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUpload, FaTimes, FaHeart, FaComment, FaShare } from 'react-icons/fa';

const Gallery = () => {
  const [images, setImages] = useState([
    {
      id: 1,
      src: '/api/placeholder/400/300',
      title: 'Physics Lab Session',
      description: 'Quantum mechanics experiment setup',
      uploadedBy: 'Rahul Sharma',
      date: '2025-05-20',
      likes: 15,
      comments: 3
    },
    {
      id: 2,
      src: '/api/placeholder/400/300',
      title: 'Department Seminar',
      description: 'Guest lecture on theoretical physics',
      uploadedBy: 'Priya Singh',
      date: '2025-05-19',
      likes: 22,
      comments: 7
    },
    {
      id: 3,
      src: '/api/placeholder/400/300',
      title: 'Research Project',
      description: 'Solid state physics research setup',
      uploadedBy: 'Amit Kumar',
      date: '2025-05-18',
      likes: 18,
      comments: 5
    }
  ]);

  const [selectedImage, setSelectedImage] = useState(null);
  const [showUpload, setShowUpload] = useState(false);
  const [uploadData, setUploadData] = useState({
    title: '',
    description: '',
    file: null
  });
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    e.preventDefault();
    if (uploadData.file) {
      const newImage = {
        id: Date.now(),
        src: URL.createObjectURL(uploadData.file),
        title: uploadData.title,
        description: uploadData.description,
        uploadedBy: 'Current User',
        date: new Date().toISOString().split('T')[0],
        likes: 0,
        comments: 0
      };
      setImages([newImage, ...images]);
      setUploadData({ title: '', description: '', file: null });
      setShowUpload(false);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setUploadData({ ...uploadData, file });
    }
  };

  const likeImage = (id) => {
    setImages(images.map(img => 
      img.id === id ? { ...img, likes: img.likes + 1 } : img
    ));
  };

  return (
    <div className="gallery-page">
      <div className="container">
        <motion.div
          className="page-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Image Gallery</h1>
          <p>Share and explore photos from campus life and academic activities</p>
          <button 
            className="upload-btn"
            onClick={() => setShowUpload(true)}
          >
            <FaUpload /> Upload Image
          </button>
        </motion.div>

        {/* Upload Modal */}
        <AnimatePresence>
          {showUpload && (
            <motion.div
              className="modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="upload-modal"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
              >
                <div className="modal-header">
                  <h2>Upload New Image</h2>
                  <button onClick={() => setShowUpload(false)}>
                    <FaTimes />
                  </button>
                </div>
                <form onSubmit={handleImageUpload}>
                  <div className="file-upload-area" onClick={() => fileInputRef.current?.click()}>
                    {uploadData.file ? (
                      <img src={URL.createObjectURL(uploadData.file)} alt="Preview" />
                    ) : (
                      <div className="upload-placeholder">
                        <FaUpload />
                        <p>Click to select an image</p>
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      style={{ display: 'none' }}
                    />
                  </div>
                  <div className="form-group">
                    <label>Title</label>
                    <input
                      type="text"
                      value={uploadData.title}
                      onChange={(e) => setUploadData({ ...uploadData, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      value={uploadData.description}
                      onChange={(e) => setUploadData({ ...uploadData, description: e.target.value })}
                      rows="3"
                    />
                  </div>
                  <div className="form-actions">
                    <button type="button" onClick={() => setShowUpload(false)}>
                      Cancel
                    </button>
                    <button type="submit" disabled={!uploadData.file || !uploadData.title}>
                      Upload
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Image Grid */}
        <div className="gallery-grid">
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              className="gallery-item"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              onClick={() => setSelectedImage(image)}
            >
              <div className="image-container">
                <img src={image.src} alt={image.title} />
                <div className="image-overlay">
                  <h3>{image.title}</h3>
                  <p>{image.description}</p>
                </div>
              </div>
              <div className="image-info">
                <div className="image-meta">
                  <span>By {image.uploadedBy}</span>
                  <span>{image.date}</span>
                </div>
                <div className="image-actions">
                  <button onClick={(e) => { e.stopPropagation(); likeImage(image.id); }}>
                    <FaHeart /> {image.likes}
                  </button>
                  <button>
                    <FaComment /> {image.comments}
                  </button>
                  <button>
                    <FaShare />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Image Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              className="image-modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                className="image-modal"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  className="close-modal"
                  onClick={() => setSelectedImage(null)}
                >
                  <FaTimes />
                </button>
                <img src={selectedImage.src} alt={selectedImage.title} />
                <div className="modal-info">
                  <h2>{selectedImage.title}</h2>
                  <p>{selectedImage.description}</p>
                  <div className="modal-meta">
                    <span>Uploaded by {selectedImage.uploadedBy} on {selectedImage.date}</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Gallery;
