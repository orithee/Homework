import express, { json, Request, Response } from 'express';
import dotenv from 'dotenv';
import { join } from 'path';
import { mongooseConnect, mongooseFun } from '../db/mongoose';

dotenv.config({ path: join(__dirname, '../../.env') });

const server = express();
server.use(json());
server.use(express.static('./dist'));

init();

async function init() {
  try {
    await mongooseConnect();
    await loadServer();
  } catch (error) {
    console.log('init error: ', error);
  }
}

async function loadServer() {
  mongooseFun().catch((err) => console.log(err));

  // Get requests:
  server.get('/----', async (req: Request, res: Response) => {
    //   console.log('request ' + req.params.name...);
  });

  // Initialize the server + port:
  const port = process.env.PORT;
  server.listen(port, () => console.log('Hosted: http://localhost:' + port));
}
