import React from 'react';
import { useState } from 'react';
import style from './App.module.scss';
import Dashboard from './components/Dashboard';
import socketConnection from './helpers/SocketIO';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './components/SignIn';

const connection = socketConnection();
export const socketContext = React.createContext<any>(connection);

function App() {
  const [socket, setSocket] = useState<any>(connection);

  socket.on('time', () => {
    console.log('interval socket from server');
  });

  socket.on('time2', () => {
    console.log('interval2 socket from server');
  });

  return (
    <socketContext.Provider value={socket}>
      <BrowserRouter>
        <Routes>
          <Route path="/Dashboard" element={<Dashboard />}></Route>
          <Route path="/student_login" element={<SignIn />}>
            <Route path=":uuid" />
          </Route>
          <Route path="/" element={<SignIn />}></Route>
        </Routes>
      </BrowserRouter>
    </socketContext.Provider>
  );
}

export default App;
