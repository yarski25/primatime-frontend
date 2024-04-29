import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Input from "./Input";

describe("Input component", () => {
  it("renders", async () => {
    render(<Input input="" setInput={() => {}} />);
    await waitFor(() => {
      expect(true).toBeTruthy();
    });
  });

  it("contains input container", async () => {
    render(<Input input="" setInput={() => {}} />);
    const containerEl = screen.getByTestId("input-container");
    await waitFor(() => {
      expect(containerEl).toBeInTheDocument();
    });
  });

  it("contains label and input wrapper", async () => {
    render(<Input input="" setInput={() => {}} />);
    const labelEl = screen.getByTestId("input-label");
    const wrapperEl = screen.getByTestId("input-wrapper");
    await waitFor(() => {
      expect(labelEl).toBeInTheDocument();
      expect(wrapperEl).toBeInTheDocument();
    });
  });

  it("contains input text", async () => {
    render(<Input input="" setInput={() => {}} />);
    const textEl = screen.getByTestId("input-text");
    await waitFor(() => {
      expect(textEl).toBeInTheDocument();
    });
  });

  // it("Input component contains clear button", async () => {
  //   render(<Input input="" setInput={() => {}} />);
  //   const clearEl = screen.getByTestId("input-clear");
  //   await waitFor(
  //     () => {
  //       expect(clearEl).toBeInTheDocument();
  //     },
  //     { timeout: 3000 }
  //   );
  // });

  it("contains label and placeholder default text", async () => {
    render(<Input input="" setInput={() => {}} />);
    await waitFor(() => {
      expect(screen.getByTestId("input-label")).toHaveTextContent(
        "Label inputu"
      );
      expect(screen.getByTestId("input-text").getAttribute("placeholder")).toBe(
        "Uživatelský vstup"
      );
    });
  });

  it("contains label and placeholder default text", async () => {
    render(<Input input="" setInput={() => {}} />);
    await waitFor(() => {
      expect(screen.getByTestId("input-label")).toHaveTextContent(
        "Label inputu"
      );
      expect(screen.getByTestId("input-text").getAttribute("placeholder")).toBe(
        "Uživatelský vstup"
      );
    });
  });

  it("changes input text", async () => {
    const handleInput = jest.fn();
    const inputText = "test";
    render(<Input input={inputText} setInput={handleInput} />);
    fireEvent.change(screen.getByTestId("input-text"), {
      target: { value: "test" },
    });
    await waitFor(() => {
      expect(screen.getByTestId("input-text").getAttribute("value")).toBe(
        "test"
      );
    });
  });
});
