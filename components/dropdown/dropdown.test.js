
import React from "react";
import Dropdown from "./dropdown.js";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("dropdown", () => {
  const obj = {
    isMultiple: false,
    options: [{ label: "manager", value: "manager" }],
    label: "Career type",
    placeholder: "Choose Types",
  };

  test("check dropdown label and placeholder is rendered properly", () => {
    render(<Dropdown {...obj} />);
    expect(screen.getByTestId("label")).toHaveTextContent(obj.label);
    expect(screen.getByTestId("placeholder")).toHaveTextContent(
      obj.placeholder
    );
  });

  test("check dropdown drawer and type single", () => {
    render(<Dropdown {...obj} />);
    fireEvent.click(screen.getByTestId("dropdown"));
    expect(screen.getByTestId("drawer")).toBeInTheDocument();
    expect(screen.queryByTestId("checkbox")).not.toBeInTheDocument();
  });

  test("check dropdown drawer and type multiple", () => {
    obj["isMultiple"] = true;
    render(<Dropdown {...obj} />);
    fireEvent.click(screen.getByTestId("dropdown"));
    expect(screen.getByTestId("drawer")).toBeInTheDocument();
    expect(screen.getByTestId("checkbox")).toBeInTheDocument();
  });
});
