import React, { ChangeEvent, useState } from "react";
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
  disabled,
  floatingProps,
}: InputProps) => {
  const [error, setError] = useState(false);
  const [userInput, setUserInput] = useState<string>(input);

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    onChangeInput(event.target.value);
    setUserInput(event.target.value);
    if (event.target.value.length === 0) {
      setError(true);
    } else setError(false);
  };

  const handleReset = (e: React.MouseEvent) => {
    onChangeInput("");
    setUserInput("");
  };

  return (
    <div className={styles.inputContainer} data-testid="input-container">
      <label data-testid="input-label">{label ? label : "Label name"}</label>
      <br />
      <div className={styles.inputWrapper} data-testid="input-wrapper">
        <input
          data-testid="input-text"
          required
          className={`${error && styles.inputError}`}
          type="text"
          autoComplete="off"
          name="input"
          value={userInput}
          onChange={(event) => handleInput(event)}
          disabled={disabled ? disabled : false}
          placeholder={text ? text : "Text input"}
          ref={floatingProps?.setReference}
          {...floatingProps?.getReferenceProps()}
        />
        <SvgIcon
          wrapperStyle={styles.clearBtn}
          iconName="clearButton"
          svgProp={{
            width: 16,
            height: 16,
            fill: "black",
            stroke: "white",
          }}
          onClick={handleReset}
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
