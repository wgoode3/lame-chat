import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';

function App() {

  const [socket] = useState(io(':8000'));
  const [user, setUser] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  socket.on("hello", data => {
    console.log(data);
  });

  
  useEffect( () => {
    let name = prompt("your name");
    setUser(name);
  }, []);
  
  const sendMessage = e => {
    e.preventDefault();
    setMessages([...messages, {message, user}]);
    socket.emit("sentMessage", {message, user})
    setMessage("");
  }
  
  socket.on("receiveMessage", data => {
    console.log(data);
    setMessages([...messages, data]);
  });

  return (
    <div>
      <h1>Chat</h1>
      <ul>
        {messages.map( (msg, i) =>
          <li key={i}><strong>{msg.user} says</strong> {msg.message}</li> 
        )}
      </ul>
      <form onSubmit={ sendMessage }>
        <textarea onChange={e => setMessage(e.target.value)} value={message}></textarea>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;
