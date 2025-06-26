import './App.css';
import gptLogo from './assets/chatgpt.svg';
import React, { useEffect, useState } from 'react';
import addBtn from './assets/add-30.png';
import msgIcon from './assets/message.svg';
import home from './assets/home.svg';
import saved from './assets/bookmark.svg';
import rocket from './assets/rocket.svg';
import sendBtn from './assets/send.svg';
import userIcon from './assets/user-icon.jpg';
import gptImageLogo from './assets/chatgptLogo.svg';
import { sendMessageToOpenAI } from './openai';
import { useRef } from 'react';

function App() {

  const msgEnd = useRef(null);


  const [input, setInput] = useState("");
  const[messages, setMessages] = useState([
    {
    text: "Hi, I am ChatGPT, your AI assistant. How can I help you today?",
    isBot: true
    }
  ]);

  useEffect(() => {
    if (msgEnd.current) {
      msgEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages.length]);

  const handleSendMessage = async () => {
    const text = input;
    setInput("");
    if (!text.trim()) return;

    setMessages([
      ...messages,
      {
        text: text,
        isBot: false
      }
    ])

    const response = await sendMessageToOpenAI(input);
    setMessages([
      ...messages,
      {
        text: text,
        isBot: false
      },
      {
        text: response,
        isBot: true
      } 
    ]);
  }

  const handleQuery = async (e) => {
    const text = e.target.value;
    if (!text.trim()) return;

    setMessages([
      ...messages,
      {
        text: text,
        isBot: false
      }
    ])

    const response = await sendMessageToOpenAI(input);
    setMessages([
      ...messages,
      {
        text: response,
        isBot: true
      } 
    ]);
  }

  return (
    <div className="App">
      <div className="side-bar">
        <div className="upperSide">
          <div className="upperSideTop">
            <img src={gptLogo} alt="Logo" className="logo" /><span className="brand">ChatGPT</span>
          </div>
          <button className="midBtn" onClick={() => {window.location.reload()}}><img src={addBtn} alt="new chat" className="addBtn" />New Chat</button>
          <div className="upperSideBottom">
            <button className="query" onClick={handleQuery} value={"What is programming ?"}><img src={msgIcon} alt="Query" /> What is programming ?</button>
            <button className="query" onClick={handleQuery} value="How to use an API ?"><img src={msgIcon} alt="Query" /> How to use an API ?</button>
          </div>
        </div>
        <div className="lowerSide">
          <div className="listItems"><img src={home} alt="Home" className="listItemsImg"/>Home</div>
          <div className="listItems"><img src={saved} alt="Saved" className="listItemsImg"/>Saved</div>
          <div className="listItems"><img src={rocket} alt="Upgrade" className="listItemsImg"/>Upgrade To Pro</div>
        </div>
      </div>
      <div className="main">
        <div className="chats">
          {messages.map((message, index) => 
            <div key={index} className={message.isBot ? "chat bot" : "chat"}>
              <img src={message.isBot ? gptImageLogo: userIcon} className="chatImg" alt="GPT" /><p className="txt">{message.text}</p>
            </div>
          )}
          <div ref={msgEnd}/> 
        </div>
        <div className="chatFooter">
          <form className="inp" onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}>
            <input type="text" placeholder="Send a message" value={input} onChange={(e)=>{setInput(e.target.value)}} />
            <button type="submit" className="send" onClick={handleSendMessage}><img src={sendBtn} alt="Send"/></button>
          </form>
          <p>
            ChatGPT may produce inaccurate information about people, places, or facts. ChatGPT May 12 Version.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
