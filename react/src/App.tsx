import React from 'react';
import { useState } from 'react';
import style from './App.module.scss';
import Dashboard from './components/Dashboard';
import socketConnection from './helpers/SocketIO';
import axios from 'axios';

const connection = socketConnection();
export const socketContext = React.createContext<any>(connection);

function App() {
  const [socket, setSocket] = useState<any>(connection);

  axios
    .get('/hello')
    .catch(console.log)
    .then((obj) => {
      if (obj) console.log(obj.data);
    });

  socket.on('time', () => {
    console.log('interval socket from server');
  });

  socket.on('time2', () => {
    console.log('interval2 socket from server');
  });

  return (
    <Dashboard />
    // <div className={style}>
    //   <div>hello world</div>
    // </div>
  );
}

export default App;
