import React, { useEffect, useRef } from 'react';

import { mergeClassNames } from '@utils/common';

import styles from './style.module.scss';

export type TextInputProps = {
  value?: string;
  placeholder?: string;
  autoComplete?: 'off',
  autoFocus?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
  classes?: {
    root?: string;
    input?: string
  }
}

const TextInput: React.FC<TextInputProps> = ({ value, placeholder, autoComplete, autoFocus, onChange, classes }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (!inputRef?.current || !autoFocus) {
      return;
    }
    inputRef.current.focus();
  }, [value]);

  return (
    <div className={mergeClassNames([styles.chatAppTextInput, classes?.root])}>
      <input
        ref={inputRef}
        name="text-input"
        placeholder={placeholder}
        onChange={onChange}
        autoComplete={autoComplete}
        className={classes?.input}
        {...(onChange ? { value } : {})}
      />
    </div>
  )
};

export default TextInput;