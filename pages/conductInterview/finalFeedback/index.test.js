import React from "react";
import {
  render,
  fireEvent,
  screen
 
} from "@testing-library/react";
import FinalFeedback from "./index.js";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { store } from "store/store";

let Mockcomponent = () => {
  return (
    <Provider store={store}>
      <FinalFeedback />
    </Provider>
  );
};




describe("Final Feedback", () => {
    test("check component and form is rendering properly", () => {
      render(<Mockcomponent />);
      expect(screen.getByTestId("form")).toBeInTheDocument();
      expect(screen.getByText("Final Feedback")).toBeInTheDocument();
      expect(screen.getByRole("button")).toBeInTheDocument();
    });
  
    test("check input element change when user type", () => {
      render(<Mockcomponent />);
      const experience = screen.getByLabelText("experience");
      fireEvent.change(experience, { target: { value: 12 } });
      expect(experience).toHaveValue(12);
    });
  
    test("check error is showing on input field when button click", () => {
      render(<Mockcomponent />);
      const feedback = screen.getByLabelText("feedback");
      const btn = screen.getByTestId("btn");
      fireEvent.click(btn);
      expect(feedback).toHaveClass("input__textBox__errorBorder");
    });

    test("check error should be disable when user type on field", () => {
        render(<Mockcomponent />);
        const firstName = screen.getByLabelText("feedback");
        const btn = screen.getByTestId("btn");
        fireEvent.click(btn);
        expect(firstName).toHaveClass("input__textBox__errorBorder");
        fireEvent.change(firstName, { target: { value: "Arshath" } });
        expect(firstName).not.toHaveClass("input__textBox__errorBorder");
      });
    

  
  
  
  });
  