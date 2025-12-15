import React, { useState } from "react";

import styles from "./style.module.scss";

type Option = {
  key: string;
  label: string;
};

type DropdownProps = {
  placeholder: string;
  options: Option[];
  onSelect?: (option: Option) => void;
};

const Dropdown: React.FC<DropdownProps> = ({
  options,
  placeholder,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onSelect) {
      onSelect(option);
    }
  };

  return (
    <div className={styles.Dropdown} onClick={toggleDropdown}>
      <span className={styles.placeholder}>
        {selectedOption ? selectedOption.label : placeholder}
      </span>
      <svg
        className={styles.arrowIcon}
        focusable="false"
        aria-hidden="true"
        viewBox="0 0 24 24"
        tabIndex={-1}
      >
        <path d="M16.62 2.99c-.49-.49-1.28-.49-1.77 0L6.54 11.3c-.39.39-.39 1.02 0 1.41l8.31 8.31c.49.49 1.28.49 1.77 0s.49-1.28 0-1.77L9.38 12l7.25-7.25c.48-.48.48-1.28-.01-1.76"></path>
      </svg>
      {isOpen && (
        <ul className={styles.options}>
          {options.map((option) => (
            <li
              key={option.key}
              className={styles.option}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
