import React from "react";
import Search from "./search";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Search", () => {
  let obj = {
    label: "Career",
    placeholder: "Search ID",
    loading: false,
    suggestionDrawer: true,
    searchValue: "123",
  };
  test("search component rendered properly", () => {
    render(<Search {...obj} />);

    expect(screen.getByTestId("label")).toHaveTextContent(obj.label);
    expect(screen.getByTestId("searchIcon")).toBeInTheDocument();

    expect(screen.getByLabelText("search")).toBeInTheDocument();
  });

  test("search value entered correct ", async () => {
    obj["suggestionDrawer"] = true;
    render(<Search {...obj} />);
    const input = screen.getByLabelText("search");
    fireEvent.change(input, { target: { value: obj.searchValue } });
    expect(input.value).toBe(obj.searchValue);

  });
});
