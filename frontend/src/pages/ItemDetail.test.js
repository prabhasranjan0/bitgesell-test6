import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import ItemDetail from "./ItemDetail";

// Mock fetch globally
beforeEach(() => {
  global.fetch = jest.fn();
});
afterEach(() => {
  jest.resetAllMocks();
});

describe("ItemDetail page", () => {
  it("renders loading spinner initially", () => {
    // Don't resolve fetch, so it stays loading
    global.fetch.mockImplementation(() => new Promise(() => {}));
    render(
      <MemoryRouter initialEntries={["/items/1"]}>
        <Routes>
          <Route path="/items/:id" element={<ItemDetail />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText(/loading product details/i)).toBeInTheDocument();
  });

  it("renders item details on success", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        id: 1,
        name: "Test Product",
        category: "TestCat",
        price: 123,
        description: "A test product",
      }),
    });
    render(
      <MemoryRouter initialEntries={["/items/1"]}>
        <Routes>
          <Route path="/items/:id" element={<ItemDetail />} />
        </Routes>
      </MemoryRouter>
    );
    expect(
      (await screen.findAllByText(/test product/i)).length
    ).toBeGreaterThan(0);
    expect(screen.getByText(/testcat/i)).toBeInTheDocument();
    expect(screen.getByText(/\$123/)).toBeInTheDocument();
    expect(screen.getByText(/a test product/i)).toBeInTheDocument();
  });

  it("renders error and back button if fetch fails", async () => {
    global.fetch.mockResolvedValueOnce({ ok: false });
    render(
      <MemoryRouter initialEntries={["/items/999"]}>
        <Routes>
          <Route path="/items/:id" element={<ItemDetail />} />
        </Routes>
      </MemoryRouter>
    );
    expect(await screen.findByText(/item not found/i)).toBeInTheDocument();
    const backBtn = screen.getByRole("button", { name: /back/i });
    expect(backBtn).toBeInTheDocument();
  });
});
