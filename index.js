const app = require('express')();
const http = require('http').Server(app);


const io = require('socket.io')(http, {
  origin: "http://locahost:3000",
});
const port = process.env.API_PORT || 4000;

app.get('/', (req, res) => {
  res.send({
    code: 200
  })
});

// Utilise  des services pour balancer les stats an une app externe pour monitorer
io.on('connection', (socket) => {
  console.log(socket.id, 'connected');

  socket.on('chat_message', (data) => {
    console.log(data, 'cm');
    io.emit('chat_message', data);
  });

  socket.on('chat_writing', (data) => {
    console.log(data, 'cw');
    io.emit('chat_writing', data);
  });
});

io.on('disconnect', (socket) => {
  console.log(socket.id, 'deconnected');

  socket.on('chat_message', (data) => {
    io.emit('chat_message', data);
  });

  socket.on('chat_writing', (data) => {
    console.log(data);
    io.emit('chat_writing', data);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});