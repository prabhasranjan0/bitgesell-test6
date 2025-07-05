import { useEffect, useCallback, useState } from "react";
import { useData } from "../state/DataContext";
import { Link } from "react-router-dom";
import { FixedSizeList as List } from "react-window";

function Items() {
  const {
    items,
    total,
    page,
    pageSize,
    loading,
    fetchItems,
    setPage,
    setPageSize,
  } = useData();
  const [search, setSearch] = useState("");

  // Virtualized row renderer (must be before any return)
  const Row = useCallback(
    ({ index, style }) => {
      const item = items[index];
      if (!item) return <div style={style}>Loading...</div>;
      return (
        <div
          style={{
            ...style,
            borderBottom: "1px solid #eee",
            alignItems: "center",
            display: "flex",
            gap: 8,
            padding: "0 16px",
            background: index % 2 === 0 ? "#fafbfc" : "#fff",
          }}
        >
          <Link
            to={"/items/" + item.id}
            style={{
              textDecoration: "none",
              color: "#2d72d9",
              fontWeight: 500,
            }}
          >
            {item.name}
          </Link>
        </div>
      );
    },
    [items]
  );

  // Fetch items on mount, search, page, or pageSize change
  useEffect(() => {
    let active = true;
    const safeFetch = async () => {
      try {
        await fetchItems({ q: search, page, pageSize });
      } catch (e) {
        if (active) console.error(e);
      }
    };
    safeFetch();
    return () => {
      active = false;
    };
  }, [fetchItems, search, page, pageSize]);

  const totalPages = Math.ceil(total / pageSize);

  if (loading) return <p>Loading...</p>;
  if (!items.length) return <p>No items found.</p>;

  return (
    <div
      style={{
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: 600,
          background: "#fff",
          borderRadius: 8,
          boxShadow: "0 4px 24px #0002, 0 1.5px 6px #0001",
          padding: 24,
          margin: "32px 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
        }}
      >
        <h2 style={{ marginBottom: 16, textAlign: "center" }}>
          List Of Products
        </h2>

        <div
          style={{
            border: "1px solid #eee",
            borderRadius: 6,
            overflow: "hidden",
          }}
        >
          <List
            height={400}
            itemCount={items.length}
            itemSize={48}
            width={"100%"}
          >
            {Row}
          </List>
        </div>
        {/* Page size selector aligned left, pagination controls centered */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 16,
          }}
        >
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <label htmlFor="pageSize" style={{ alignSelf: "center" }}>
              Page size:
            </label>
            <select
              id="pageSize"
              value={pageSize}
              onChange={(e) => {
                setPage(1);
                setPageSize(Number(e.target.value));
              }}
              style={{
                padding: 6,
                borderRadius: 4,
                border: "1px solid #ccc",
              }}
              aria-label="Select page size"
            >
              {[2, 5, 10, 20, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              gap: 8,
              flex: 1,
            }}
          >
            <button
              aria-label="Previous page"
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1 || loading}
              style={{
                padding: "6px 12px",
                borderRadius: 4,
                border: "1px solid #ccc",
                background: page === 1 ? "#f5f5f5" : "#fff",
              }}
            >
              Prev
            </button>
            <span style={{ alignSelf: "center" }}>
              Page {page} of {totalPages || 1}
            </span>
            <button
              aria-label="Next page"
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages || loading}
              style={{
                padding: "6px 12px",
                borderRadius: 4,
                border: "1px solid #ccc",
                background: page === totalPages ? "#f5f5f5" : "#fff",
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Items;
