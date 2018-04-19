const path     = require('path')
const http     = require('http')
const socketIO = require('socket.io')
const express  = require('express')
const {generateMessage} = require('./utils/message')
var app    = express()
const port = process.env.PORT || 3000
var server = http.createServer(app)
var io     = socketIO(server)

var publicPath = path.join(__dirname + '/../public')
app.use(express.static(publicPath))

io.on('connection',(socket)=>{
  console.log('New User Connected.')

  socket.on('disconnect',()=>{
    console.log('user was disconnected.')
  })
  socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'))
  socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined'))
  //2//
  socket.on('createMessage',(message)=>{
    console.log('createMessage',message)
    // socket.emit('newMessage',generateMessage(message.from,message.text))
    socket.broadcast.emit('newMessage',generateMessage(message.from,message.text))
  })
})

server.listen(port,()=>{
  console.log(`app started on port ${port}`)
})
