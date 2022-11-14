import express, { json, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import { Server } from 'socket.io';
import {
  checkMentorCookie,
  checkSignIn,
  checkUuid,
  getCards,
  getStudents,
  newSession,
} from '../db/mongoose';
import { connection } from './types';

const PORT = process.env.PORT;

const server = express()
  .use(json())
  .post('/signIn', async (req, res) => {
    const data = await checkSignIn(req.body.name, req.body.password);
    if (data.success) {
      if (data.student && (await checkUuid(req.body.uuid, req.body.name))) {
        res.send({ success: data.success, student: data.student });
      } else if (!data.student) res.send({ success: true, student: false });
      else res.send({ success: false, student: true });
    } else res.send({ success: false, student: false });
  })
  .post('/new-session', async (req, res) => {
    const uuid = await newSession(req.body.name, req.body.sessionId);
    res.cookie('session', uuid, {
      maxAge: 900000,
      httpOnly: true,
    });
    res.send({ uuid: uuid });
  })
  .get('/student_login/:uuid', (req, res) => {
    res.sendFile('/index.html', { root: './dist' });
  })
  .get('/mentor-access', cookieParser(), async (req, res) => {
    const access = await checkMentorCookie(req.cookies['session']);
    res.send({ access: access });
  })
  .get('/code-cards', async (req, res) => {
    const data = await getCards();
    res.send({ cards: data });
  })
  .get('/students', async (req, res) => {
    const data = await getStudents();
    res.send({ students: data });
  })
  .use((req, res) => {
    console.log(req.path);
    res.sendFile(req.path || '/index.html', { root: './dist' });
  })
  .listen(PORT, () => console.log(`http://localhost:4000`));

export default function socketFunc() {
  const io = new Server(server);
  io.on('connection', (socket: any) => {
    socket.on('code change', (msg: any) => {
      console.log('code change from the student: ', msg);
      io.emit('code change', msg);
    });
    socket.on('disconnect', () => console.log('Client disconnected'));
  });
  return io;
}
