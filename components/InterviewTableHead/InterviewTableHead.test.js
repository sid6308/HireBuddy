import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import InterviewTableHead from "./InterviewTableHead.js";

describe("Interview List Table Header", () => {
  const obj = {
    columns: [
      { header: "Id", accessor: "id" },
      { header: "Candidate Name", accessor: "cand_name", sortable: true },
    ],
    handleSorting: jest.fn(),
  };
  test("check table header is rendered properly", () => {
    render(<InterviewTableHead {...obj} />);
    const renderedHeader = screen.getAllByRole("tableHeader");
    expect(renderedHeader.length).toEqual(obj.columns.length);
  });

  test("check sort function is being called after clicking on column header that is not sortable", () => {
    render(<InterviewTableHead {...obj} />);
    fireEvent.click(screen.getByText(obj.columns[0].header));
    expect(obj.handleSorting).not.toHaveBeenCalled();
  });

  test("check sort function is being called after clicking on column header that is sortable", () => {
    render(<InterviewTableHead {...obj} />);
    fireEvent.click(screen.getByText(obj.columns[1].header));
    expect(obj.handleSorting).toHaveBeenCalled();
  });
});
