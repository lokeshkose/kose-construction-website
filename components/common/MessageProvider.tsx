import { message } from 'antd';
import React, { createContext, useContext } from 'react';

const MessageContext = createContext<{
  success: (msg: string) => void;
  error: (msg: string) => void;
} | null>(null);

export const MessageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [messageApi, contextHolder] = message.useMessage();

  const success = (msg: string) => {
    messageApi.open({
      type: 'success',
      content: msg,
      duration: 3,
    });
  };

  const error = (msg: string) => {
    messageApi.open({
      type: 'error',
      content: msg,
      duration: 3,
    });
  };

  return (
    <MessageContext.Provider value={{ success, error }}>
      {contextHolder}
      {children}
    </MessageContext.Provider>
  );
};

export const useMessageContext = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessageContext must be used within a MessageProvider');
  }
  return context;
};
