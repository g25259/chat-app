const socket = io();

socket.on('connect', function() {
    console.log('Connected to server');
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
    const formattedTime = moment(message.createdAt).format('h:mm a');
    const li = jQuery('<li></li>');
    li.text(`${message.from} ${formattedTime}: ${message.text}`);

    jQuery('#msgs').append(li);
});

socket.on('newLocationMessage', function(message) {
    const formattedTime = moment(message.createdAt).format('h:mm a');
    const li = jQuery('<li></li>');
    const a = jQuery('<a target="_blank">My current location</a>');

    li.text(`${message.from} ${formattedTime}: `);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#msgs').append(li);
});

jQuery('#msg-form').on('submit', function(e) {
    console.log(e);
    e.preventDefault();

    const messageTextbox = jQuery('[name=msg]');
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val(),
    }, function() {
        messageTextbox.val('');
    });
});

const locationButton = jQuery('#send-location');
locationButton.on('click', function() {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function(position) {
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        });
    }, function() {
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location.');
    });
});
