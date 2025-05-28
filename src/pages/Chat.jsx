import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaSmile, FaUsers } from 'react-icons/fa';

const Chat = () => {
  const [messages, setMessages] = useState([
    { id: 1, user: 'Rahul Sharma', message: 'Hey everyone! How are the preparations for the quantum mechanics exam going?', time: '10:30 AM', isOwn: false },
    { id: 2, user: 'You', message: 'Going well! Just finished Chapter 3. The wave functions are getting complex though.', time: '10:32 AM', isOwn: true },
    { id: 3, user: 'Priya Singh', message: 'Same here! Can someone explain the Schrödinger equation derivation?', time: '10:35 AM', isOwn: false },
    { id: 4, user: 'Amit Kumar', message: 'I can help with that. Let me share some notes after this chat.', time: '10:36 AM', isOwn: false }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [activeUsers] = useState(['Rahul Sharma', 'Priya Singh', 'Amit Kumar', 'Neha Gupta', 'Vikash Yadav']);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        user: 'You',
        message: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: true
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const formatTime = (time) => {
    return time;
  };

  return (
    <div className="chat-page">
      <div className="chat-container">
        {/* Chat Header */}
        <div className="chat-header">
          <h2>MSc Physics Group Chat</h2>
          <div className="active-users">
            <FaUsers />
            <span>{activeUsers.length} online</span>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="chat-main">
          {/* Active Users Sidebar */}
          <div className="users-sidebar">
            <h3>Active Users</h3>
            <div className="users-list">
              {activeUsers.map((user, index) => (
                <div key={index} className="user-item">
                  <div className="user-avatar">
                    {user.charAt(0).toUpperCase()}
                  </div>
                  <span>{user}</span>
                  <div className="online-indicator"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Messages Area */}
          <div className="messages-area">
            <div className="messages-container">
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  className={`message ${message.isOwn ? 'own' : 'other'}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  {!message.isOwn && (
                    <div className="message-avatar">
                      {message.user.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="message-content">
                    {!message.isOwn && <div className="message-user">{message.user}</div>}
                    <div className="message-text">{message.message}</div>
                    <div className="message-time">{formatTime(message.time)}</div>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <form className="message-form" onSubmit={sendMessage}>
              <div className="input-container">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="message-input"
                />
                <button type="button" className="emoji-btn">
                  <FaSmile />
                </button>
                <button type="submit" className="send-btn" disabled={!newMessage.trim()}>
                  <FaPaperPlane />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
