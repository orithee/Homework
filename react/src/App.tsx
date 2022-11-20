import React from 'react';
import { useState } from 'react';
import Dashboard from './components/Dashboard';
import socketConnection from './helpers/socketClient';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './components/SignIn';
import CheckCookie from './components/CheckCookie';
import { SocketClientType } from './helpers/types';

const connection = socketConnection();
export const socketContext = React.createContext<SocketClientType>(connection);

function App() {
  const [socket, setSocket] = useState<SocketClientType>(connection);

  socket.on('disconnect', () => {
    setSocket(socketConnection());
    console.log('disconnect');
  });

  return (
    <socketContext.Provider value={socket}>
      <BrowserRouter>
        <Routes>
          <Route path="/Dashboard" element={<Dashboard />}></Route>
          <Route path="/CodeEditor" element={<Dashboard />}></Route>
          <Route path="/access" element={<CheckCookie />}>
            <Route path=":mentor" />
          </Route>
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
