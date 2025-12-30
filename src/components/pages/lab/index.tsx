import React from "react";

import Main from "@components/main";
import NavButton from "@shared/components/buttons/navigation";
import OpenAiIcon from "@shared/icons/open-ai";

import styles from "./style.module.scss";

const LabPage = () => {
  return (
    <Main className={styles.labPage}>
      <NavButton
        path="/lab/open-ai"
        title="Open AI"
        icon={<OpenAiIcon className="icon" />}
      />
    </Main>
  );
};

export default LabPage;
