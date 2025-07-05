import { Routes, Route, Link } from "react-router-dom";
import Items from "./Items";
import ItemDetail from "./ItemDetail";
import { DataProvider } from "../state/DataContext";
import "./app.css";

function App() {
  return (
    <DataProvider>
      <nav className="main-nav" aria-label="Main navigation">
        <Link to="/" className="brand-link">
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
