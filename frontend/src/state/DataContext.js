import { createContext, useCallback, useContext, useState } from "react";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Track fetch errors

  /**
   * Fetch items from the backend with optional search and pagination.
   * Handles network errors and edge cases gracefully.
   */
  const fetchItems = useCallback(
    async ({ q = "", page: p = 1, pageSize: ps = 5 } = {}) => {
      setLoading(true);
      setError(null);
      try {
        // Validate page and pageSize
        const validPage = Number.isFinite(p) && p > 0 ? p : 1;
        const validPageSize = Number.isFinite(ps) && ps > 0 ? ps : 5;
        const params = new URLSearchParams({
          q,
          page: validPage,
          pageSize: validPageSize,
        });
        const res = await fetch(`http://localhost:3001/api/items?${params}`);
        if (!res.ok) throw new Error(`Failed to fetch items: ${res.status}`);
        const json = await res.json();
        setItems(json.items || []);
        setTotal(json.total || 0);
        setPage(json.page || 1);
        setPageSize(json.pageSize || 2);
      } catch (err) {
        setItems([]);
        setTotal(0);
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return (
    <DataContext.Provider
      value={{
        items,
        total,
        page,
        pageSize,
        loading,
        error, // Expose error state
        fetchItems,
        setPage,
        setPageSize,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
