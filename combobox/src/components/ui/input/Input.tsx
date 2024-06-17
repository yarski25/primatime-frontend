import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./Input.module.scss";
import { ReferenceType } from "@floating-ui/react";
import { Uni } from "types/university";
import SvgIcon from "components/ui/svg/SvgIcon";

type floatingProps = {
  getReferenceProps(
    userProps?: React.HTMLProps<Element>
  ): Record<string, unknown>;
  setReference: ((node: ReferenceType | null) => void) &
    ((node: ReferenceType | null) => void);
  selectedItem: Uni | undefined;
};

type InputProps = {
  label?: string;
  text?: string;
  input: string;
  onChangeInput: (inputValue: string) => void;
  disabled?: boolean;
  errorMsg?: string;
  floatingProps?: floatingProps;
};

const Input = ({
  label = "Label inputu",
  text = "Uživatelský vstup",
  input,
  onChangeInput,
  errorMsg = "Prázdný vstup",
  disabled = false,
  floatingProps,
}: InputProps) => {
  const [error, setError] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  // const [userInput, setUserInput] = useState<string>(input);
  // const hasBeenPageRendered = useRef(false);
  // const inputRef = useRef<HTMLInputElement>(null);

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onChangeInput(event.target.value);
    // setUserInput(event.target.value);
    if (event.target.value.length === 0) {
      setError(true);
    } else setError(false);
  };

  // const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
  //   setIsFocused(true);
  //   console.log("handleFocus");
  // };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    console.log("handleBlur");
  };

  const handleReset = (e: React.MouseEvent) => {
    onChangeInput("");
    // setUserInput("");
  };

  // const handleMouseOver = (e: React.MouseEvent) => {
  //   // if (inputRef) {
  //   // inputRef.current?.focus();
  //   // inputRef.current?.ariaSelected;
  //   // console.log("inputRef exists");
  //   // }
  //   if (floatingProps) {
  //     floatingProps.getReferenceProps();
  //   }
  //   console.log("handleMouseOver");
  // };

  // useEffect(() => {
  //   if (hasBeenPageRendered.current) {
  //     // setUserInput(input);
  //     onChangeInput(input);
  //     console.log("useEffect call!");
  //   }
  //   hasBeenPageRendered.current = true;
  // }, [input]);
  useEffect(() => {
    console.log("(input) I fire once");
    setIsFocused(true);
  }, [input]);

  return (
    <div className={styles.inputContainer} data-testid="input-container">
      {/* <input type="text" onMouseOver={handleMouseOver} ref={inputRef} /> */}
      <label data-testid="input-label">{label}</label>
      <br />
      <div className={styles.inputWrapper} data-testid="input-wrapper">
        <input
          data-testid="input-text"
          required
          className={`${error && styles.inputError}`}
          type="text"
          autoComplete="off"
          name="input"
          value={
            isFocused
              ? input
              : input.length > 25
              ? input.substring(0, 24) + "..."
              : input
          }
          onChange={handleInput}
          // onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          placeholder={text}
          ref={floatingProps?.setReference}
          {...floatingProps?.getReferenceProps({
            // onMouseOver: (e: React.MouseEvent) => {
            //   console.log("mouseOver");
            // },
            // onFocus: () => console.log("focused"),
          })}
        />
        {input && (
          <SvgIcon
            wrapperStyle={styles.clearBtn}
            iconName="clearButton"
            svgProp={{
              width: 24,
              height: 24,
              fill: "black",
              stroke: "white",
            }}
            onClick={handleReset}
          />
        )}
      </div>
      {error && <div className={styles.inputErrorMsg}>{errorMsg}</div>}
    </div>
  );
};

export default Input;
