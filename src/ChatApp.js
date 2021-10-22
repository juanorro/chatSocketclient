import React from 'react'
import { AuthProvider } from './contexts/AuthContext';
import { ChatProvider } from './contexts/chat/ChatContext';
import { SocketProvider } from './contexts/SocketContext';
import { AppRouter } from './router/AppRouter';

export const ChatApp = () => {
  return (
    <ChatProvider>
      <AuthProvider>
        <SocketProvider>
          <AppRouter />
        </SocketProvider>
      </AuthProvider>
    </ChatProvider>
  )
}
