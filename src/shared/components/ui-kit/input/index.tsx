import React, { useEffect, useState } from "react";

import { mergeClassNames } from "@utils/common";

import styles from "./style.module.scss";

type TextareaProps = {
  fullWidth?: boolean;
  multiline?: boolean;
  rows?: number;
  resize?: boolean;
} &  React.InputHTMLAttributes<HTMLTextAreaElement>

type InputProps = {
  type?: "text" | "password" | "email" | "number";
  dimension?: "small" | "medium" | "large";
  color?: "success" | "warning" | "error";
  name?: string;
  error?: boolean;
  label?: string;
  hint?: string;
  startIcon?: React.ReactNode | string;
  endIcon?: React.ReactNode;
  placeholder?: string;
  value?: string | number;
  classes?: {
    container?: string;
    input?: string;
    label?: string;
    hint?: string;
  };
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    value?: string | number,
  ) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

type InputFieldProps = InputProps & TextareaProps;

const Input: React.FC<InputFieldProps> = ({
  type = "text",
  name = "input-field",
  dimension = "medium",
  fullWidth = false,
  multiline = false,
  rows = 1,
  resize = false,
  error = false,
  color = error ? "error" : "default",
  hint,
  label,
  startIcon,
  endIcon,
  placeholder,
  value,
  onChange,
  classes,
  ...rest
}) => {
  const [focused, setFocused] = useState(false);
  const [inputValue, setInputValue] = useState(value || "");

  useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const inputValue = e.target.value;

    setInputValue(inputValue);

    if (!onChange) {
      return;
    }
    onChange(e, type === "number" ? toValidNumber(inputValue) : inputValue);
  };

  const toValidNumber = (value: string) => {
    const reg = /^-?\d*(\.\d*)?$/;

    if (reg.test(value)) {
      return String(Number(value));
    }
    return "";
  };

  const onBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFocused(false);

    if (type !== "number") {
      return;
    }
    const value = toValidNumber(e.target.value);

    e.target.value = value;
    setInputValue(value);

    if (onChange) {
      onChange(e, value);
    }
  };

  const onFocus = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFocused(true);
  };

  const renderComponent = () => {
    if (multiline) {
      return (
        <textarea
          name={name}
          rows={rows}
          style={{
            maxWidth: fullWidth ? "100%" : "unset",
            flexGrow: fullWidth ? 1 : 0,
            resize: resize ? (fullWidth ? "vertical" : "both") : "none",
          }}
          placeholder={!focused ? placeholder : ""}
          onFocus={onFocus}
          onBlur={onBlur}
          value={inputValue}
          onChange={handleChange}
          className={mergeClassNames([styles.input, classes?.input])}
          {...rest}
        />
      );
    }
    return (
      <input
        type={type}
        name={name}
        placeholder={!focused ? placeholder : ""}
        onFocus={() => setFocused(true)}
        onBlur={onBlur}
        value={inputValue}
        onChange={handleChange}
        className={mergeClassNames([styles.input, classes?.input])}
        {...rest}
      />
    );
  };

  return (
    <div
      className={mergeClassNames([
        styles.InputField,
        styles[color],
        fullWidth && styles.fullWidth,
      ])}
    >
      <div
        className={mergeClassNames([
          styles.Input,
          focused && styles.focused,
          inputValue && styles.filled,
          styles[dimension],
          classes?.container,
        ])}
      >
        {startIcon && <span className={styles.startIcon}>{startIcon}</span>}
        {renderComponent()}
        <fieldset className={mergeClassNames([label && styles.withLabel])}>
          {label && (
            <legend>
              <span>{label}</span>
            </legend>
          )}
        </fieldset>
        {endIcon && <span className={styles.endIcon}>{endIcon}</span>}
      </div>
      {hint && (
        <p className={mergeClassNames([styles.hint, classes?.hint])}>{hint}</p>
      )}
    </div>
  );
};

export default Input;
