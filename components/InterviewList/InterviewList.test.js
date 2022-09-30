import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import InterviewList from "./InterviewList.js";
import data from "./mockInterviewList.json";

const TEST_KEY = "user";
const TEST_VALUE_ADMIN = { first_name: "Pragati", role: "admin" };
const TEST_VALUE_MEMBER = { first_name: "Pragati", role: "member" };

describe("Interview List", () => {
  beforeEach(() => {
    localStorage.setItem(TEST_KEY, JSON.stringify(TEST_VALUE_ADMIN));
    expect(JSON.parse(localStorage.getItem(TEST_KEY))).toEqual(
      TEST_VALUE_ADMIN
    );
  });

  test("Interview List component rendered correctly for admin", () => {
    localStorage.setItem(TEST_KEY, JSON.stringify(TEST_VALUE_ADMIN));
    expect(JSON.parse(localStorage.getItem(TEST_KEY))).toEqual(
      TEST_VALUE_ADMIN
    );
    render(<InterviewList data={data} />);
    expect(screen.getByTestId("interviewListHeading")).toHaveTextContent(
      "Interview List"
    );
  });

  test("Interview List component rendered correctly for member", () => {
    localStorage.setItem(TEST_KEY, JSON.stringify(TEST_VALUE_MEMBER));
    expect(JSON.parse(localStorage.getItem(TEST_KEY))).toEqual(
      TEST_VALUE_MEMBER
    );
    render(<InterviewList data={data} />);
  });

  test("should render child components", () => {
    render(<InterviewList data={data} />);

    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("body")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });
});
