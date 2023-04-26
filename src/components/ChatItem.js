import React from 'react'
import { Avatar } from "@mui/material";

function ChatItem({user, image, msg}) {
  return (
    <div
    style={{ animationDelay: `0.8s` }}
    className={`chat__item ${user ? user : ""}`}
  >
    <div className="chat__item__content">
      <div className="chat__msg">{msg}</div>
      <div className="chat__meta">
        
      </div>
    </div>
    <Avatar src={image} />
  </div>
  )
}

export default ChatItem