import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ItemDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3001/api/items/" + id)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then(setItem)
      .catch(() => navigate("/"));
  }, [id, navigate]);

  if (!item) return <p>Loading...</p>;

  return (
    <div
      style={{
        maxWidth: 420,
        width: "90vw",
        margin: "32px auto",
        background: "#fff",
        borderRadius: 10,
        boxShadow: "0 4px 24px #0003, 0 1.5px 6px #0001",
        padding: 24,
        display: "flex",
        flexDirection: "column",
        gap: 16,
        fontSize: 18,
        lineHeight: 1.6,
      }}
    >
      <button
        onClick={() => navigate(-1)}
        style={{
          alignSelf: "flex-start",
          marginBottom: 8,
          padding: "4px 10px",
          borderRadius: 4,
          border: "1px solid #ccc",
          background: "#f5f5f5",
          color: "#2d72d9",
          fontWeight: 500,
          cursor: "pointer",
          fontSize: 14,
          boxShadow: "0 1px 4px #0001",
          transition: "background 0.2s, color 0.2s",
          outline: "none",
        }}
        onMouseOver={(e) => (e.currentTarget.style.background = "#e3eefd")}
        onMouseOut={(e) => (e.currentTarget.style.background = "#f5f5f5")}
        aria-label="Back to list"
      >
        <span style={{ fontSize: 16, marginRight: 4 }}>←</span> Back
      </button>
      <h2 style={{ fontSize: 26, marginBottom: 8, wordBreak: "break-word" }}>
        {item.name}
      </h2>
      <div
        style={{
          display: "flex",
          gap: 16,
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <span
          style={{
            display: "inline-block",
            background: "#e3eefd",
            color: "#2d72d9",
            borderRadius: 4,
            padding: "2px 8px",
            fontSize: 13,
            fontWeight: 500,
          }}
        >
          {item.category}
        </span>
        <span
          style={{
            color: "#27ae60",
            fontWeight: 600,
            fontSize: 18,
          }}
        >
          ${item.price}
        </span>
      </div>
      <div style={{ color: "#666", fontSize: 15, marginBottom: 12 }}>
        <strong>Description:</strong>{" "}
        {item.description || "No description provided."}
      </div>
    </div>
  );
}

export default ItemDetail;
