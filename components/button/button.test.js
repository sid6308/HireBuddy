import React from "react";
import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import Button from "./button.js";
import "@testing-library/jest-dom";

const data = {
  buttonType: "",
  children: "",
  className: "",
  handleClick: jest.fn(),
};

describe("ButtonComponent", () => {
  test("Button Component loaded", () => {
    render(<Button {...data} />);
  });

  test("Renders with a className equal to the solidDefault", () => {
    const { container } = render(
      <Button {...data} className="solidDefault" onClick={() => {}} />
    );
    expect(container.getElementsByClassName("solidDefault"));
  });

  test("clicking the button", () => {
    render(<Button {...data}>submit</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("submit");
    fireEvent.click(button);
    // expect(handleClick).toHaveBeenCalledTimes(1);
  });
  afterEach(cleanup);
});
