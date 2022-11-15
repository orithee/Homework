import { mongooseConnect } from '../db/mongoose';
import socketServer from './socket';

init();

function init() {
  try {
    mongooseConnect().then(() => socketServer());
  } catch (error) {
    console.log('init error: ', error);
  }
}
