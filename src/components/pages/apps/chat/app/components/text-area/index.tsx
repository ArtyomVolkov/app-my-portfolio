import React, { useEffect, useRef } from 'react';

import { mergeClassNames } from '@utils/common';

import styles from './style.module.scss';

export type TextAreaProps = {
  value?: string;
  placeholder?: string;
  autoComplete?: 'off',
  rows?: number,
  autoFocus?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  value,
  className,
  placeholder,
  autoComplete,
  onChange,
  rows = 3,
  autoFocus,
}) => {
  const textAreaRef = useRef(null);

  useEffect(() => {
    if (autoFocus) {
      textAreaRef?.current.focus();
    }
  }, [autoFocus]);

  return (
    <textarea
      name="textarea"
      placeholder={placeholder}
      rows={rows}
      ref={textAreaRef}
      autoComplete={autoComplete}
      className={mergeClassNames([styles.chatAppTextArea, className])}
      {...(onChange ? { onChange, value } : {})}
    />
  )
};

export default TextArea;