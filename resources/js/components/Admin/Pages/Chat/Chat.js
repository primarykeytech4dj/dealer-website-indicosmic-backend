import React, { useRef, useState } from "react";
import ReactScrollToBottom from 'react-scroll-to-bottom'
import socketIo from "socket.io-client"

import "./Chat.css"
import Message from "../Message/Message";
import MaterialTextArea from "../../../../Tags/MaterialTextArea";
import { useEffect } from "react";

let socket;
let user="nikhil";

const ENDPOINT="http://localhost:4500/"

 const Chat= ()=>{
  const [showchat,setShowchat]=useState({
      chat:false
  })
  const [id,setId]=useState()
  const [message,setMessage]=useState([])

  const hiddenFileInput =useRef()
  const handleClick =( event) => {
    hiddenFileInput.current.click() 
  };
  const onclick=()=>{
      setShowchat({chat:!showchat.chat})
  };


  const send = () => {
    const message = document.getElementById('chatInput').value;
    socket.emit('message', { message, id });
    document.getElementById('chatInput').value = "";
}

// console.log("message",message);


  useEffect(()=>{
   
    socket=socketIo(ENDPOINT,{transports:['websocket']})

    socket.on('connect', () => {
        alert('Connected');
        setId(socket.id);

    })
    console.log(socket);
    socket.emit('joined', { user })

    socket.on('welcome', (data) => {
        setMessage([...message, data]);
        console.log(data.user, data.message);
    })

    socket.on('userJoined', (data) => {
        setMessage([...message, data]);
        console.log(data.user, data.message);
    })

    socket.on('leave', (data) => {
        setMessage([...message, data]);
        console.log(data.user, data.message)
    })

    return () => {
        socket.emit('disconnect');
        socket.off();
    }

  },[])

  useEffect(()=>{
      socket.on('sendMessage', (data) => {
        setMessage([...message, data]);
        //console.log(data.user, data.message, data.id);
    })
    return () => {
        socket.off();
    }

  },[message])





  return(<>

    

    <input type="checkbox" id="check"/> 
   
    <label className="chat-btn" for="check" onClick={onclick} >
      <i className="fa fa-commenting-o comment"></i> <i className="fa fa-close close"></i> 
    </label>
   
   

    {showchat.chat?
    <div className="wrapper">
      <div className="header"> <h6 className="header-text">Let's Chat - Online</h6> </div> 
      {/* <div className="text-center p-2"> <span>Please fill out the form to start chat!</span> </div> */}
      <ReactScrollToBottom className="chat-form">
        
      
        {message.map((item, i) => <Message user={item.id === id ? '' : item.user} message={item.message} classs={item.id === id ? 'right' : 'left'} />)}
        
  
      </ReactScrollToBottom> 
      <div className="row">
        <div className="col-md-12 d-flex justify-content-center">
        {/* <input   type="text" placeholder="Type a message..." /> */}
        <MaterialTextArea className="input-field" onKeyPress={(event) => event.key === 'Enter' ? send() : null}  type="text" id="chatInput" placeholder="Type a message..." />   
        <button  onClick={handleClick}>           
          <i className="fa fa-fw fa-paperclip"> <input type="file"  accept="image/png, image/gif, image/jpeg" hidden ref={ hiddenFileInput} /></i>
          </button>
        <button type="submit"> <i className="fa fa-fw fa-paper-plane"></i></button>
        </div>        
      </div>
      {/* <div class="bottom-bar">
          <div class="chat">
            <input type="text" placeholder="Type a message..." />
            <button type="submit"><i class="fas fa-paper-plane"></i></button>
          </div>
      </div> */}
    </div>
    :""}


  
  




  
          
  </>)
}

export default Chat