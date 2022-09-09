const fs = require('fs');

const app = require('express')();
const http = require('http').Server(app);


const io = require('socket.io')(http, {
  origin: "http://locahost:3000",
});
const port = process.env.API_PORT || 4000;

app.get('/', (req: any, res: { send: (arg0: { code: number; }) => void; }) => {
  res.send({
    code: 200
  })
});

io.on('connection', (socket: { id: any; on: (arg0: string, arg1: { (data: any): void; (data: any): void; }) => void; }) => {
  console.log(socket.id, 'socker');

  socket.on('connect_entity', (data: any) => {
    console.log(data, 'cm');
    io.emit('connect_entity', data);
  });


  socket.on('chat_message', (data: any) => {
    console.log(data, 'cm');
    io.emit('chat_message', data);
  });

  socket.on('chat_writing', (data: any) => {
    console.log(data, 'cw');
    io.emit('chat_writing', data);
  });
});

io.on('disconnect', (socket: { id: any; on: (arg0: string, arg1: { (data: any): void; (data: any): void; }) => void; }) => {
  console.log(socket.id, 'deconnected');

  socket.on('chat_message', (data: any) => {
    io.emit('chat_message', data);
  });

  socket.on('chat_writing', (data: any) => {
    console.log(data);
    io.emit('chat_writing', data);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});