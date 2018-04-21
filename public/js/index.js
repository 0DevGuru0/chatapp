var socket = io()
socket.on('connect',function(){
  console.log('connected to the server')
})
socket.on('disconnect',function(){
  console.log('disconnected from server')
})

socket.on('newMessage',function(message){//4//
  console.log('newMessage:',message)
  var formateDate = moment(message.createdAt).format('h:mm a')
  $("#messages").append("<li>"+message.from+" ("+formateDate+"):"+message.text+"</li>")
})


$(function(){
  $('#chatapp').on('submit',(e)=>{
    e.preventDefault()
    if($("[name=message]").val()){

        socket.emit('createMessage',{
          from:"User",
          text:$("[name=message]").val()
        },function(){
          $("[name=message]").val('')
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
      locationbutton.attr('disabled', 'disabled').text("sending Location...");
      navigator.geolocation.getCurrentPosition(function(position){

        locationbutton.removeAttr('disabled').text("Send Location");
        socket.emit('creategeolocation',{
          latitude:position.coords.latitude,
          longitude:position.coords.longitude
        })
      },function(){
        locationbutton.removeAttr('disabled').text("Send Location");
        alert('Unable to fetch location.')
      })
  })

  socket.on('newLocationMessage',function(message){
    var formatDate = moment(message.createdAt).format('h:mm a')
    var app ="<li>"+message.from+"("+formatDate+"):<img src='/css/location.png' width='35px' height='35px'/><a target='_blank' href="+message.url+">My Current Location</a></li>"
    console.log()
    // var latlon =
   // var url="https://maps.googleapis.com/maps/api/staticmap?center="+latlon+"&zoom=14&size=400x300&key=AIzaSyBu-916DdpKAjTmJNIgngS6HL_kDIKU0aU"
    $('#messages').append(app)
  })
})
