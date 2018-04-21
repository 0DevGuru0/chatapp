const path     = require('path')
const http     = require('http')
const socketIO = require('socket.io')
const express  = require('express')
const {generateMessage,generateLocationMessage} = require('./utils/message')
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
  // socket.on("creategeolocation",function(coords){
  //   io.emit('newMessage',generateMessage('Admin',`${coords.latitude},${coords.longitude}`))
  // })
  socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'))

  socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined'))

  socket.on('createMessage',(message, callback)=>{
    console.log('createMessage',message)
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback();
  })
  socket.on('creategeolocation',function(coords){
    io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude))
  })



})
server.listen(port,()=>{
  console.log(`app started on port ${port}`)
})
