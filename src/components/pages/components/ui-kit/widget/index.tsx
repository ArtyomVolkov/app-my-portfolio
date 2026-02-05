import React, { useState, useRef, useEffect } from "react";

import TABS from "@pages/components/ui-kit/widget/tabs";
import { ModalProvider } from "@shared/components/ui-kit/modal";
import { SnackbarProvider } from "@shared/components/ui-kit/snackbar";

import { mergeClassNames } from "@utils/common";

import styles from "./style.module.scss";

const UiKitWidget = () => {
  const previewRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<string>(TABS[0].key);

  const renderTabItem = () => {
    const tabItem = TABS.find((item) => item.key === activeTab);

    if (tabItem && tabItem.component) {
      return tabItem.component;
    }
    return null;
  };

  useEffect(() => {
    if (previewRef.current) {
      previewRef.current.scroll(0, 0);
    }
  }, [activeTab]);

  return (
    <div className={styles.uiKitWidget}>
      <div className={styles.layout}>
        <ModalProvider>
          <SnackbarProvider settings={{ position: "bottom-right", stackLimit: 3 }}>
            <ul className={styles.nav}>
              {TABS.map((item) => (
                <li
                  key={item.key}
                  className={mergeClassNames([
                    styles.navItem,
                    activeTab === item.key && styles.active,
                  ])}
                  onClick={() => setActiveTab(item.key)}
                >
                  {item.label}
                </li>
              ))}
            </ul>
            <div className={styles.preview} ref={previewRef}>
              {renderTabItem()}
            </div>
          </SnackbarProvider>
        </ModalProvider>
      </div>
    </div>
  );
};

export default UiKitWidget;
