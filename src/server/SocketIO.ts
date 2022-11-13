import express, { json, Request, Response } from 'express';

import { Server } from 'socket.io';
import { checkSignIn } from '../db/mongoose';
import { connection } from './types';

const PORT = process.env.PORT;

const server = express()
  .use(json())
  .post('/signIn', async (req, res) => {
    const data = await checkSignIn(req.body.name, req.body.password);
    res.send({ success: data.success, student: data.student });
  })
  .use((req, res) =>
    res.sendFile(req.path || '/index.html', { root: './dist' })
  )
  .listen(PORT, () => console.log(`http://localhost:4000`));

export default function socketFunc() {
  const io = new Server(server);

  io.on('connection', (socket: connection) => {
    console.log('Client connected');
    // console.log(socket.id);
    // socket.emit('
    socket.on('disconnect', () => console.log('Client disconnected'));
  });

  // setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
  // setInterval(() => io.emit('time2', new Date().toTimeString()), 500);
  return io;
}
