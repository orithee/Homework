import express, { json, Request, Response } from 'express';
import { Server } from 'socket.io';

// const socketIO = require('socket.io');

const PORT = process.env.PORT || 3000;
const INDEX = '/index2.html';

const server = express()
  .get('/hello', (req, res) => {
    res.send({ ori: 'thee' });
  })
  .use((req, res) =>
    res.sendFile(req.path || '/index.html', { root: './dist' })
  )
  .listen(PORT, () => console.log(`http://localhost:4000`));
// res.sendFile(req.path || '/index.html', { root: './dist' });

export default function socketFunc() {
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000/',
    },
  });

  io.on(
    'connection',
    (socket: { on: (arg0: string, arg1: () => void) => void }) => {
      console.log('Client connected');
      // console.log(socket.id);
      // socket.emit('
      socket.on('disconnect', () => console.log('Client disconnected'));
    }
  );

  setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
  setInterval(() => io.emit('time2', new Date().toTimeString()), 500);
  return io;
}
