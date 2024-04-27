import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import Input from "./Input";

it("Renders Input component", async () => {
  render(<Input input="" setInput={() => {}} />);
  await waitFor(() => {
    expect(true).toBeTruthy();
  });
});

it("Input component contains label and text", async () => {
  render(<Input input="" setInput={() => {}} />);
  const labelEl = screen.getByTestId("input-label");
  const textEl = screen.getByTestId("input-text");
  await waitFor(() => {
    expect(labelEl).toBeInTheDocument();
    expect(textEl).toBeInTheDocument();
  });
});

it("Input component contains label and placeholder default text", async () => {
  render(<Input input="" setInput={() => {}} />);
  await waitFor(() => {
    expect(screen.getByTestId("input-label")).toHaveTextContent("Label inputu");
    expect(screen.getByTestId("input-text").getAttribute("placeholder")).toBe(
      "Uživatelský vstup"
    );
  });
});
