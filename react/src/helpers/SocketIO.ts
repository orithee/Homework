//   let socket = io('http://localhost:3000/');
import { io } from 'socket.io-client';
export default function socketConnection() {
  let socket = io();
  return socket;
}
