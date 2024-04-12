import React, { ChangeEvent, useState } from "react";
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
  disabled?: boolean;
  errorMsg?: string;
  floatingProps?: floatingProps;
};

const Input = ({
  label = "Label inputu",
  text = "Uživatelský vstup",
  errorMsg = "Prázdný vstup",
  disabled,
  floatingProps,
}: Input) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
    if (event.target.value.length === 0) {
      setError(true);
    } else setError(false);
    console.log(input);
  };

  // const { context } = useFloating();

  // const click = useClick(floatingProps);
  // // const dismiss = useDismiss(context);
  // // // const hover = useHover(context);
  // // // const focus = useFocus(context);

  // const { getReferenceProps, getFloatingProps } = useInteractions([
  //   click,
  //   // dismiss,
  //   // hover,
  //   // focus,
  // ]);

  return (
    <div className={styles.inputBox} data-testid="input-box">
      {/* <button
        ref={floatingProps?.setReference}
        {...floatingProps?.getReferenceProps()}
      >
        open dropdown
      </button> */}
      <label
        data-testid="input-label"
        // className={`${styles.inputLabel} ${error && styles.inputLabelError}`}
      >
        {label ? label : "Label name"}
      </label>
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
