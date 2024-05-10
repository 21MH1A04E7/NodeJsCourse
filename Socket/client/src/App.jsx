import React, { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";

function App() {
  //if we won't pass url then it will look for default url
  // const socket = io("http://localhost:3000");//socket is changing every time

  const socket = useMemo(() => io("http://localhost:3000"), []);

  const [message, setMessage] = useState("");
  const [socketId, setScoketId] = useState("");
  const [roomId, setRoomId] = useState("");
  const [allmsg, setAllmsg] = useState([]);
  const [roomName,setRoomName]=useState("")
  // console.log(allmsg);
  // console.log(roomName)

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", { message, roomId });
    setMessage("");
    setRoomId("");
  };

  const handleSubmitroom=(e)=>{
    e.preventDefault();
    socket.emit("join-room",roomName)
    setRoomName("")
  }

  useEffect(() => {
    socket.on("connect", () => {
      setScoketId(socket.id);
      // console.log("connected", socket.id);
    });
    socket.on("get-message", (msg) => {
      // console.log(msg);
      setAllmsg((pre) => [...pre, msg]);
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
        <p className="text-green-700 font-bold text-sm mb-4">{socketId}</p>
        <form className="mb-1" onSubmit={handleSubmitroom}>
          <div className="flex gap-2">
            <input
              onChange={(e) => setRoomName(e.target.value)}
              type="text"
              value={roomName}
              placeholder="Enter your room"
              className="border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="bg-green-500 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
            >
              Join
            </button>
          </div>
        </form>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <input
              onChange={(e) => setMessage(e.target.value)}
              type="text"
              value={message}
              placeholder="Enter your message"
              className="border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            />
            <input
              onChange={(e) => setRoomId(e.target.value)}
              type="text"
              value={roomId}
              placeholder="Enter your Id"
              className="border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
            >
              Send
            </button>
          </div>
        </form>
        {allmsg.map((msg, index) => (
          <p key={index + msg} className="text-gray-500 font-bold text-sm mb-1">
            {msg.message}
          </p>
        ))}
      </div>
    </div>
  );
}

export default App;
