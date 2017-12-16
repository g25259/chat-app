const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const {generateLocationMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app'));

    socket.broadcast.emit('newMessage',
     generateMessage('Admin', 'New user joined'));

    socket.on('createMessage', (message, callback) => {
        console.log(message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('This is from server.');
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage',
         generateLocationMessage('Admin',
          coords.latitude, coords.longitude));
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
        console.log('test');
    });
});

server.listen(3000, () => {
    console.log('Start server on 3000');
});
