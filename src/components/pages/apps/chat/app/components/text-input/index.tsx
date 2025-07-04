import React from 'react';

import { mergeClassNames } from '@utils/common';

import styles from './style.module.scss';

export type TextInputProps = {
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
  classes?: {
    root?: string;
    input?: string
  }
}

const TextInput: React.FC<TextInputProps> = ({ placeholder, onChange, classes }) => {
  return (
    <div className={mergeClassNames([styles.chatAppTextInput, classes?.root])}>
      <input
        name="text-input"
        placeholder={placeholder}
        onChange={onChange}
        className={classes?.input}
      />
    </div>
  )
};

export default TextInput;