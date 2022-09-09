"use strict";
var fs = require('fs');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http, {
    origin: "http://locahost:3000",
});
var port = process.env.API_PORT || 4000;
app.get('/', function (req, res) {
    res.send({
        code: 200
    });
});
// Utilise  des services pour balancer les stats an une app externe pour monitorer
io.on('connection', function (socket) {
    console.log(socket.id, 'socker');
    // updateUsers(socket.id)
    socket.on('chat_message', function (data) {
        console.log(data, 'cm');
        io.emit('chat_message', data);
    });
    socket.on('chat_writing', function (data) {
        console.log(data, 'cw');
        io.emit('chat_writing', data);
    });
});
io.on('disconnect', function (socket) {
    console.log(socket.id, 'deconnected');
    socket.on('chat_message', function (data) {
        io.emit('chat_message', data);
    });
    socket.on('chat_writing', function (data) {
        console.log(data);
        io.emit('chat_writing', data);
    });
});
http.listen(port, function () {
    console.log("Socket.IO server running at http://localhost:".concat(port, "/"));
});
