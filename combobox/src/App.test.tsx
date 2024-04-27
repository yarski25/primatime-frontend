import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";

it("Renders the main page", async () => {
  render(<App />);
  await waitFor(() => {
    expect(true).toBeTruthy();
  });
});

it("Main page contains input container", async () => {
  render(<App />);
  const inputEl = screen.getByTestId("input-container");
  await waitFor(() => {
    expect(inputEl).toBeInTheDocument();
  });
});
