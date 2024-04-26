import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Input from "./Input";

it("Renders Input component", () => {
  render(<Input input="" setInput={() => {}} />);
  expect(true).toBeTruthy();
});

it("Input component contains label and text", () => {
  render(<Input input="" setInput={() => {}} />);
  const labelEl = screen.getByTestId("input-label");
  const textEl = screen.getByTestId("input-text");
  expect(labelEl).toBeInTheDocument();
  expect(textEl).toBeInTheDocument();
});

it("Input component contains label and placeholder default text", () => {
  render(<Input input="" setInput={() => {}} />);
  expect(screen.getByTestId("input-label")).toHaveTextContent("Label inputu");
  expect(screen.getByTestId("input-text").getAttribute("placeholder")).toBe(
    "Uživatelský vstup"
  );
});
//
