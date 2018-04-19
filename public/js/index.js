var socket = io()
socket.on('connect',function(){
  console.log('connected to the server')
})
socket.on('disconnect',function(){
  console.log('disconnected from server')
})

socket.on('newMessage',function(message){//4//
  console.log('newMessage:',message)
  $("#messages").append("<li>"+message.from+":"+message.text+"</li>")
})


$(function(){
  $('#chatapp').on('submit',(e)=>{
    e.preventDefault()
    if($("[name=message]").val()){
      socket.emit('createMessage',{
        from:"User",
        text:$("[name=message]").val(),
        createdAt:new Date().getTime()
      })
    }else{
      alert("Type something.")
    }

  })
  $("#remove").on("click",function(e){
    e.preventDefault()
    $("#messages").empty()
  })
})
