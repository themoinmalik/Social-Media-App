import React from 'react';
import "./messenger.css";
import Conversation from '../../components/conversation/Conversation';
import Topbar from "../../components/topbar/Topbar";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";

export default function Messenger() {
  return (
    <>
    <Topbar />
    <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <Conversation/>
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            <Message/>
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline/>
          </div>
        </div>
      </div>
    </>
  )
}
