import React, { useState } from "react";
import {useLocation, useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Avatar } from "@mui/material";
import ChatItem from "../components/ChatItem";
import "../css/ChatPage.css";
import logo from "../assets/images/ratlogo.png";
import BouncingDotsLoader from "../components/BouncingDot";
import axios from "axios";
import { toast } from "react-toastify";

function ChatPage() {
  const [chat, setChat] = useState([]);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate()
  const baseURL = 'https://rattelapp.herokuapp.com'

  const addMyChat = (msg) => {
    setLoading(true)
    var sent_chat = {
      key: chat.length + 1,
      image:
        "https://res.cloudinary.com/dvjfsm8rc/image/upload/v1673094715/profileImage3_kdkmcd.jpg",
      type: "",
      msg: msg,
    };
    setChat((prev) => [...prev, sent_chat]);
    const local_token = localStorage.getItem("token");
    const token = JSON.parse(local_token)

    if (token === null) {
      navigate("/login");
    } else {
      
      sendChat(token);
    } 
    setMsg("");
  };


  const handlekeyDown = (event) =>{
   
    if (event.key === 'Enter') {
      addMyChat(msg)
    }

   
  }


  const sendChat = async(token)=>{

    await axios.post(`${baseURL}/chat`,{"query_data":msg,"project_name":location.state.name}, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) =>{
        var recieved_msg = {
            key: Math.floor((Math.random() * 1000) + 1),
            image:
              "https://res.cloudinary.com/dvjfsm8rc/image/upload/v1682507893/aichatbot_o4bd1z.png",
            type: "other",
            msg: res.data.message,
          };
          
          setChat((prev) => [...prev, recieved_msg]);
          setLoading(false)
      }).catch((e)=>{
        setLoading(false)
        toast.error("Message couldn't send");
      })

  }


  return (
    <div className="main__chatcontent">
      <div className="content__header">
        <div className="blocks">
          <div className="current-chatting-user">
            <p>{location.state.name}</p>
          </div>
        </div>

        <div className="blocks">
          <div className="settings">
            <Avatar src={logo} />
          </div>
        </div>
      </div>
      <div className="content__body">
        <div className="chat__items">
          {chat.map((itm, index) => {
            return (
              <ChatItem
                animationDelay={index + 2}
                key={itm.key}
                user={itm.type ? itm.type : "me"}
                msg={itm.msg}
                image={itm.image}
              />
            );
          })}
        </div>
        <div className="chat__item load">
        {loading ? (
            <BouncingDotsLoader/>
          ) : (
            null
          )}
        </div>
      </div>

      <div className="content__footer">
        <div className="sendNewMessage">
          <button className="addFiles">
            <FontAwesomeIcon icon={faPlus} />
          </button>
          <input
            type="text"
            placeholder="Type a message here"
            onChange={(e) => {
              setMsg(e.target.value);
            }}
            onKeyDown={handlekeyDown}
            value={msg}
          />
          {loading?null:<button
            className="btnSendMsg"
            id="sendMsgBtn"
            onClick={() => addMyChat(msg)}
            
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>}
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
