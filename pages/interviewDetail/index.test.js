import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import InterviewDetail from "./[id].js";
import { Provider } from "react-redux";
import { store } from "store/store";
import obj from "./mockInterviewDetail.json";
import "@testing-library/jest-dom";

const Mockcomponent = () => {
  return (
    <Provider store={store}>
      <InterviewDetail obj={obj} />
    </Provider>
  );
};

describe("interview Detail", () => {
  afterEach(cleanup);
  test("input must be read only", () => {
    render(<Mockcomponent />);
    expect(
      screen
        .getByLabelText("candidate_firstname")
        .hasAttribute("isReadOnly", "true")
    );
  });
});
