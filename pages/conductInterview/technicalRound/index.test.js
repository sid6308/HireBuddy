import React from "react";
import { render, screen } from "@testing-library/react";
import TechnicalRound from "./index.js";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { store } from "store/store";

let Mockcomponent = () => {
  return (
    <Provider store={store}>
      <TechnicalRound />
    </Provider>
  );
};

describe("Technical Round", () => {
  test("page section rendered properly", async () => {
    render(<Mockcomponent />);

    const scoreHeading = await screen.findByText("Total Score");
    const btn = screen.getByTestId("btn");

    expect(scoreHeading).toBeInTheDocument();
    expect(btn).toBeInTheDocument();
  });

  test("check initial score will be zero", async () => {
    render(<Mockcomponent />);

    const score = screen.getByTestId("score");
    expect(score).toHaveTextContent(0);
  });
});
