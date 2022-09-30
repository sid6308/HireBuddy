import React from "react";
import {
  render,
  screen,
  fireEvent,
  cleanup,
  getByText,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import TableFooter from "./TableFooter";

describe("Table Footer", () => {
  const testProps = {
    range: [1, 2],
    setPage: jest.fn(),
    page: 2,
    slice: [
      { id: 1, cand_name: "John Smith" },
      { id: 2, cand_name: "Sarah Jenkins" },
    ],
  };

  afterEach(cleanup);
  test("check table footer is rendered properly", () => {
    testProps.page = 0;
    testProps.slice = [];
    render(<TableFooter {...testProps} />);

    expect(testProps.setPage).toHaveBeenCalled();
  });

  test("Page buttons should be visible", () => {
    render(<TableFooter {...testProps} />);
    expect(screen.getAllByRole("button")).toHaveLength(testProps.range.length);
    const items = screen.getAllByRole("button");
    const btnText = items.map((item) => parseInt(item.textContent.trim()));
    expect(btnText).toEqual(testProps.range);
  });

  test("after clicking the button it should have activebutton class", () => {
    render(<TableFooter {...testProps} />);
    fireEvent.click(screen.getByRole("button", { name: /1/i }));
    waitFor(() => expect(getByText("1")).toHaveClass("activeButton"));
    expect(testProps.setPage).toHaveBeenCalled();
  });
});
