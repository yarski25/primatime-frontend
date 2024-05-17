import "@testing-library/jest-dom";
// import userEvent from "@testing-library/user-event";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Input from "./Input";
// import { ChangeEvent, useState } from "react";

// type InputProps = {
//   input: string;
//   onChangeInput: (inputValue: string) => void;
// };
// // mocked input component

// const InputComponent = ({ input, onChangeInput }: InputProps) => {
//   // const [inputValue, setInputValue] = useState("");
//   const [error, setError] = useState(false);

//   const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
//     onChangeInput(event.target.value);
//     console.log(error);
//     if (input.length === 0) {
//       setError(true);
//       console.log(error);
//     } else setError(false);
//   };

//   return <input value={input} onChange={handleInput} />;
// };

// // mocked combo box component
// const ComboBoxComponent = () => {
//   const [input, setInput] = useState("");
//   const handleInput = (inputValue: string) => {
//     setInput(inputValue);
//   };

//   return <InputComponent input={input} onChangeInput={handleInput} />;
// };

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

  it("contains input text", async () => {
    render(<Input input="" onChangeInput={() => {}} />);
    const textEl = screen.getByTestId("input-text");
    await waitFor(() => {
      expect(textEl).toBeInTheDocument();
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

  // it("should call onChangeInput handle input handler", async () => {
  //   const handleInput = jest.fn();
  //   const inputValue = "Test";
  //   render(<Input input="" onChangeInput={() => {}} />);
  //   const input = screen.getByRole("textbox");
  //   fireEvent.change(input, { target: { value: inputValue } });
  //   await waitFor(() => {
  //     // expect(handleInput).toHaveBeenCalledWith(inputValue);
  //     expect(input.getAttribute("value")).toBe(inputValue);
  //   });
  // });

  // it("changes input text", async () => {
  //   // render(<InputComponent />);
  //   const handleInput = jest.fn();
  //   render(<Input input="" onChangeInput={handleInput} />);

  //   // const defaultText = "";
  //   const testText = "test";

  //   // check if value is changed after change event
  //   await waitFor(() => {
  //     const input = screen.getByPlaceholderText("Uživatelský vstup");
  //     fireEvent.change(input, {
  //       target: { value: testText },
  //     });
  //     expect(input.getAttribute("value")).toBe(testText);
  //     screen.debug();
  //   });
  // });
  // it("changes input text", async () => {
  //   // const user = userEvent.setup();

  //   const handleInput = jest.fn();

  //   const defaultText = "";
  //   const testText = "test";

  //   render(<Input input={defaultText} onChangeInput={handleInput} />);

  //   // const input = screen.getByTestId("input-text");
  //   const input = screen.getByPlaceholderText("Uživatelský vstup");
  //   // console.log(input);

  //   // // // check if default value is empty
  //   // await waitFor(() => {
  //   //   expect(input.getAttribute("value")).toBe(defaultText);
  //   // });

  //   // await user.type(screen.getByPlaceholderText("Uživatelský vstup"), testText);
  //   // screen.debug();
  //   // expect(screen.getByTestId("input-text")).toHaveValue(testText);

  //   // await user.type(input, testText);

  //   // expect(input.getAttribute("value")).toBe(testText);

  //   // check if value is changed after change event
  //   await waitFor(() => {
  //     fireEvent.change(input, {
  //       target: { value: testText },
  //     });
  //     expect(input.getAttribute("value")).toBe(testText);
  //   });
  //   // // change if changed back to default value
  //   // fireEvent.change(screen.getByTestId("input-text"), {
  //   //   target: { value: defaultText },
  //   // });
  //   // await waitFor(() => {
  //   //   expect(screen.getByTestId("input-text").getAttribute("value")).toBe(
  //   //     defaultText
  //   //   );
  //   // });
  // });
});
