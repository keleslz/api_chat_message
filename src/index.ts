import { ApiFactory } from "./data/factory/ApiFactory";

const express = require('express')
var cors = require('cors')
const app = express();
const http = require('http').Server(app);
app.use(cors())

const io = require('socket.io')(http, {
  origin: "http://locahost:3000",
});

const port = process.env.API_PORT || 4000;

app.get('/', (req: any, res: { send: (arg0: { code: number; }) => void; }) => {
  res.send({
    code: 200
  })
});


app.get('/user/connecteds', (req: any, res: any) => {
  const data = ApiFactory.user().getAll()
  let users = Object.fromEntries(data ?? new Map())
  const code = 201

  res.status(code)

  res.send({
    code: code,
    data: users
  })
});

io.on('connection', (socket: { id: any; on: (arg0: string, arg1: { (data: any): void; (data: any): void; }) => void; }) => {

  // console.log(apiFactory.Apifactory);
  // console.log(socket.id, 'socker');

  socket.on('connect_entity', (data: { id: string }) => {
    ApiFactory.user().add(data.id)
    io.emit('connect_entity', data);
  });


  socket.on('chat_message', (data: any) => {
    io.emit('chat_message', data);
  });

  socket.on('chat_writing', (data: any) => {
    io.emit('chat_writing', data);
  });
});

io.on('disconnect', (socket: { id: any; on: (arg0: string, arg1: { (data: any): void; (data: any): void; }) => void; }) => {

  socket.on('diconnect_entity', (data: { id: string }) => {
    ApiFactory.user().remove(data.id)
    io.emit('disconnect_entity', data);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});