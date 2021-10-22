import React from 'react';
import { InboxPeople } from '../components/Chat/InboxPeople';
import { Messages } from '../components/Messages/Messages';
import { ChatSelect } from '../components/Chat/ChatSelect';

import '../styles/chat.css';

export const ChatPage = () => {
  return (
    <div className="messaging">
        <div className="inbox_msg">
          <InboxPeople />
          <ChatSelect />
          {/* <Messages /> */}
        </div>
    </div>
  )
}
