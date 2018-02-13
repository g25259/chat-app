const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const socketIO = require('socket.io');
const {User, Users} = require('./utils/users');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');

const publicPath = path.join(__dirname, '../../public');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const users = new Users();

app.use(express.static(publicPath));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room are required');
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(new User(socket.id, params.name, params.room));

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app'));
        socket.broadcast.to(params.room).emit('newMessage',
            generateMessage('Admin', `${params.name} has joined`));

        callback();
    });

    socket.on('createMessage', (message, callback) => {
        console.log(message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('');
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage',
            generateLocationMessage('Admin',
                coords.latitude, coords.longitude));
    });

    socket.on('disconnect', () => {
        
    });
});

server.listen(3000, () => {
    console.log('Start server on 3000');
});
