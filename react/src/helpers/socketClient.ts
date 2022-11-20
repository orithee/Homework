import { io } from 'socket.io-client';
import { SocketClientType } from './types';
export default function socketConnection() {
  let socket: SocketClientType = io();
  return socket;
}
