import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Items from "./Items";
import ItemDetail from "./ItemDetail";
import { DataProvider } from "../state/DataContext";

function App() {
  return (
    <DataProvider>
      <nav
        style={{
          padding: 16,
          borderBottom: "1px solid #ddd",
          background: "#f8f9fa",
          display: "flex",
          alignItems: "center",
          gap: 16,
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
        aria-label="Main navigation"
      >
        <Link
          to="/"
          style={{
            fontWeight: 600,
            fontSize: 20,
            color: "#333",
            textDecoration: "none",
            letterSpacing: 1,
            padding: "4px 8px",
            borderRadius: 4,
            transition: "background 0.2s, color 0.2s",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = "#e3eefd";
            e.currentTarget.style.color = "#2d72d9";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "#333";
          }}
        >
          Productivity Store
        </Link>
        {/* Responsive nav placeholder for future links or menu */}
      </nav>
      <main style={{ minHeight: "80vh" }}>
        <Routes>
          <Route path="/" element={<Items />} />
          <Route path="/items/:id" element={<ItemDetail />} />
        </Routes>
      </main>
      <footer
        style={{
          textAlign: "center",
          padding: 16,
          color: "#888",
          fontSize: 14,
          background: "#f8f9fa",
          borderTop: "1px solid #eee",
        }}
        aria-label="Footer"
      >
        &copy; {new Date().getFullYear()} Productivity Store
      </footer>
    </DataProvider>
  );
}

export default App;
