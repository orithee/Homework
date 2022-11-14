import express, { json, Request, Response } from 'express';
import dotenv from 'dotenv';
import { mongooseConnect } from '../db/mongoose';
import socketFunc from './SocketIO';

init();

async function init() {
  try {
    mongooseConnect();
    socketFunc();
  } catch (error) {
    console.log('init error: ', error);
  }
}
