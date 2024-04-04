import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import App from "./App";

it("Renders the main page", () => {
  render(<App />);
  expect(true).toBeTruthy();
});

it("Main page contains input", () => {
  render(<App />);
  const inputEl = screen.getByTestId("input-box");
  expect(inputEl).toBeInTheDocument();
});
