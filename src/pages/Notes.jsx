import React, { useState, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaUpload, FaDownload, FaTrash, FaFilePdf, FaEye } from "react-icons/fa";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

// ==== Cloudinary config ====
const CLOUD_NAME = "myclassnotes"; // Example only, use your actual cloud name
const UPLOAD_PRESET = "unsigned_present";
 // <-- replace with your unsigned upload preset

// ==== Semester/Subject Data ====
const SEMESTERS = [
  {
    name: "SEM1",
    subjects: [
      "Electronic",
      "Applied Optics",
      "Quantum Mechanics",
      "Classical Mechanics",
      "Mathematical Physics",
    ],
  },
  {
    name: "SEM2",
    subjects: [
      "Solid State Physics",
      "Electrodynamics",
      "Computational Methods",
      "Advance Quantum Mechanics",
      "Statistical Mechanics",
    ],
  },
  {
    name: "SEM3",
    subjects: [
      "Atomic and Molecular Physic",
      "Nuclear and Particle Physic",
      "Plasma Physics",
      "Fibre and Integrated optics",
      "Characterization Techniques",
    ],
  },
  {
    name: "SEM4",
    subjects: [
      "Advanced Semiconductor Devices",
      "Advanced Functional Materials",
      "Lasers and Spectroscopy",
      "Space and Atmospheric Science",
    ],
  },
];

const Notes = () => {
  const [selectedSemester, setSelectedSemester] = useState(SEMESTERS[0].name);
  const [selectedSubject, setSelectedSubject] = useState(SEMESTERS[0].subjects[0]);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewPdf, setPreviewPdf] = useState(null);
  const fileInputRef = useRef();

  // Handle file upload to Cloudinary
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== "application/pdf") {
      alert("Please upload a PDF file.");
      return;
    }
    setUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    formData.append("folder", `notes/${selectedSemester}/${selectedSubject}`);

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
        formData,
        {
          onUploadProgress: (progressEvent) => {
            setUploadProgress(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            );
          },
        }
      );
      const newFile = {
        id: Date.now() + Math.random(),
        name: file.name,
        url: res.data.secure_url,
        semester: selectedSemester,
        subject: selectedSubject,
        date: new Date().toLocaleDateString(),
        size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
      };
      setFiles((prev) => [newFile, ...prev]);
      setUploading(false);
      setUploadProgress(0);
      fileInputRef.current.value = "";
    } catch (err) {
      alert("Upload failed.");
      setUploading(false);
    }
  };

  // Filter files by selected semester and subject
  const filteredFiles = files.filter(
    (file) =>
      file.semester === selectedSemester && file.subject === selectedSubject
  );

  // UI
  return (
    <div className="notes-page" style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 style={{ textAlign: "center", marginBottom: 0 }}>Physics Notes & Documents</h1>
        <p style={{ textAlign: "center", color: "#666" }}>
          Upload, preview, and download PDFs for each semester and subject.
        </p>
      </motion.div>

      {/* Semester and Subject Selectors */}
      <div style={{ display: "flex", gap: 16, margin: "32px 0", flexWrap: "wrap", justifyContent: "center" }}>
        <select
          value={selectedSemester}
          onChange={(e) => {
            setSelectedSemester(e.target.value);
            const sem = SEMESTERS.find((s) => s.name === e.target.value);
            setSelectedSubject(sem.subjects[0]);
          }}
          style={{ padding: 8, fontSize: 16 }}
        >
          {SEMESTERS.map((sem) => (
            <option key={sem.name} value={sem.name}>
              {sem.name}
            </option>
          ))}
        </select>
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          style={{ padding: 8, fontSize: 16 }}
        >
          {SEMESTERS.find((s) => s.name === selectedSemester).subjects.map((subj) => (
            <option key={subj} value={subj}>
              {subj}
            </option>
          ))}
        </select>
      </div>

      {/* Upload Section */}
      <motion.div
        className="upload-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        style={{
          background: "#f8f9fa",
          borderRadius: 12,
          padding: 24,
          marginBottom: 32,
          textAlign: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        }}
      >
        <FaUpload size={32} color="#007bff" />
        <h3 style={{ margin: "16px 0 8px" }}>Upload PDF</h3>
        <p style={{ color: "#888" }}>
          Select a PDF file to upload for <b>{selectedSubject}</b> ({selectedSemester})
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          onChange={handleFileUpload}
          disabled={uploading}
          style={{ margin: "16px 0" }}
        />
        {uploading && (
          <div style={{ marginTop: 8 }}>
            <span>Uploading: {uploadProgress}%</span>
            <div
              style={{
                height: 6,
                background: "#e9ecef",
                borderRadius: 3,
                overflow: "hidden",
                marginTop: 4,
                width: 200,
                margin: "4px auto",
              }}
            >
              <div
                style={{
                  width: `${uploadProgress}%`,
                  height: "100%",
                  background: "#007bff",
                  transition: "width 0.2s",
                }}
              />
            </div>
          </div>
        )}
      </motion.div>

      {/* Files List */}
      <div className="files-grid" style={{ display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "center" }}>
        {filteredFiles.length === 0 && (
          <div style={{ color: "#888", fontStyle: "italic" }}>No PDFs uploaded yet for this subject.</div>
        )}
        {filteredFiles.map((file, index) => (
          <motion.div
            key={file.id}
            className="file-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.08, duration: 0.3 }}
            style={{
              background: "#fff",
              borderRadius: 10,
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              padding: 20,
              width: 260,
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <FaFilePdf size={48} color="#e74c3c" />
            <div style={{ margin: "12px 0 8px", fontWeight: "bold", textAlign: "center" }}>
              {file.name}
            </div>
            <div style={{ fontSize: 13, color: "#555", marginBottom: 6 }}>
              <b>Date:</b> {file.date}
              <br />
              <b>Size:</b> {file.size}
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
              <button
                title="Preview"
                style={{
                  background: "#f5f5f5",
                  border: "none",
                  borderRadius: 6,
                  padding: 8,
                  cursor: "pointer",
                }}
                onClick={() => setPreviewPdf(file.url)}
              >
                <FaEye color="#007bff" />
              </button>
              <a
                href={file.url}
                download={file.name}
                title="Download"
                style={{
                  background: "#f5f5f5",
                  border: "none",
                  borderRadius: 6,
                  padding: 8,
                  cursor: "pointer",
                  display: "inline-block",
                }}
              >
                <FaDownload color="#28a745" />
              </a>
              {/* Optional: Remove button for uploader only */}
              {/* <button
                title="Delete"
                style={{
                  background: "#f5f5f5",
                  border: "none",
                  borderRadius: 6,
                  padding: 8,
                  cursor: "pointer",
                }}
                onClick={() => setFiles(files.filter((f) => f.id !== file.id))}
              >
                <FaTrash color="#dc3545" />
              </button> */}
            </div>
          </motion.div>
        ))}
      </div>

      {/* PDF Preview Modal */}
      {previewPdf && (
        <div
          style={{
            position: "fixed",
            left: 0,
            top: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.7)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setPreviewPdf(null)}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: 16,
              maxWidth: "90vw",
              maxHeight: "90vh",
              boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
              overflow: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
              <Viewer fileUrl={previewPdf} />
            </Worker>
            <button
              onClick={() => setPreviewPdf(null)}
              style={{
                marginTop: 16,
                background: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                padding: "8px 18px",
                cursor: "pointer",
                float: "right",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notes;
