import React, { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";

function App() {
  //if we won't pass url then it will look for default url
  // const socket = io("http://localhost:3000");//socket is changing every time

  const socket=useMemo(()=>io("http://localhost:3000"),[])

  const [message,setMessage]=useState("")
  const [socketId,setScoketId]=useState("")
  const [room,setRoom]=useState("")
  
  const handleSubmit=(e)=>{
    e.preventDefault()
    socket.emit("message",message)
    setMessage("")
  }

  useEffect(() => {
    socket.on("connect", () => {
      setScoketId(socket.id)
      console.log("connected", socket.id);
    });
    socket.on("get-message", (msg) => {
      console.log(msg);
    });

    //all disconnect
    return () => {
      socket.disconnect();
    };
  }, [socket]);
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-6 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-blue-500 font-bold text-lg mb-4">
          Welcome to Socket.io
        </h2>
        <h2 className="text-blue-500 font-bold text-lg mb-4">
          {socketId}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <input
              onChange={(e)=>setMessage(e.target.value)}
              type="text"
              value={message}
              placeholder="Enter your message"
              className="border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            />
            <button
              type='submit'
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
