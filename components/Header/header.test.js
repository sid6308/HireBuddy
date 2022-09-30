import React from "react";
import Header from "./header.js";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { store } from "../../store/store";

describe("header", () => {
  test("header component rendered correctly", () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    expect(screen.getByTestId("home")).toHaveTextContent("Home");
    expect(screen.getByTestId("conductInterview")).toHaveTextContent(
      "Conduct Interview"
    );
    expect(screen.getByRole("button")).toHaveTextContent("Logout");
  });

  test("initially home menu is highlighted", () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    const home = screen.getByTestId("home");
    waitFor(() => expect(home).toHaveClass("header__menu__item__active"));
  });
});
