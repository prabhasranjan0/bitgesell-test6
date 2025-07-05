import React, { createContext, useCallback, useContext, useState } from "react";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [loading, setLoading] = useState(false);

  // fetchItems now supports search, pagination
  const fetchItems = useCallback(
    async ({ q = "", page: p = 1, pageSize: ps = 2 } = {}) => {
      setLoading(true);
      const params = new URLSearchParams({ q, page: p, pageSize: ps });
      const res = await fetch(`http://localhost:3001/api/items?${params}`);
      const json = await res.json();
      setItems(json.items || []);
      setTotal(json.total || 0);
      setPage(json.page || 1);
      setPageSize(json.pageSize || 2);
      setLoading(false);
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
