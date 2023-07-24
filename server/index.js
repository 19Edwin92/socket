const express = require("express");
const app = express();
const http = require("http");
const {Server} = require('socket.io')
const cors = require("cors");

app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
  cors : {
    origin:"http://localhost:3000",
    methods: ["GET", "POST"]
  }
})

io.on("connection", (socket)=>{
  
  socket.on("join_room", room=> {
    socket.join(room)
 })

  socket.on("send_message", (data)=> {
    // socket.broadcast.emit("receive_message", data)
    console.log(data);
    socket.to(data.room).emit("receive_message", data)
  })

})




server.listen(3001, ()=>{
  console.log("Server is Running");
})

// https://www.youtube.com/watch?v=djMy4QsPWiI


///
// io.on("connection", (socket)=>{
//   console.log(`Server Openning ${socket.id}`);
//   socket.on("send_message", (data)=> {
//     // socket.broadcast.emit("receive_message", data)
//     socket.to(data.room).emit("re")
//   })
// })





server.listen(3001, ()=>{
  console.log("Server is Running");
})

// https://www.youtube.com/watch?v=djMy4QsPWiI