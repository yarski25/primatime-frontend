import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import Input from "./Input";

it("Renders Input component", async () => {
  render(<Input input="" setInput={() => {}} />);
  await waitFor(() => {
    expect(true).toBeTruthy();
  });
});

it("Input component contains input container", async () => {
  render(<Input input="" setInput={() => {}} />);
  const containerEl = screen.getByTestId("input-container");
  await waitFor(() => {
    expect(containerEl).toBeInTheDocument();
  });
});

it("Input component contains label and input wrapper", async () => {
  render(<Input input="" setInput={() => {}} />);
  const labelEl = screen.getByTestId("input-label");
  const wrapperEl = screen.getByTestId("input-wrapper");
  await waitFor(() => {
    expect(labelEl).toBeInTheDocument();
    expect(wrapperEl).toBeInTheDocument();
  });
});

it("Input component contains input text", async () => {
  render(<Input input="" setInput={() => {}} />);
  const textEl = screen.getByTestId("input-text");
  await waitFor(() => {
    expect(textEl).toBeInTheDocument();
  });
});

// it("Input component contains clear button", async () => {
//   render(<Input input="" setInput={() => {}} />);
//   const clearEl = screen.getByTestId("input-clear");
//   await waitFor(() => {
//     expect(clearEl).toBeInTheDocument();
//   });
// });

it("Input component contains label and placeholder default text", async () => {
  render(<Input input="" setInput={() => {}} />);
  await waitFor(() => {
    expect(screen.getByTestId("input-label")).toHaveTextContent("Label inputu");
    expect(screen.getByTestId("input-text").getAttribute("placeholder")).toBe(
      "Uživatelský vstup"
    );
  });
});
