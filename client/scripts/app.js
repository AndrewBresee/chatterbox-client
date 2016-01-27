// YOUR CODE HERE:

var app = {};

app.rooms = {}; 

app.banedChars = ['&','<', '>', '"', "'", '`', '!', '@', '$', '%', '(', ')', '=', '+', '{', '}', '[', ']'];

app.testItem = function(testItem){
    if (testItem !== undefined ) {
    for(var j=0; j<testItem.length ; j++){
      if (app.banedChars.indexOf(testItem[j]) >= 0) {
        return false;
      }
    }
  } else {
    return false;
  }
  return true;
}; 

//TO DO//

////Filter messages based on roomname 
//When seleceting roomname
//Update page head to roomname
//Filter messages for only roomname 

////Add rooms

////Submit 

////Refresh messages, automatically or with button

////When clicking on username, send message to user 




//Add rooms will interact with server, and not local html.
//When adding a room, it will push up to the server. 




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
      $.each(array, function(i, objects){
      $.each(objects, function (i, items){

      if(app.testItem(items.roomname)){
        if (app.rooms[items.roomname] === undefined){
          app.rooms[items.roomname] = items.roomname;
          app.addRoom(items.roomname);
        }
      }

      $('#roomSelect').on('change', function(){
        var room = $(this).val();
        if(room === items.roomname){
        console.log("test")
        if (app.testItem(items.username) && app.testItem(items.text)) {
          //Call roomfilter
          app.addMessage(items.username, items.text);
        }
      }   
      });

     

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

$('#roomSelect').on('change', function(){
  app.addMessage($(this).val());
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
