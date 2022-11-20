import express, { json, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import {
  checkMentorCookie,
  checkSignIn,
  checkUuid,
  deleteSession,
  getAllCodeBlocks,
  getCurrentCodeBlock,
  getAllStudents,
  newSession,
} from '../db/mongoose';
import path from 'path';

// Initialize the express server with all requests:
export default function expressServer() {
  const app = express();
  app.use(json());

  // Get requests:
  app.get('/student_login/:uuid', (req: Request, res: Response) => {
    res.sendFile('/index.html', { root: './dist' });
  });

  app.get('/code-block/:uuid', async (req: Request, res: Response) => {
    try {
      const obj = await getCurrentCodeBlock(req.params.uuid);
      res.send(obj);
    } catch (error) {
      console.log('/code-block/:uuid', error);
      res.send({});
    }
  });

  app.get('/access/mentor', cookieParser(), async (req, res) => {
    res.sendFile('/index.html', { root: './dist' });
  });

  app.get('/mentor-access', cookieParser(), async (req, res) => {
    try {
      const access = await checkMentorCookie(req.cookies['session']);
      res.send({ access: access, uuid: req.cookies['session'] });
    } catch (error) {
      console.log('/mentor-access', error);
      res.send({ access: false, uuid: '' });
    }
  });

  app.get('/code-cards', async (req: Request, res: Response) => {
    res.send({ cards: await getAllCodeBlocks() });
  });

  app.get('/students', async (req: Request, res: Response) => {
    res.send({ students: await getAllStudents() });
  });

  // Post requests:
  app.post('/signIn', async (req: Request, res: Response) => {
    const data = await checkSignIn(req.body.name, req.body.password);
    if (data.success) {
      if (data.student && (await checkUuid(req.body.uuid, req.body.name))) {
        res.send({ success: data.success, student: data.student });
      } else if (!data.student) res.send({ success: true, student: false });
      else res.send({ success: false, student: true });
    } else res.send({ success: false, student: false });
  });

  app.post('/new-session', async (req: Request, res: Response) => {
    const uuid = await newSession(req.body.name, req.body.sessionId);
    res.cookie('session', uuid, { maxAge: 900000, httpOnly: true });
    let nodeEnv = 'https://';
    if (process.env.NODE_ENV !== 'production') nodeEnv = 'http://';
    res.send({ uuid: uuid, nodeEnv: nodeEnv });
  });

  // Put request:
  app.put('/delete-session', async (req: Request, res: Response) => {
    res.send({ success: await deleteSession() });
  });

  // Default:
  app.use(express.static(path.join(__dirname, '../..', 'dist')));
  app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../..', 'dist/index.html'));
  });

  const server = app.listen(process.env.PORT, () =>
    console.log(`http://localhost:4000`)
  );
  return server;
}
