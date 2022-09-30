import React from "react";
import Loader from "./loader";
import { render,  screen, } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("loader", () => {
  let obj = {
    isSmallLoader: false,
  };

  test("check loader", () => {
    render(<Loader {...obj} />);

    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });


  test("check small loader when props changes", () => {
    obj['isSmallLoader'] = true
    render(<Loader {...obj} />);

    expect(screen.getByTestId("loader")).toBeInTheDocument();
    expect(screen.getByTestId("loader")).toHaveClass('loaderWrapper__smallLoader');

  });
});
