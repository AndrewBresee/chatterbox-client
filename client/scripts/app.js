// YOUR CODE HERE:

var app = {};

app.post = function(){
  $.ajax({
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    contentType: 'application/json',
  });

};

app.init = function () {

};

app.send = function (message) {
  $.ajax({
    url: 'https://api.parse.com/1/classes/chatterbox',
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
  $.ajax({
    url: undefined,
    type: 'GET',
    contentType: 'application/json',
    success: function (data) {
    $.each(data, function(i, item){
      $.each(item, function (i, object) {
        console.log(object.username);
        app[i] = object.username; 
        var x = $('.chat-box .chat-ul').append('<div>'+object.username+'</div>');
      });
    });
  }

  });
};

app.clearMessages = function(){
  $('#chats').children().remove(); 
};

app.addMessage = function (obj) {
  //console.log("Element test :", element);
  var linkedName = '<a href="#"><div class="username">'+ obj.username +'</div></a>';
  var message = '<div>'+ linkedName +': '+ obj.text+'</div>';

  $('#main #chats').append(message);
};

app.addRoom = function(room){
  $('#roomSelect').append('<div>'+room+'</div>');
};


app.addFriend = function(){
  return true;
};

app.handleSubmit = function(mes){
  console.log("HandleSubmit: ",mes); 
  return true;
};









$(document).ready(function () {

  $('div').on('click', '.username' ,function(){
    app.addFriend();
  });


  $('.submit').on('click' ,function(event){
    var message = $('#message').val();
    app.handleSubmit(message); 
    event.stopPropagation();
  });



//   var $chatbox = $('.chat-box');
//   var $chatul = $('.chat-ul');
 
//   $.ajax({
//     url: 'https://api.parse.com/1/classes/chatterbox',
//     type: 'GET',
//     contentType: 'application/json',
//     success: function (data) {
//     $.each(data, function(i, item){
//       $.each(item, function (i, object) {
//         console.log(object.username);
//         app[i] = object.username; 
//         var x = $('.chat-box .chat-ul').append('<div>'+object.username+'</div>');
//       });
//     });
//   }

//   });

});
