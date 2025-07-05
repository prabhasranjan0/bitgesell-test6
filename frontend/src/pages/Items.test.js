import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Items from "./Items";
import { DataContext } from "../state/DataContext";

// Helper to render with context
function renderWithContext(ui, { providerProps }) {
  return render(
    <DataContext.Provider {...providerProps}>
      <BrowserRouter>{ui}</BrowserRouter>
    </DataContext.Provider>
  );
}

describe("Items page", () => {
  it("renders loading spinner when loading", () => {
    renderWithContext(<Items />, {
      providerProps: {
        value: {
          items: [],
          total: 0,
          page: 1,
          pageSize: 5,
          loading: true,
          error: null,
          fetchItems: jest.fn(),
          setPage: jest.fn(),
          setPageSize: jest.fn(),
        },
      },
    });
    expect(screen.getByText(/loading products/i)).toBeInTheDocument();
  });

  it("renders error message if error exists", () => {
    renderWithContext(<Items />, {
      providerProps: {
        value: {
          items: [],
          total: 0,
          page: 1,
          pageSize: 5,
          loading: false,
          error: "Something went wrong",
          fetchItems: jest.fn(),
          setPage: jest.fn(),
          setPageSize: jest.fn(),
        },
      },
    });
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it("renders 'No items found.' if items is empty and not loading", () => {
    renderWithContext(<Items />, {
      providerProps: {
        value: {
          items: [],
          total: 0,
          page: 1,
          pageSize: 5,
          loading: false,
          error: null,
          fetchItems: jest.fn(),
          setPage: jest.fn(),
          setPageSize: jest.fn(),
        },
      },
    });
    expect(screen.getByText(/no items found/i)).toBeInTheDocument();
  });

  it("renders list of items", () => {
    renderWithContext(<Items />, {
      providerProps: {
        value: {
          items: [
            { id: 1, name: "Test Item 1" },
            { id: 2, name: "Test Item 2" },
          ],
          total: 2,
          page: 1,
          pageSize: 5,
          loading: false,
          error: null,
          fetchItems: jest.fn(),
          setPage: jest.fn(),
          setPageSize: jest.fn(),
        },
      },
    });
    expect(screen.getByText(/test item 1/i)).toBeInTheDocument();
    expect(screen.getByText(/test item 2/i)).toBeInTheDocument();
  });
});
