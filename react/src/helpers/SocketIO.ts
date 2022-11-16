//   let socket = io('http://localhost:3000/');
import { io, Socket } from 'socket.io-client';
import { SocketClientType } from './types';
export default function socketConnection() {
  let socket: SocketClientType = io();
  return socket;
}
