import React, { useEffect } from 'react';

import { useChatStore } from '../store/chat';

const ChatProvider = ({ children }) => {
  const { actions } = useChatStore((store) => store);

  useEffect(() => {
    actions.onInitChatData().then();

    return () => {
      actions.cleanUp();
    }
  }, []);

  return children;
};

export default ChatProvider;