import React, { useEffect, useCallback } from "react";
import debounce from "lodash/debounce";

import { mergeClassNames } from "@utils/common";

import styles from "./style.module.scss";

const DEBOUNCE = {
  delay: 250,
  leading: false,
  trailing: true,
};

const hideCheckFit = (
  ulRef: React.RefObject<HTMLUListElement>,
  list: NodeListOf<ChildNode>
) => {
  for (let i = 0; i < list.length - 1; i++) {
    if (ulRef.current.scrollWidth <= ulRef.current.clientWidth) {
      break;
    }
    if (i === 0) {
      const moreElement = list[list.length - 1] as HTMLLIElement;

      moreElement.classList.remove(styles.hidden);
      continue;
    }
    const liElement = list[list.length - 1 - i] as HTMLLIElement;

    liElement.classList.add(styles.hidden);
  }
};

const showCheckFit = (
  ulRef: React.RefObject<HTMLUListElement>,
  list: NodeListOf<ChildNode>
) => {
  const hiddenItems = [];
  let visibleContentWidth = 0;

  list.forEach((node) => {
    const liElement = node as HTMLLIElement;

    if (liElement.classList.contains(styles.hidden)) {
      hiddenItems.push(liElement);
      return;
    }
    visibleContentWidth += liElement.offsetWidth;
  });

  for (let i = 0; i < hiddenItems.length; i++) {
    const liElement = hiddenItems[i] as HTMLLIElement;

    if (liElement.classList.contains(styles.more)) {
      continue;
    }

    liElement.classList.remove(styles.hidden);

    if (
      visibleContentWidth + liElement.offsetWidth >
      ulRef.current.clientWidth
    ) {
      liElement.classList.add(styles.hidden);
      break;
    }
    visibleContentWidth += liElement.offsetWidth;
  }

  const hasHiddenItems = Array.from(list).some((node) => {
    const liElement = node as HTMLLIElement;

    return liElement.classList.contains(styles.hidden);
  });

  if (!hasHiddenItems) {
    const moreElement = list[list.length - 1] as HTMLLIElement;
    moreElement.classList.add(styles.hidden);
  }
};

export type BreadcrumbOption = {
  label: string;
  link?: string;
  icon?: React.ReactNode;
};

type BreadcrumbProps = {
  options: BreadcrumbOption[];
  onSelect?: (option: BreadcrumbOption, index: number) => void;
};

const Breadcrumb: React.FC<BreadcrumbProps> = ({ options, onSelect }) => {
  const ulRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!ulRef.current) {
      return;
    }
    checkFit();
    const resizeObserver = new ResizeObserver(checkFitDebounce);

    resizeObserver.observe(ulRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const checkFit = () => {
    if (!ulRef.current) {
      return;
    }
    const list = ulRef.current?.childNodes;
    let visibleContentWidth = 0;

    list.forEach((node) => {
      const liElement = node as HTMLLIElement;

      if (liElement.classList.contains(styles.hidden)) {
        return;
      }
      visibleContentWidth += liElement.offsetWidth;
    });

    console.log('check fit');
    if (visibleContentWidth < ulRef.current.clientWidth) {
      showCheckFit(ulRef, list);
    } else {
      hideCheckFit(ulRef, list);
    }
  };

  const checkFitDebounce = useCallback(
    debounce(checkFit, DEBOUNCE.delay, {
      leading: DEBOUNCE.leading,
      trailing: DEBOUNCE.trailing,
    }),
    [debounce]
  );

  const handleClick = (
    e: React.MouseEvent,
    option: BreadcrumbOption,
    index: number
  ) => {
    e.preventDefault();
    onSelect?.(option, index);
  };

  const renderItem = (option: BreadcrumbOption, index: number) => {
    return (
      <li
        key={index}
        className={mergeClassNames([
          styles.breadcrumbItem,
          index === options.length - 1 && styles.current,
        ])}
      >
        <a
          href={option.link || "#"}
          onClick={(e) => handleClick(e, option, index)}
          className={styles.breadcrumbLink}
        >
          {option.icon}
          {option.label}
        </a>
        {index < options.length - 1 && (
          <span className={styles.separator}>/</span>
        )}
      </li>
    );
  };

  return (
    <nav className={styles.Breadcrumb}>
      <ul className={styles.breadcrumbList} ref={ulRef}>
        {options.map(renderItem)}
        <li
          className={mergeClassNames([
            styles.breadcrumbItem,
            styles.more,
            styles.hidden,
          ])}
        >
          <span>More...</span>
        </li>
      </ul>
    </nav>
  );
};

export default Breadcrumb;
