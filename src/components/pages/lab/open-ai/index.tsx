import React from "react";

import Main from "@components/main";
import Tabs from "@shared/components/ui-kit/tabs";
import TechnologyList from "@shared/components/lists/technologies";
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';
import GraphicEqRoundedIcon from '@mui/icons-material/GraphicEqRounded';

import TextGenTab from "@pages/lab/open-ai/tabs/text-gen";

import { TECHNOLOGIES } from "@pages/lab/open-ai/data";

import styles from "./style.module.scss";

const OpenAiPage = () => {
  return (
    <Main className={styles.openAIPage}>
      <h3>Open AI</h3>
      <TechnologyList data={TECHNOLOGIES} className={styles.technologyList} />
      <Tabs
        items={[
          {
            key: "text-completion",
            icon: <EditNoteRoundedIcon />,
            label: "Text Completion",
            component: <TextGenTab />,
          },
          {
            key: "image-generation",
            icon: <AddPhotoAlternateRoundedIcon />,
            label: "Image Generation",
            component: <div>Image Generation Content</div>,
          },
          {
            key: "code-generation",
            icon: <CodeRoundedIcon />,
            label: "Code Generation",
            component: <div>Code Generation Content</div>,
          },
          {
            key: "audio-processing",
            icon: <GraphicEqRoundedIcon />,
            label: "Audio Processing",
            component: <div>Audio Processing Content</div>,
          }
        ]}
      />
    </Main>
  );
};

export default OpenAiPage;
