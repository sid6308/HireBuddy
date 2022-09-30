import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import FilterList from "./FilterList";

describe("Filter List", () => {
  const handleFiltering = jest.fn();
  const testcolumns = [
    "Month",
    "Year",
    "Career stage applied",
    "Career stage selected",
    "Outcome",
  ];

  test("check filter dropdowns are rendered properly and filter function has been called", () => {
    render(<FilterList handleFiltering={handleFiltering} />);
    expect(screen.getByTestId("filter")).toBeInTheDocument();
    expect(screen.getAllByTestId("dropdown")).toHaveLength(2);
    expect(handleFiltering).toHaveBeenCalled();
  });

  test("check column dropdown has correct column values", () => {
    render(<FilterList handleFiltering={handleFiltering} />);
    fireEvent.click(screen.queryByText("Choose Filter type"));
    expect(screen.getAllByRole("listitem")).toHaveLength(testcolumns.length);
    const items = screen.getAllByRole("listitem");
    const colNames = items.map((item) => item.textContent.trim());
    expect(colNames).toEqual(testcolumns);
  });

  test("check value dropdown has correct values and matches with selected column ", () => {
    render(<FilterList handleFiltering={handleFiltering} />);
    fireEvent.click(screen.queryByText("Choose Filter type"));
    fireEvent.click(screen.getByText("Outcome"));
    fireEvent.click(screen.queryByText("Choose Filter Value"));
    expect(screen.getByText("Selected")).toBeInTheDocument();
  });
});
