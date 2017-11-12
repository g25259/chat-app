const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const socket = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const app = express();
const server = http.createServer(app);
const io = socket(server);

app.use(express.static(publicPath));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to Chat app',
    });

    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New user joined',
        createAt: new Date().getTime(),
    });

    socket.emit('newMessage', {
        from: 'John',
        text: 'see you then',
        createdAt: new Date(),
    });

    socket.on('createMessage', (message) => {
        console.log(message);
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime(),
        });
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
        console.log('test');
    });
});

app.post('/msg', (req, res) => {
    console.log(req);
});

server.listen(3000, () => {
    console.log('Start server on 3000');
});
