import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import InterviewDetails from "./index.js";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { store } from "store/store";

let Mockcomponent = () => {
  return (
    <Provider store={store}>
      <InterviewDetails />
    </Provider>
  );
};

describe("interview details", () => {
  test("check form and section is in the document", () => {
    render(<Mockcomponent />);
    expect(screen.getByTestId("form")).toBeInTheDocument();
    expect(screen.getByText("Interview Details")).toBeInTheDocument();
    expect(screen.getByText("Candidate Information")).toBeInTheDocument();
    expect(screen.getByText("Interviewer Information")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("check input element change when user type", () => {
    render(<Mockcomponent />);

    const firstName = screen.getByLabelText("candidate_firstname");
    fireEvent.change(firstName, { target: { value: "Arshath" } });
    expect(firstName).toHaveValue("Arshath");
  });

  test("check error is showing on input field when button click", () => {
    render(<Mockcomponent />);
    const firstName = screen.getByLabelText("candidate_firstname");
    const btn = screen.getByTestId("btn");
    fireEvent.click(btn);
    expect(firstName).toHaveClass("input__textBox__errorBorder");
  });

  test("check error should be disable when user type on field", () => {
    render(<Mockcomponent />);
    const firstName = screen.getByLabelText("candidate_firstname");
    const btn = screen.getByTestId("btn");
    fireEvent.click(btn);
    expect(firstName).toHaveClass("input__textBox__errorBorder");
    fireEvent.change(firstName, { target: { value: "Arshath" } });
    expect(firstName).not.toHaveClass("input__textBox__errorBorder");
  });

  test("check interviewer first name is readonly", () => {
    render(<Mockcomponent />);
    const firstName = screen.getByLabelText("interviewer_firstname");
    expect(firstName).toHaveAttribute("readOnly", "");
  });

 
});
