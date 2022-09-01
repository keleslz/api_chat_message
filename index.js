const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.API_PORT || 4000;

app.get('/', (req, res) => {
  res.send({code : 200})
});

io.on('connection', (socket) => {

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
