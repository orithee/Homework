import { mongooseConnect } from '../db/mongoose';
import socketServer from './socket';

init();

async function init() {
  try {
    mongooseConnect();
    socketServer();
  } catch (error) {
    console.log('init error: ', error);
  }
}
