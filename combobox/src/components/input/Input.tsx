import { ChangeEvent, useState } from "react";
import styles from "./Input.module.scss";

type Input = {
  label?: string;
  text?: string;
  disabled?: boolean;
  errorMsg?: string;
};

const Input = ({
  label = "Label inputu",
  text = "Uživatelský vstup",
  errorMsg = "Prázdný vstup",
  disabled,
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

  return (
    <div data-testid="input-box">
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
