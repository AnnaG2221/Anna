import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Table from "../Table";

describe("Table", () => {
  const mockData = [
    {
      ticker: "ALPHA",
      price: 3791.37,
      assetClass: "Credit",
    },
    {
      ticker: "BETA",
      price: -3150.67,
      assetClass: "Equities",
    },
  ];

  test("renders correct data into table cells", () => {
    render(<Table data={mockData} />);
    mockData.forEach((row) => {
      const tickerCell = screen.getByText(row.ticker);
      const priceCell = screen.getByText(row.price);
      const assetClassCell = screen.getByText(row.assetClass);
      expect(tickerCell).toBeInTheDocument();
      expect(priceCell).toBeInTheDocument();
      expect(assetClassCell).toBeInTheDocument();
    });
  });

  test("sorts table data by ticker in ascending order", async () => {
    render(<Table data={mockData} />);

    const tickerTitle = screen.getByText("TICKER");
    await userEvent.click(tickerTitle);
    const allRows = screen.getAllByRole("row");
    expect(allRows[1]).toHaveTextContent("ALPHA");
    expect(allRows[2]).toHaveTextContent("BETA");
    await userEvent.click(tickerTitle);
    expect(allRows[1]).toHaveTextContent("BETA");
    expect(allRows[2]).toHaveTextContent("ALPHA");
  });

  test("sorts table data by price in descending order", async () => {
    render(<Table data={mockData} />);

    const priceTitle = screen.getByText("PRICE");
    await userEvent.click(priceTitle);
    const allRows = screen.getAllByRole("row");
    expect(allRows[1]).toHaveTextContent("BETA");
    expect(allRows[2]).toHaveTextContent("ALPHA");
    await userEvent.click(priceTitle);
    expect(allRows[1]).toHaveTextContent("ALPHA");
    expect(allRows[2]).toHaveTextContent("BETA");
  });

  test("sets correct background color for table rows", () => {
    render(<Table data={mockData} />);

    const rowElements = screen.getAllByRole("row");
    expect(rowElements[1]).toHaveStyle({ backgroundColor: "lightGreen" });
    expect(rowElements[2]).toHaveStyle({ backgroundColor: "lightBlue" });
  });

  test("shows the correct color for the price cell", () => {
    render(<Table data={mockData} />);

    const priceCellRed = screen.getByText("-3150.67");
    const priceCellBlue = screen.getByText("3791.37");
    expect(priceCellRed).toHaveStyle({ color: "red" });
    expect(priceCellBlue).toHaveStyle({ color: "darkBlue" });
  });
});
