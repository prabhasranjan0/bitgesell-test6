import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoadingSpinner from "../sharedComponent/LoadingSpinner/LoadingSpinner";
import "./itemDetail.css";

function ItemDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;
    fetch("http://localhost:3001/api/items/" + id)
      .then((res) => {
        if (!res.ok) throw new Error("Item not found");
        return res.json();
      })
      .then((data) => {
        if (active) setItem(data);
      })
      .catch((err) => {
        if (active) setError(err.message);
      });
    return () => {
      active = false;
    };
  }, [id]);

  if (error)
    return (
      <div className="item-error">
        {error} <br />
        <button className="item-back-button" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    );

  if (!item) return <LoadingSpinner message="Loading product details..." />;

  return (
    <div className="item-container">
      <button
        className="item-back-button"
        onClick={() => navigate(-1)}
        onMouseOver={(e) => e.currentTarget.classList.add("hover")}
        onMouseOut={(e) => e.currentTarget.classList.remove("hover")}
        aria-label="Back to list"
      >
        <span className="item-back-arrow">←</span> Back
      </button>

      <h2 className="item-title">{item.name}</h2>

      <div className="item-meta">
        <span className="item-category">{item.category}</span>
        <span className="item-price">${item.price}</span>
      </div>

      <div className="item-description">
        <strong>Description:</strong>{" "}
        {item.description || "No description provided."}
      </div>
    </div>
  );
}

export default ItemDetail;
