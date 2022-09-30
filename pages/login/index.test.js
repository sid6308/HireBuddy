import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import "@testing-library/jest-dom";
import LoginPage from ".";

describe("Login Page", () => {
  test("should submit the user email and password", () => {
    // const onSubmitMock = jest.fn();
    const password = "test";
    const email = "test@publicissapient.com";

    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: email },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: password },
    });
    fireEvent.click(screen.getByTestId("loginBtn"));
  });

  test("should show error if entered email is invalid", () => {
    const password = "test";
    const email = "test@gmail.com";

    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: email },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: password },
    });
    fireEvent.click(screen.getByTestId("loginBtn"));
    expect(screen.getByText("Please enter valid email")).toBeInTheDocument();
  });

  test("should show error if entered password is not correct", () => {
    const password = "123";
    const email = "pragati.varshney@publicissapient.com";

    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: email },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: password },
    });
    fireEvent.click(screen.getByTestId("loginBtn"));

    expect(
      screen.getByText("Password must be more than 8 characters")
    ).toBeInTheDocument();
  });
});
