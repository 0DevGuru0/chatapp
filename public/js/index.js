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

  var locationbutton = jQuery('#send-location')
  locationbutton.on('click',function(){
      if(!navigator.geolocation){
        return alert('Geolocation not supportes by your browser.')
      }
      navigator.geolocation.getCurrentPosition(function(position){
        socket.emit('creategeolocation',{
          latitude:position.coords.latitude,
          longitude:position.coords.longitude
        })
      },function(){
        alert('Unable to fetch location.')
      })
  })

  socket.on('newLocationMessage',function(message){
    var app ="<li>"+message.from+":<a target='_blank' href="+message.url+">My Current Location</a></li>"
    console.log()
    // var latlon =
   // var url="https://maps.googleapis.com/maps/api/staticmap?center="+latlon+"&zoom=14&size=400x300&key=AIzaSyBu-916DdpKAjTmJNIgngS6HL_kDIKU0aU"
    $('#messages').append(app)
  })
})
