import React, { useEffect, useRef, useState } from 'react';
import IconButton from '@pages/apps/chat/app/components/buttons/icon';

import MicOutlinedIcon from '@mui/icons-material/MicOutlined';

import { mergeClassNames } from '@utils/common';

import styles from './style.module.scss';

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

type SpeechToTextProps = {
  onReceive: (text: string) => void;
  onError?: (e) => void;
  classes?: {
    root?: string;
    icon?: string;
  }
}

const SpeechToText: React.FC<SpeechToTextProps> = ({ onReceive, classes, onError }) => {
  const [duration, setDuration] = useState(0);
  const [active, setActive] = useState(false);
  const speechRecognition = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    initialize();

    return cleanUp;
  }, []);

  const initialize = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      return;
    }

    speechRecognition.current = new SpeechRecognition();
    speechRecognition.current.lang = window.navigator.language || "en-US";
    speechRecognition.current.maxAlternatives = 1;
    speechRecognition.current.continuous = true;
    speechRecognition.current.interimResults = false;

    speechRecognition.current.onerror = onReceiveError;
    speechRecognition.current.onresult = onResult;
  };

  const onResult = (data) => {
    const text = data.results[data.results.length-1]?.[0];

    if (text && text.confidence > 0) {
      onReceive(text.transcript);
    }
  };

  const onReceiveError = (e) => {
    if (onError) {
      onError(e);
    }
    setActive(false);
    toggleTimer(false);
    speechRecognition.current.stop();
  };

  const cleanUp = () => {
    clearInterval(intervalRef.current);

    if (speechRecognition.current) {
      speechRecognition.current = null;
    }
  };

  const onPressIn = () => {
    if (!speechRecognition.current) {
      return;
    }
    setActive(true);
    toggleTimer(true);
    speechRecognition.current.start();
  };

  const onPressOut = () => {
    if (!speechRecognition.current) {
      return;
    }
    setActive(false);
    toggleTimer(false);
    speechRecognition.current.stop();
  };

  const toggleTimer = (value: boolean) => {
    if (!value) {
      setDuration(0);
      clearInterval(intervalRef.current);
      return;
    }
    if (value) {
      intervalRef.current = setInterval(() => {
        setDuration((d) => d+1)
      }, 1000);
    }
  };

  return (
    <div className={mergeClassNames([styles.chatAppSpeechToText, classes?.root])}>
      <IconButton
        className={mergeClassNames([styles.icon, classes?.icon])}
        onMouseDown={onPressIn}
        onMouseUp={onPressOut}
      >
        <MicOutlinedIcon />
      </IconButton>
      {
        active && (
          <div className={styles.loader}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className={styles.dots} width="1em" height="1em">
              <circle fill="currentColor" stroke="currentColor" strokeWidth="24" r="15" cx="40" cy="100">
                <animate attributeName="opacity" calcMode="spline" dur="1.3" values="1;0;1;"
                         keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"/>
              </circle>
              <circle fill="currentColor" stroke="currentColor" strokeWidth="24" r="15" cx="100" cy="100">
                <animate attributeName="opacity" calcMode="spline" dur="1.3" values="1;0;1;"
                         keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2">
                </animate>
              </circle>
              <circle fill="currentColor" stroke="currentColor" strokeWidth="24" r="15" cx="160" cy="100">
                <animate attributeName="opacity" calcMode="spline" dur="1.3" values="1;0;1;"
                         keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"/>
              </circle>
            </svg>
            <span className={styles.duration}>{`${duration} s`}</span>
          </div>
        )
      }
    </div>
  );
};

export default SpeechToText;