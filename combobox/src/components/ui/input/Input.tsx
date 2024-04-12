import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./Input.module.scss";
import { ReferenceType } from "@floating-ui/react";

type floatingProps = {
  getReferenceProps(
    userProps?: React.HTMLProps<Element>
  ): Record<string, unknown>;
  setReference: ((node: ReferenceType | null) => void) &
    ((node: ReferenceType | null) => void);
};

type Input = {
  label?: string;
  text?: string;
  input?: string;
  setInput?: (input: string) => void;
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

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setInput?.(event.target.value);
    if (event.target.value.length === 0) {
      setError(true);
    } else setError(false);
    console.log(input);
  };
  useEffect(() => {
    const timeoutId = setTimeout(() => {}, 2000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className={styles.inputBox} data-testid="input-box">
      <label data-testid="input-label">{label ? label : "Label name"}</label>
      <br />
      <input
        data-testid="input-text"
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
      {error && (
        <div className={styles.inputErrorMsg}>
          {errorMsg ? errorMsg : "Chyba"}
        </div>
      )}
    </div>
  );
};

export default Input;
