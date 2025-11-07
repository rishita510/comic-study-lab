import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Bg from "./components/bg.jsx";
import "./postsPage.css";

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

function PostsPage() {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const navigate = useNavigate();
  const [uploads, setUploads] = useState([]);
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const token = useMemo(() => localStorage.getItem("cs_lab_token"), []);
  const user = useMemo(() => {
    const stored = localStorage.getItem("cs_lab_user");
    if (!stored) {
      return null;
    }
    try {
      return JSON.parse(stored);
    } catch (_error) {
      localStorage.removeItem("cs_lab_user");
      return null;
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("cs_lab_token");
    localStorage.removeItem("cs_lab_user");
    navigate("/page7", { replace: true });
  };

  useEffect(() => {
    if (!token) {
      navigate("/page7", { replace: true });
      return;
    }

    if (user?.role === "admin") {
      navigate("/dashboard", { replace: true });
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
          localStorage.removeItem("cs_lab_token");
          localStorage.removeItem("cs_lab_user");
          navigate("/page7", { replace: true });
          return;
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load posts");
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

  const renderPreview = (upload) => {
    const fileUrl = buildFileUrl(API_URL, upload.fileUrl);

    if (upload.fileType.startsWith("image/")) {
      return <img src={fileUrl} alt={upload.originalName} className="post-preview-image" />;
    }

    if (upload.fileType.startsWith("audio/")) {
      return (
        <audio controls className="post-preview-audio">
          <source src={fileUrl} type={upload.fileType} />
          Your browser does not support the audio element.
        </audio>
      );
    }

    if (upload.fileType.startsWith("video/")) {
      return (
        <video controls className="post-preview-video">
          <source src={fileUrl} type={upload.fileType} />
          Your browser does not support the video tag.
        </video>
      );
    }

    if (upload.fileType === "application/pdf") {
      return <iframe src={fileUrl} title={upload.originalName} className="post-preview-pdf" />;
    }

    return (
      <a href={fileUrl} className="post-preview-link" target="_blank" rel="noreferrer">
        Download {upload.originalName}
      </a>
    );
  };

  return (
    <div className="posts-container">
      <Bg style={{ backgroundColor: "#f7f4ef" }} />
      <div className="posts-content">
        <header className="posts-header">
          <div className="posts-header-row">
            <h1>Community Archive</h1>
            <button type="button" className="logout-button" onClick={handleLogout}>
              Log out
            </button>
          </div>
          <p>Browse everything the lab has shared so far.</p>
        </header>

        {status && <p className={`posts-status posts-status-${status.type}`}>{status.message}</p>}

        {isLoading ? (
          <p className="posts-placeholder">Loading posts…</p>
        ) : uploads.length === 0 ? (
          <p className="posts-placeholder">No uploads yet. Check back soon.</p>
        ) : (
          <div className="posts-grid">
            {uploads.map((upload) => (
              <article key={upload._id} className="post-card">
                <div className="post-preview">{renderPreview(upload)}</div>
                <div className="post-meta">
                  <h3>{upload.originalName}</h3>
                  <p className="post-description">{upload.description}</p>
                  <div className="post-footer">
                    <span>{formatFileSize(upload.fileSize)}</span>
                    <time dateTime={upload.createdAt}>
                      {new Date(upload.createdAt).toLocaleString()}
                    </time>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PostsPage;
