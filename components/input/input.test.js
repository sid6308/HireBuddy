import React from "react";
import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import Input from "./input";
import "@testing-library/jest-dom";

const obj = {
  type: "email",
  placeholder: "Enter email",
  label: "",
  value: "test@mail.com",
  handleChange: jest.fn(),
  error: "",
  isRequired: false,
  id: "",
  isReadOnly: false,
};
describe("Input", () => {
  test("render input component", () => {
    render(<Input {...obj} />);

    const inputEl = screen.getByTestId("input-field");
    expect(inputEl).toBeInTheDocument();
    expect(inputEl).toHaveAttribute("type", "email");
  });

  test("pass valid email to test email input field", () => {
    render(<Input {...obj} />);

    const inputEl = screen.getByTestId("input-field");
    fireEvent.change(inputEl, { target: { value: "test@mail.com" } });

    expect(screen.getByTestId("input-field")).toHaveValue("test@mail.com");
    expect(screen.queryByTestId("error-msg")).not.toBeInTheDocument();
  });
  afterEach(cleanup);
});
