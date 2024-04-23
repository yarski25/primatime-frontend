import React, { ChangeEvent, useState } from "react";
import styles from "./Input.module.scss";
import { ReferenceType } from "@floating-ui/react";
import { Uni } from "types/university";
// import ClearButton from "assets/icons/clearButton.svg?react";
import SvgIcon from "components/ui/svg/SvgIcon";

type floatingProps = {
  getReferenceProps(
    userProps?: React.HTMLProps<Element>
  ): Record<string, unknown>;
  setReference: ((node: ReferenceType | null) => void) &
    ((node: ReferenceType | null) => void);
  selectedItem: Uni | undefined;
};

type Input = {
  label?: string;
  text?: string;
  input: string;
  setInput: (input: string) => void;
  handleInput?: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  errorMsg?: string;
  floatingProps?: floatingProps;
};

const Input = ({
  label = "Label inputu",
  text = "Uživatelský vstup",
  input,
  setInput,
  errorMsg = "Prázdný vstup",
  disabled,
  floatingProps,
}: Input) => {
  const [error, setError] = useState(false);

  // const inputText = document.querySelectorAll<HTMLInputElement>(".inputText");
  // const clearButton = document.querySelector(".inputClear-button");

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
    console.log(event.currentTarget.classList);
    if (
      event.target.value &&
      !event.currentTarget.classList.contains("inputText--touched")
    ) {
      event.currentTarget.classList.add("inputText--touched");
    } else if (
      !event.target.value &&
      event.currentTarget.classList.contains("inputText--touched")
    )
      event.currentTarget.classList.remove("inputText--touched");

    if (event.target.value.length === 0) {
      setError(true);
    } else setError(false);
  };

  const handleReset = (event: MouseEvent<HTMLButtonElement>) => {
    setInput("");
    // inputText?.focus();
    // inputText?.classList.remove("inputText--touched");
  };

  return (
    <div className={styles.inputContainer} data-testid="input-container">
      <label data-testid="input-label">{label ? label : "Label name"}</label>
      <br />
      {/* <ClearButton /> */}

      {/* <SvgIcon iconName="clearButton" /> */}
      <div className={styles.inputWrapper} data-testid="input-wrapper">
        <input
          data-testid="input-text"
          required
          className={`${error && styles.inputError}`}
          type="text"
          name="input"
          value={input}
          onChange={handleInput}
          disabled={disabled ? disabled : false}
          placeholder={text ? text : "Text input"}
          ref={floatingProps?.setReference}
          {...floatingProps?.getReferenceProps()}
        />
        {/* <button
          data-testid="input-clearBtn"
          onClick={handleReset}
          // className={styles.inputClearBtn}
          aria-label="Clear input"
          title="Clear input"
          // type="reset"
        >
          x
        </button> */}
        <SvgIcon
          iconName="clearButton"
          svgProp={{ width: 16, height: 16, color: "white" }}
        />
      </div>
      {error && (
        <div className={styles.inputErrorMsg}>
          {errorMsg ? errorMsg : "Chyba"}
        </div>
      )}
    </div>
  );
};

export default Input;
