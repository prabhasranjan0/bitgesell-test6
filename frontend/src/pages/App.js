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
          }}
        >
          Items
        </Link>
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
