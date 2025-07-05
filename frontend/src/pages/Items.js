import { useEffect, useCallback, useState } from "react";
import { useData } from "../state/DataContext";
import { Link } from "react-router-dom";
import { FixedSizeList as List } from "react-window";
import LoadingSpinner from "../sharedComponent/LoadingSpinner/LoadingSpinner";
import "./items.css";

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
    error,
  } = useData();
  const [search, setSearch] = useState("");

  const Row = useCallback(
    ({ index, style }) => {
      const item = items[index];
      if (!item) return <div style={style}>Loading...</div>;
      return (
        <div className="items__row" style={style}>
          <Link to={"/items/" + item.id} className="items__link">
            {item.name}
          </Link>
        </div>
      );
    },
    [items]
  );

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

  if (error) return <div className="items__error">{error}</div>;
  if (loading) return <LoadingSpinner message="Loading products..." />;
  if (!items.length) return <p>No items found.</p>;

  return (
    <div className="items__container">
      <div className="items__card">
        <h2 className="items__title">List Of Products</h2>

        <div className="items__list-wrapper">
          <List
            height={400}
            itemCount={items.length}
            itemSize={48}
            width={"100%"}
          >
            {Row}
          </List>
        </div>

        <div className="items__controls">
          <div className="items__pagesize">
            <label htmlFor="pageSize">Page size:</label>
            <select
              id="pageSize"
              value={pageSize}
              onChange={(e) => {
                setPage(1);
                setPageSize(Number(e.target.value));
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
          <div className="items__pagination">
            <button
              aria-label="Previous page"
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1 || loading}
            >
              Prev
            </button>
            <span>
              Page {page} of {totalPages || 1}
            </span>
            <button
              aria-label="Next page"
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages || loading}
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
