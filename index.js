const io = require('socket.io')(80)
const users = {};
io.on('connection', socket =>{
    socket.on('new', name =>{ 
        users[socket.id] = name;
        socket.broadcast.emit('user', name);
    });
    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });
    socket.on('disconnect', message =>{
        socket.broadcast.emit('leave', users[socket.id]);
        delete users[socket.id];
    });
})