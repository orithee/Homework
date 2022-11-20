import { ClientToServerEvents, ServerToClientEvents } from './types';
import { Server } from 'socket.io';
import expressServer from './express';

export default function socketServer() {
  const io = new Server<ClientToServerEvents, ServerToClientEvents>(
    expressServer()
  );
  io.on('connection', (socket) => {
    console.log('connect');
    socket.on('code_change_from_client', (msg) => {
      io.emit('code_change_to_client', msg);
    });
    socket.on('disconnect', () => console.log('disconnect'));
  });
  return io;
}
