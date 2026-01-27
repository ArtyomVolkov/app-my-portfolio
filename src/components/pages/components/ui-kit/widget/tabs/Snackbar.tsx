import React from "react";

import Divider from "@shared/components/ui-kit/divider";
import Button from "@shared/components/ui-kit/button";
import Section from "@shared/components/section";
import { useSnackbar } from "@shared/components/ui-kit/snackbar";

import styles from "./style.module.scss";

const SnackbarTab = () => {
  const snackbar = useSnackbar();

  const openSnackbar = () => {
    snackbar.open({
      autoHide: false,
      // duration: 3000,
      stackLimit: 3,
      position: "top-center",
      onClose: () => {
        console.log("Snackbar closed");
      },
      message: "This is a snackbar message!",
    });
  };

  const closeSnackbar = () => {
    snackbar.close();
  };

  return (
    <div className={styles.TabContent}>
      <h2 className={styles.title}>Snackbar</h2>
      <p className={styles.subtitle}>
        A snackbar is a brief message that appears at the bottom of the screen
        to inform users about an action or event.
      </p>
      <div className={styles.examples}>
        <Section title="Snackbar Variants">
          <article className={styles.article}>
            <Divider title="Top Center" align="left" />
            <div className={styles.row}>
              <Button color="primary" onClick={openSnackbar}>
                Open Snackbar
              </Button>
              <Button
                variant="outlined"
                onClick={closeSnackbar}
                className={styles.closeButton}
              >
                Close Snackbar
              </Button>
            </div>
          </article>
        </Section>
      </div>
    </div>
  );
};

export default SnackbarTab;
