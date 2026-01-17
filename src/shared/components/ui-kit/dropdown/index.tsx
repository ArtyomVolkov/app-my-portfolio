import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { debounce, mergeClassNames } from "@utils/common";

import styles from "./style.module.scss";

const defaultStyles = {
  minWidth: 170,
  maxWidth: 320,
};

type Option = {
  key: string;
  label: string;
  startIcon?: string;
  endIcon?: string;
};

type DropdownProps = {
  placeholder: string;
  options: Option[];
  defaultSelected?: string | string[];
  multiple?: boolean;
  fullWidth?: boolean;
  onSelect?: (option: Option | Option[] | null) => void;
  minWidth?: number;
  maxWidth?: number;
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  classes?: {
    button?: string;
    options?: string;
    option?: string;
    arrowIcon?: string;
  };
};

const Dropdown: React.FC<DropdownProps> = ({
  options,
  placeholder,
  onSelect,
  multiple = false,
  disabled = false,
  defaultSelected = "",
  fullWidth = false,
  size = "medium",
  minWidth = defaultStyles.minWidth,
  maxWidth = defaultStyles.maxWidth,
  classes = {},
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string[]>(() => {
    if (multiple) {
      return options
        .filter((option) => defaultSelected.includes(option.key))
        .map((opt) => opt.key);
    }
    const option =
      options.find((option) => option.key === defaultSelected)?.key || null;

    return defaultSelected && option ? [option] : [];
  });
  const dbRef = React.useRef<HTMLDivElement>(null);
  const optionsRef = React.useRef<HTMLUListElement>(null);
  const [layout, setLayout] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    anchor: "bottom",
  });

  useEffect(() => {
    window.addEventListener("resize", updateLayoutDebounced);

    return () => {
      window.removeEventListener("resize", updateLayoutDebounced);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      autoScrollToSelectedOption();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    updateLayout();
  }, [isOpen, selectedOption]);

  const updateLayout = () => {
    const rect = dbRef.current?.getBoundingClientRect();
    const optionsHeight = optionsRef.current?.offsetHeight || 0;
    const paddingOffset = 8; // some extra space between dropdown and viewport edge
    const anchor =
      rect.y + rect.height + optionsHeight + paddingOffset > window.innerHeight
        ? "top"
        : "bottom";

    if (rect) {
      setLayout({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
        height: rect.height,
        anchor: anchor,
      });
    }
  };

  const autoScrollToSelectedOption = () => {
    if (!optionsRef.current || !selectedOption) {
      return;
    }
    const option = !multiple
      ? selectedOption
      : selectedOption[selectedOption.length - 1];

    if (!option) {
      return;
    }

    const selectedOptionElement = optionsRef.current.querySelector(
      `li[data-name="option-${option}"]`
    ) as HTMLLIElement;

    if (!selectedOptionElement) {
      return;
    }

    optionsRef.current.scrollTo({
      top:
        selectedOptionElement.offsetTop -
        optionsRef.current.clientHeight / 2 +
        selectedOptionElement.clientHeight / 2,
      behavior: "auto",
    });
  };

  const updateLayoutDebounced = debounce(updateLayout, 250);

  const onToggleDropdown = () => {
    if (isOpen) {
      setIsOpen(false);
      return;
    }
    updateLayout();
    setIsOpen(true);
  };

  const handleWrapperClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
  };

  const handleOptionClick = (option: Option) => {
    if (!multiple) {
      const selected = selectedOption.includes(option.key) ? [] : [option.key];

      setSelectedOption(selected);
      setIsOpen(false);

      if (onSelect) {
        onSelect(selected.length === 0 ? null : option);
      }
      return;
    }

    let selected = [...selectedOption];

    if (selectedOption.includes(option.key)) {
      selected = selected.filter((key) => key !== option.key);
    } else {
      selected.push(option.key);
    }
    setSelectedOption(selected);

    if (onSelect) {
      const selectedOptions = options.filter((opt) =>
        selected.includes(opt.key)
      );
      onSelect(selectedOptions.length === 0 ? null : selectedOptions);
    }
  };

  const renderSelectedOptions = () => {
    const selectedOptions = options.filter((option) =>
      selectedOption.includes(option.key)
    );

    if (multiple) {
      return (
        <>
          {selectedOptions.map((opt) => (
            <span
              key={opt.key}
              className={styles.optionTag}
              style={{ maxWidth: minWidth - 60 }}
            >
              {opt.label}
            </span>
          ))}
        </>
      );
    }
    return (
      <span className={styles.optionText}>
        {selectedOptions[0]?.label || null}
      </span>
    );
  };

  return (
    <div
      className={mergeClassNames([
        styles.Dropdown,
        classes.button,
        fullWidth && styles.fullWidth,
        multiple && styles.multiple,
        isOpen && styles.open,
      ])}
      data-size={size}
      data-disabled={disabled}
      onClick={onToggleDropdown}
      ref={dbRef}
      tabIndex={0}
      style={{ minWidth: minWidth, maxWidth: fullWidth ? "100%" : maxWidth }}
    >
      {!selectedOption.length && (
        <span className={styles.placeholder}>{placeholder}</span>
      )}
      {selectedOption.length > 0 && (
        <span className={styles.selectedOptions}>
          {renderSelectedOptions()}
        </span>
      )}
      <svg
        className={styles.arrowIcon}
        focusable="false"
        viewBox="0 0 24 24"
        tabIndex={-1}
      >
        <path d="M16.62 2.99c-.49-.49-1.28-.49-1.77 0L6.54 11.3c-.39.39-.39 1.02 0 1.41l8.31 8.31c.49.49 1.28.49 1.77 0s.49-1.28 0-1.77L9.38 12l7.25-7.25c.48-.48.48-1.28-.01-1.76"></path>
      </svg>
      {isOpen &&
        createPortal(
          <div className={styles.DropdownWrapper} onClick={handleWrapperClick}>
            <div
              className={styles.dropdownMenu}
              onClick={(e) => e.stopPropagation()}
              data-anchor={layout.anchor}
              data-size={size}
              style={
                {
                  top: layout.top + layout.height + 4,
                  left: layout.left,
                  width: layout.width,
                  maxWidth: fullWidth ? "100%" : maxWidth,
                  "--db-offset":
                    layout.anchor === "bottom"
                      ? `${-(layout.height + 8)}px`
                      : `${layout.height + 8}px`,
                } as React.CSSProperties
              }
            >
              <ul
                className={mergeClassNames([styles.options, classes.options])}
                ref={optionsRef}
              >
                {options.map(({ key, label, startIcon, endIcon }) => (
                  <li
                    key={key}
                    data-name={`option-${key}`}
                    className={mergeClassNames([
                      styles.option,
                      selectedOption.includes(key) && styles.selected,
                    ])}
                    onClick={() => handleOptionClick({ key, label })}
                  >
                    {startIcon && (
                      <span className={styles.icon}>{startIcon}</span>
                    )}
                    <span className={styles.text}>{label}</span>
                    {endIcon && <span className={styles.icon}>{endIcon}</span>}
                  </li>
                ))}
              </ul>
            </div>
          </div>,
          document.body,
          "dropdown-portal"
        )}
    </div>
  );
};

export default Dropdown;
