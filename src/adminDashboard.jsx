import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Bg from "./components/bg.jsx";
import "./adminDashboard.css";

const MAX_WORDS = 1000;

const countWords = (text) =>
  text
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

const buildFileUrl = (baseUrl, relativeUrl) => {
  try {
    return new URL(relativeUrl, baseUrl).href;
  } catch (_error) {
    return `${baseUrl.replace(/\/$/, "")}${relativeUrl}`;
  }
};

const formatFileSize = (bytes) => {
  if (Number.isNaN(bytes)) {
    return "-";
  }
  if (bytes < 1024) {
    return `${bytes} B`;
  }
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

function AdminDashboard() {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [uploads, setUploads] = useState([]);
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const fileInputRef = useRef(null);

  const token = useMemo(() => localStorage.getItem("cs_lab_token"), []);
  const user = useMemo(() => {
    const stored = localStorage.getItem("cs_lab_user");
    if (!stored) {
      return null;
    }
    try {
      return JSON.parse(stored);
    } catch (error) {
      localStorage.removeItem("cs_lab_user");
      return null;
    }
  }, []);

  useEffect(() => {
    if (!token) {
      navigate("/page7", { replace: true });
      return;
    }

    if (!user || user.role !== "admin") {
      navigate("/posts", { replace: true });
      return;
    }

    let isCancelled = false;

    const fetchUploads = async () => {
      try {
        const response = await fetch(`${API_URL}/api/uploads`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 401) {
          localStorage.removeItem("cs_lab_token");
          localStorage.removeItem("cs_lab_user");
          navigate("/page7", { replace: true });
          return;
        }

        if (response.status === 403) {
          navigate("/posts", { replace: true });
          return;
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load uploads");
        }

        if (!isCancelled) {
          setUploads(data);
        }
      } catch (error) {
        if (!isCancelled) {
          setStatus({ type: "error", message: error.message });
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchUploads();

    return () => {
      isCancelled = true;
    };
  }, [API_URL, navigate, token, user]);

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!token) {
      navigate("/page7", { replace: true });
      return;
    }

    if (!user || user.role !== "admin") {
      navigate("/posts", { replace: true });
      return;
    }

    if (!file) {
      setStatus({ type: "error", message: "Please choose a file to upload." });
      return;
    }

    const words = countWords(description);
    if (!description.trim()) {
      setStatus({ type: "error", message: "A description is required." });
      return;
    }

    if (words > MAX_WORDS) {
      setStatus({
        type: "error",
        message: `Description exceeds ${MAX_WORDS} words. Please shorten it.`,
      });
      return;
    }

    const formData = new FormData();
    formData.append("description", description.trim());
    formData.append("file", file);

    try {
      setStatus(null);
      const response = await fetch(`${API_URL}/api/uploads`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (response.status === 401) {
        localStorage.removeItem("cs_lab_token");
        localStorage.removeItem("cs_lab_user");
        navigate("/page7", { replace: true });
        return;
      }

      if (response.status === 403) {
        setStatus({ type: "error", message: "Only admins can upload new posts." });
        navigate("/posts", { replace: true });
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Upload failed. Please try again.");
      }

      setUploads((prev) => [data, ...prev]);
      setDescription("");
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setStatus({ type: "success", message: "Upload completed successfully." });
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    }
  };

  const currentWordCount = countWords(description || "");

  const handleLogout = () => {
    localStorage.removeItem("cs_lab_token");
    localStorage.removeItem("cs_lab_user");
    navigate("/page7", { replace: true });
  };

  const handleDelete = async (uploadId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/uploads/${uploadId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 401) {
        localStorage.removeItem("cs_lab_token");
        localStorage.removeItem("cs_lab_user");
        navigate("/page7", { replace: true });
        return;
      }

      if (response.status === 403) {
        setStatus({ type: "error", message: "Only admins can delete posts." });
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Delete failed. Please try again.");
      }

      setUploads((prev) => prev.filter((upload) => upload._id !== uploadId));
      setStatus({ type: "success", message: "Post deleted successfully." });
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    }
  };

  const renderPreview = (upload) => {
    const fileUrl = buildFileUrl(API_URL, upload.fileUrl);
    if (upload.fileType.startsWith("image/")) {
      return <img src={fileUrl} alt={upload.originalName} className="upload-preview-image" />;
    }

    if (upload.fileType.startsWith("audio/")) {
      return (
        <audio controls className="upload-preview-audio">
          <source src={fileUrl} type={upload.fileType} />
          Your browser does not support the audio element.
        </audio>
      );
    }

    if (upload.fileType.startsWith("video/")) {
      return (
        <video controls className="upload-preview-video">
          <source src={fileUrl} type={upload.fileType} />
          Your browser does not support the video element.
        </video>
      );
    }

    if (upload.fileType === "application/pdf") {
      return (
        <iframe
          src={fileUrl}
          title={upload.originalName}
          className="upload-preview-pdf"
        />
      );
    }

    return (
      <a href={fileUrl} className="upload-preview-link" target="_blank" rel="noreferrer">
        Download {upload.originalName}
      </a>
    );
  };

  return (
    <div className="dashboard-container">
      <Bg style={{ backgroundColor: "#f7f4ef" }} />
      <div className="dashboard-content">
        <header className="dashboard-header">
          <h1>Comic Archive</h1>
          <button type="button" className="logout-button" onClick={handleLogout}>
            Log out
          </button>
        
        </header>

        <section className="upload-panel">
          <h2>New Post</h2>
          <form className="upload-form" onSubmit={handleSubmit}>
            <label className="upload-label" htmlFor="upload-description">
              <span>Description</span>
              <textarea
                id="upload-description"
                name="description"
                value={description}
                onChange={handleDescriptionChange}
                rows={6}
                maxLength={8000}
                placeholder="Describe the piece (up to 1000 words)."
              />
            </label>
            <div className="upload-word-count">
              {currentWordCount}/{MAX_WORDS} words
            </div>
            <label className="upload-label" htmlFor="upload-file">
              <span>File</span>
              <input
                id="upload-file"
                name="file"
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </label>
            <button type="submit" className="upload-submit-button">
              Upload
            </button>
            {status && (
              <p className={`upload-status upload-status-${status.type}`}>
                {status.message}
              </p>
            )}
          </form>
        </section>

        <section className="uploads-list">
          <h2>Recent Posts</h2>
          {isLoading ? (
            <p className="uploads-placeholder">Loading posts…</p>
          ) : uploads.length === 0 ? (
            <p className="uploads-placeholder">No uploads yet. Be the first to add one.</p>
          ) : (
            <div className="uploads-grid">
              {uploads.map((upload) => (
                <article key={upload._id} className="upload-card">
                  <div className="upload-preview">{renderPreview(upload)}</div>
                  <div className="upload-meta">
                    <h3>{upload.originalName}</h3>
                    <p className="upload-description">{upload.description}</p>
                    <div className="upload-footer">
                      <span>{formatFileSize(upload.fileSize)}</span>
                      <time dateTime={upload.createdAt}>
                        {new Date(upload.createdAt).toLocaleString()}
                      </time>
                    </div>
                    <button
                      type="button"
                      className="delete-button"
                      onClick={() => handleDelete(upload._id)}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default AdminDashboard;
