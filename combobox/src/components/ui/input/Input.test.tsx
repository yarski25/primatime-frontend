import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Input from "./Input";

describe("Input component", () => {
  it("renders", async () => {
    render(<Input input="" onChangeInput={() => {}} />);
    await waitFor(() => {
      expect(true).toBeTruthy();
    });
  });

  it("contains input container", async () => {
    render(<Input input="" onChangeInput={() => {}} />);
    const containerEl = screen.getByTestId("input-container");
    await waitFor(() => {
      expect(containerEl).toBeInTheDocument();
    });
  });

  it("contains label and input wrapper", async () => {
    render(<Input input="" onChangeInput={() => {}} />);
    const labelEl = screen.getByTestId("input-label");
    const wrapperEl = screen.getByTestId("input-wrapper");
    await waitFor(() => {
      expect(labelEl).toBeInTheDocument();
      expect(wrapperEl).toBeInTheDocument();
    });
  });

  it("contains input text and enabled by default", async () => {
    render(<Input input="" onChangeInput={() => {}} />);
    const textEl = screen.getByTestId("input-text");
    await waitFor(() => {
      expect(textEl).toBeInTheDocument();
      expect(textEl).toBeEnabled();
    });
  });

  it("contains label and placeholder default text", async () => {
    render(<Input input="" onChangeInput={() => {}} />);
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
    render(<Input input="" onChangeInput={() => {}} />);
    await waitFor(() => {
      expect(screen.getByTestId("input-label")).toHaveTextContent(
        "Label inputu"
      );
      expect(screen.getByTestId("input-text").getAttribute("placeholder")).toBe(
        "Uživatelský vstup"
      );
    });
  });

  it("should display the initial value", async () => {
    const testValue = "test";
    render(<Input input={testValue} onChangeInput={() => {}} />);
    const input = screen.getByRole("textbox");
    await waitFor(() => {
      expect(input.getAttribute("value")).toBe(testValue);
    });
  });

  it("should contain label, text, error message and disabled props", async () => {
    const testValue = "test";
    const [labelValue, textValue, errorMsgValue]: string[] = [
      ...Array(3).keys(),
    ].map((v, i) => testValue + i);
    const disabled = true;

    render(
      <Input
        input=""
        onChangeInput={() => {}}
        label={labelValue}
        text={textValue}
        errorMsg={errorMsgValue}
        disabled={disabled}
      />
    );
    const input = screen.getByRole("textbox");
    await waitFor(() => {
      expect(input).toBeDisabled();
      expect(screen.getByTestId("input-label")).toHaveTextContent(labelValue);
      expect(screen.getByTestId("input-text").getAttribute("placeholder")).toBe(
        textValue
      );
    });
    fireEvent.change(input, { target: { value: testValue } });
    fireEvent.change(input, { target: { value: "" } });
    const error = screen.getByText(errorMsgValue);
    await waitFor(() => {
      expect(error).toBeInTheDocument();
    });
  });

  it("should call the onChangeInput callback when value change", async () => {
    const handleInput = jest.fn();
    const testValue = "test";
    render(<Input input="" onChangeInput={handleInput} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: testValue } });
    await waitFor(() => {
      expect(handleInput).toHaveBeenCalled();
      expect(handleInput).toHaveBeenCalledTimes(1);
      expect(handleInput).toHaveBeenCalledWith(testValue);
    });
  });

  it("should display error message if onChangeInput callback empty next after value change", async () => {
    const handleInput = jest.fn();
    const testValue = "test";
    const errorMsg = "Prázdný vstup";
    render(<Input input="" onChangeInput={handleInput} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: testValue } });
    await waitFor(() => {
      expect(handleInput).toHaveBeenCalled();
      expect(handleInput).toHaveBeenCalledTimes(1);
      expect(handleInput).toHaveBeenCalledWith(testValue);
    });
    fireEvent.change(input, { target: { value: "" } });
    const error = screen.getByText(errorMsg);
    await waitFor(() => {
      expect(handleInput).toHaveBeenCalled();
      expect(handleInput).toHaveBeenCalledTimes(2);
      expect(handleInput).toHaveBeenCalledWith("");
      expect(error).toBeInTheDocument();
    });
  });

  it("should reset input value if reset button triggered", async () => {
    const handleInput = jest.fn();
    const testValue = "test";
    render(<Input input="" onChangeInput={handleInput} />);
    const input = screen.getByRole("textbox");
    const reset = await screen.findByTestId("input-clear");
    fireEvent.change(input, { target: { value: testValue } });
    await waitFor(() => {
      expect(handleInput).toHaveBeenCalled();
      expect(handleInput).toHaveBeenCalledTimes(1);
      expect(handleInput).toHaveBeenCalledWith(testValue);
    });
    fireEvent.click(reset);
    await waitFor(() => {
      expect(input.getAttribute("value")).toBe("");
    });
  });
});
