// YOUR CODE HERE:

var app = {};

app.rooms = {}; 

app.banedChars = ['&','<', '>', '"', "'", '`', '!', '@', '$', '%', '(', ')', '=', '+', '{', '}', '[', ']'];

// A method to add unique rooms. Fetch will pull down unique room names, adding them to the dom. 
  // obj[4chan] === undefined
    //obj[4chan] = 4chan;
// Fix the legacy code in fetch --> getting chatbox add to work 

//Add rooms should only check if current room to be added is unique
//Add rooms will interact with server, and not local html.
//When adding a room, it will push up to the server. 



// for in loop
  // check app.rooms
    // if found 
      //true
    // false



app.server = 'https://api.parse.com/1/classes/chatterbox'; 

app.post = function(){
  $.ajax({
    url: this.server,
    type: 'POST',
    contentType: 'application/json',
  });

};

app.init = function () {

};

app.send = function (message) {
  $.ajax({
    url: this.server,
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      // var x = $('.chat-box .chat-ul').append('<div>'+arg+'</div>');
      //return data;
    }
  });
  return message; 
};

app.fetch = function(){
// fetch will gather the data
  // in fetch will receive the data
    // name
    // message
    // room

  // In room it should call to:
    // app.message
    // app.room


  // $.ajax({
  //   url:  this.server,
  //   type: 'GET',
  //   contentType: 'application/json',
  //   success: function (data) {
  //   $.each(data, function(i, item){
  //     $.each(item, function (i, object) {
  //       console.log(object.username);
  //       app[i] = object.username; 
  //       var x = $('.chat-box .chat-ul').append('<div>'+object.username+'</div>');
  //     });
  //   });
  // }

  // });

  $.ajax({
    url: this.server,
    type: 'GET',
    contentType: 'application/json',
    success: function (array) {
      console.log(array)
      $.each(array, function(i, objects){
      $.each(objects, function (i, items) {
        if(items.text !== undefined && items.username !== undefined ){
          var usernamePassed = true; 
          
          for(var i=0; i<items.username.length; i++){
              if (app.banedChars.indexOf(items.username[i]) >= 0){ 
                usernamePassed = false;
              }
          }

          var textPassed = true; 
          console.log("items: " , items)
          if ( items.text !== undefined ) {
          for(var j=0; j<items.text.length ; j++){
            if (app.banedChars.indexOf(items.text[i]) >= 0) {
              textPassed = false;
            }
          }
        }

           console.log("textPassed: ", textPassed);
           console.log("usernamePassed: ", usernamePassed);

          if(textPassed && usernamePassed){
            // $('#chats').append('<div>'+items.username+': '+items.text+'</div>');
            app.addMessage(items.username, items.text);
            if (app.rooms[items.roomname] === undefined){
              app.rooms[items.roomname] = items.roomname;
              app.addRoom(items.roomname);
            }
          }
         
        }
      });
      });   
    },
    error: function (request, errorType, errorMessage) {
      return 'sorry! '+ 'this is a '+ errorType+ ' message is '+ errorMessage;  
    }

  });


};

app.clearMessages = function(){
  $('#chats').children().remove(); 
};

app.addMessage = function (username, text) {
  // Add room should take the message sent from fetch
    // and add it intot the chats room with the name
  //console.log("Element test :", element);
    if (username !== undefined && text !== undefined) {  
      var linkedName = '<a href="#">'+ username +'</a>';
      var message = '<div class="userChat">'+linkedName+': '+ text+'</div>';
      $('#main #chats').append(message);
    }
};

app.addRoom = function(room){
  var rooms = document.getElementsByTagName('option');
  console.log("Rooms :", rooms);
  $('#roomSelect').append('<option value="'+room+'">'+room+'</option>'); 

    // var uniqRooms = [];
  // var rooms = document.getElementsByTagName('option');
  // console.log(rooms);
  // for ( var i = 0; i < rooms.length; i++ ) {
  //   if(rooms[i].value !== undefined && uniqRooms.indexOf(rooms[i].value) === -1){
      
  //     uniqRooms.push(rooms[i].value);
  //     $('#roomSelect').append('<option value="'+rooms[i].value+'">'+rooms[i].value+'</option>');     
  //   }
  // }
  

};



app.addFriend = function(){
  return true;
};

app.handleSubmit = function(mes){
    
};




$(document).ready(function () {
  app.fetch();

  $('div').on('click', '.username' ,function(){
    app.addFriend();
  });


  // $('.submit').on('click' ,function(event){
  //   var message = $('#message').val();
  //   app.handleSubmit(message); 
  //   event.stopPropagation();
  // });

$('input[type=text]').on('keypress' ,function(event){
    if (event.which === 13 ) {
      var msg = $(this).val()
      console.log(msg)
      $(this).val("");
    }
    // var message = $('#message').val();
    // app.handleSubmit(message); 
    // event.stopPropagation();
  });

app.addRoom();


  var $chatbox = $('.chat-box');
  var $chatul = $('.chat-ul');
 

});
