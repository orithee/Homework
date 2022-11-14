import mongoose from 'mongoose';
import {
  CodeBlockModel,
  MentorModel,
  SessionModel,
  StudentsModel,
} from './models';

export async function createCodeBlock() {
  await new CodeBlockModel({
    title: 'Async functions',
    description: 'An exercise that helps to understand the value of "await"',
    code: `/*
      Your task:
      Add one word that will make the following request valid !
      */
      
      async function getDataFromServer() {
            const res = (await fetch('/data')).json();
            if(res && res.data) console.log(res.data);
            else console.log('failed');
      }`,
    solution: `/*
      Your task:
      Add one word that will make the following request valid !
      */
      
      async function getDataFromServer() {
            const res = await(await fetch('/data')).json();
            if(res && res.data) console.log(res.data);
            else console.log('failed');
      }`,
    id: 1,
  }).save();

  await new CodeBlockModel({
    title: 'Worth or not',
    description: 'Understanding the difference between == and ===',
    code: `/*
      Your task:
      Delete one character to make the following condition positive!
      */
      
      if(true === 'true'){
        console.log('The condition is positive!')
      }`,
    solution: `/*
      Your task:
      Delete one character to make the following condition positive!
      */
      
      if(true == 'true'){
        console.log('The condition is positive!')
      }`,
    id: 2,
  }).save();

  await new CodeBlockModel({
    title: 'Operators',
    description: 'Sharpening and the railing in the various operators',
    code: `/*
      Your task:
      Change the equations so that they are equal to the result in the comment:
      */
      6 + 5 // 30
      20 / 5 // 0
      6 ** 5 // 11
      15 - 5 // 3`,
    solution: `/*
      Your task:
      Change the equations so that they are equal to the result in the comment:
      */
      6 ** 5 // 30
      20 % 5 // 0
      6 + 5 // 11
      15 / 5 // 3`,
    id: 3,
  }).save();

  await new CodeBlockModel({
    title: 'Infinite loop',
    description: 'Understanding the parts of the for loop',
    code: `/*
      Your task:
      Change one character and fix the loop so that it is not infinite !
      */
      for(let i = 1; I > 0; i++){
        console.log('infinite loooppppp')
      }`,
    solution: `/*
      Your task:
      Change one character and fix the loop so that it is not infinite !
      */
      for(let i = 1; I > 0; i++){
        console.log('infinite loooppppp')
      }`,
    id: 4,
  }).save();

  const codeBlock = await CodeBlockModel.find();
  console.log(codeBlock);
}

export async function createStudent() {
  await new StudentsModel({
    name: 'Ron',
    password: '229837422',
  }).save();

  await new StudentsModel({
    name: 'Or',
    password: '110984762',
  }).save();

  const codeBlock = await StudentsModel.find();
  console.log(codeBlock);
}
export async function mongooseInit() {
  const MentorSchema = new mongoose.Schema({
    name: String,
    password: String,
  });

  const MentorModel = mongoose.model('mentors', MentorSchema);
  await new MentorModel({ name: 'Tom', password: '339827231' }).save();

  const mentors = await MentorModel.find();

  const StudentsSchema = new mongoose.Schema({
    name: String,
    password: String,
  });

  const StudentsModel = mongoose.model('students', StudentsSchema);
  await new StudentsModel({ name: 'Josh', password: '119836532' }).save();

  const students = await StudentsModel.find();

  console.log(students[0]);
  console.log(mentors[0]);
}
