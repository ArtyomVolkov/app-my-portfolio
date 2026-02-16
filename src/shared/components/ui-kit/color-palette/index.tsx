import React from "react";

import { mergeClassNames } from "@utils/common";

import styles from "./style.module.scss";

type Color = {
  name: string;
  hex: string;
};

type ColorPaletteProps = {
  colors: Array<Color>;
  name: string;
  active?: boolean;
  backgroundColor?: string;
  textColor?: string;
  outlineColor?: string;
  onSelect?: () => void;
};

const ColorPalette: React.FC<ColorPaletteProps> = ({
  name,
  colors,
  active = false,
  textColor,
  outlineColor,
  backgroundColor,
  onSelect,
}) => {
  const handleClick = () => {
    if (onSelect) {
      onSelect();
    }
  };

  return (
    <div
      className={mergeClassNames([
        styles.ColorPalette,
        active && styles.active,
      ])}
      onClick={handleClick}
      style={
        {
          width: `${(colors.length - 1) * 5}ch`,
          outlineColor: outlineColor || colors[0].hex,
          "--palette-shadow-color": textColor,
        } as React.CSSProperties
      }
    >
      <div className={styles.colors}>
        {colors.map((color) => (
          <div
            className={styles.colorBox}
            style={{ backgroundColor: color.hex, color: color.hex }}
            key={color.name}
          >
            <span className={styles.colorName}>{color.name}</span>
          </div>
        ))}
      </div>
      <div
        className={styles.caption}
        style={{
          backgroundColor: backgroundColor || colors[0].hex,
          color: textColor || colors[0].hex,
        }}
      >
        <span className={styles.captionText}>{name}</span>
      </div>
    </div>
  );
};

export default ColorPalette;
