import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TableBody from "./TableBody";

describe("Interview List Table Body", () => {
  const testData = [
    { id: 1, cand_name: "John Smith" },
    { id: 2, cand_name: "Sarah Jenkins" },
  ];

  const testcolumns = [
    { header: "Id", accessor: "id" },
    { header: "Candidate Name", accessor: "cand_name", sortable: true },
  ];

  test("check table body is rendered properly", () => {
    render(<TableBody tableData={testData} columns={testcolumns} />);
    expect(
      screen.getByRole("cell", { name: /john smith/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: /2/i })).toBeInTheDocument();
  });
});
