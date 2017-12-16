var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
   console.log(message);
   var li = jQuery('<li></li>');
   li.text(`${message.from}: ${message.text}`);

   jQuery('#msgs').append(li);
});


jQuery('#msg-form').on('submit', function (e) {
    console.log(e);
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=msg]').val()
    }, function () {
        
    });
});