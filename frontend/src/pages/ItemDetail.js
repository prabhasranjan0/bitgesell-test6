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
      <h2 style={{ fontSize: 28, marginBottom: 8, wordBreak: "break-word" }}>
        {item.name}
      </h2>
      <p>
        <strong>Category:</strong>{" "}
        <span style={{ color: "#4a90e2" }}>{item.category}</span>
      </p>
      <p>
        <strong>Price:</strong>{" "}
        <span style={{ color: "#27ae60" }}>${item.price}</span>
      </p>
    </div>
  );
}

export default ItemDetail;
