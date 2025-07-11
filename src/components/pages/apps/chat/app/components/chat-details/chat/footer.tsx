import React, { useEffect, useState } from 'react';

import TextArea from '@pages/apps/chat/app/components/text-area';
import IconButton from '@pages/apps/chat/app/components/buttons/icon';
import SpeechToText from '@pages/apps/chat/app/components/buttons/speech-to-text';
import SelectImage from '@pages/apps/chat/app/components/buttons/select-image';
import SendRoundedIcon from '@mui/icons-material/SendRounded';

import { mergeClassNames } from '@utils/common';

import { useChatStore } from '@pages/apps/chat/app/store/chat';
import { useSnackbar } from '../../../store/snackbar';

import styles from './style.module.scss';

type ChatFooterProps = {
  chatId?: string;
  className?: string;
}

const ChatFooter: React.FC<ChatFooterProps> = ({ chatId, className }) => {
  const snackbar = useSnackbar((store) => store);
  const actions = useChatStore((store) => store.actions);
  const [textMessage, setTextMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [file, setFile] = useState({
    data: null,
    preview: null,
  });

  useEffect(() => {
    return () => {
      onReset();
    }
  }, [chatId]);

  const onReset = () => {
    setTextMessage('');
    if (file.preview) {
      onClearPreview();
    }
  };

  const handleInputChange = (e) => {
    setTextMessage(e.target.value);
  };

  const handleSubmit = async () => {
    setSending(true);
    await actions.onSendMessage(textMessage.trim(), file.data);
    setTextMessage('');
    onClearPreview();
    setSending(false);
  };

  const onReceiveText = (text: string) => {
    setTextMessage((value) => {
      return value + `${value.length > 0 ? ' ' : ''}${text}`;
    });
  };

  const onSpeechError = (e) => {
    snackbar.open({
      key: 'speech-to-text',
      autoHide: 3000,
      closeButton: true,
      variant: 'warning',
      content: (
       <div>
         <span>Unable to transform speech to text</span>
         &nbsp;
         <span>{`Reason: ${e.message || e.error}`}</span>
       </div>
      )
    });
  };

  const onSelectFile = (file, preview) => {
    setFile({
      data: file,
      preview
    });
  };

  const onClearPreview = () => {
    setFile({
      data: null,
      preview: null
    });
  }

  return (
    <div className={mergeClassNames([styles.footer, className, sending && styles.sendData])}>
      {
        file.data && (
          <div className={styles.previewBox}>
            <span className={styles.close} role="button" onClick={onClearPreview}>✖</span>
            <img src={file.preview} alt={file.data.name} />
          </div>
        )
      }
      <SpeechToText
        classes={{ icon: styles.microphoneIcon }}
        onReceive={onReceiveText}
        onError={onSpeechError}
      />
      <TextArea
        value={textMessage}
        rows={3}
        onChange={handleInputChange}
        autoFocus={true}
        className={styles.textArea}
      />
      <div className={styles.actions}>
       <SelectImage
         className={styles.imageIcon}
         onSelect={onSelectFile}
       />
        <IconButton
          className={styles.sendIcon}
          onClick={handleSubmit}
          disabled={!file.data && !textMessage.trim().length}
        >
          <SendRoundedIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default ChatFooter;