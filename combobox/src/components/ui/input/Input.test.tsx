import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Input from "./Input";

describe("Input component", () => {
  it("renders", async () => {
    render(<Input input="" selectedInput="" onChangeInput={() => {}} />);
    await waitFor(() => {
      expect(true).toBeTruthy();
    });
  });

  it("contains input container", async () => {
    render(<Input input="" selectedInput="" onChangeInput={() => {}} />);
    const containerEl = screen.getByTestId("input-container");
    await waitFor(() => {
      expect(containerEl).toBeInTheDocument();
    });
  });

  it("contains label and input wrapper", async () => {
    render(<Input input="" selectedInput="" onChangeInput={() => {}} />);
    const labelEl = screen.getByTestId("input-label");
    const wrapperEl = screen.getByTestId("input-wrapper");
    await waitFor(() => {
      expect(labelEl).toBeInTheDocument();
      expect(wrapperEl).toBeInTheDocument();
    });
  });

  it("contains input text and enabled by default", async () => {
    render(<Input input="" selectedInput="" onChangeInput={() => {}} />);
    const textEl = screen.getByTestId("input-text");
    await waitFor(() => {
      expect(textEl).toBeInTheDocument();
      expect(textEl).toBeEnabled();
    });
  });

  it("contains label and placeholder default text", async () => {
    render(<Input input="" selectedInput="" onChangeInput={() => {}} />);
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
    render(
      <Input input={testValue} selectedInput="" onChangeInput={() => {}} />
    );
    const input = screen.getByRole("textbox");
    await waitFor(() => {
      expect(input.getAttribute("value")).toBe(testValue);
    });
  });

  it("should contain label, text and disabled props", async () => {
    const testValue = "test";
    const [labelValue, textValue]: string[] = [...Array(2).keys()].map(
      (v, i) => testValue + i
    );
    const disabled = true;

    render(
      <Input
        input=""
        selectedInput=""
        onChangeInput={() => {}}
        label={labelValue}
        text={textValue}
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
  });

  it("should call the onChangeInput callback when value change", async () => {
    const handleInput = jest.fn();
    const testValue = "test";
    render(<Input input="" selectedInput="" onChangeInput={handleInput} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: testValue } });
    await waitFor(() => {
      expect(handleInput).toHaveBeenCalled();
      expect(handleInput).toHaveBeenCalledTimes(1);
      expect(handleInput).toHaveBeenCalledWith(testValue);
    });
  });

  // it("should call the onBlur callback when value change", async () => {
  //   const handleInput = jest.fn();
  //   const testValue = "test";
  //   render(<Input input="" selectedInput="" onChangeInput={handleInput} />);
  //   const input = screen.getByRole("textbox");
  //   fireEvent.change(input, { target: { value: testValue } });
  //   await waitFor(() => {
  //     expect(handleInput).toHaveBeenCalled();
  //     expect(handleInput).toHaveBeenCalledTimes(1);
  //     expect(handleInput).toHaveBeenCalledWith(testValue);
  //   });
  // });
});
