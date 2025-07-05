import React, { useEffect } from "react";
import { useData } from "../state/DataContext";
import { Link } from "react-router-dom";

function Items() {
  const { items, fetchItems } = useData();

  useEffect(() => {
    let active = true;

    const safeFetch = async () => {
      try {
        await fetchItems();
      } catch (e) {
        if (active) console.error(e);
      }
    };
    safeFetch();

    return () => {
      active = false;
    };
  }, [fetchItems]);

  if (!items.length) return <p>Loading...</p>;

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <Link to={"/items/" + item.id}>{item.name}</Link>
        </li>
      ))}
    </ul>
  );
}

export default Items;
