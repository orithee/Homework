import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { join } from 'path';
import {
  CodeBlockModel,
  MentorModel,
  SessionModel,
  StudentsModel,
} from './models';
import { v4 as uuidv4 } from 'uuid';
dotenv.config({ path: join(__dirname, '../../.env') });

const key = process.env.MONGO_DB_KEY;
const uri = `mongodb+srv://${key}@cluster0.lpv2zne.mongodb.net/MoveoProject?retryWrites=true&w=majority`;

export async function mongooseConnect() {
  try {
    await mongoose.connect(uri);
    // await createStudent();
    // await createCodeBlock();
    //await mongooseInit()
    // await createSession();
  } catch (error) {
    console.log(error);
  }
}

export async function getCurrentCodeBlock(uuidStr: string) {
  console.log('getCurrentCodeBlock');
  try {
    const res = await SessionModel.findOne(
      { uuid: uuidStr }
      // 'codeblock_id -_id -student_name'
    );
    if (res) {
      const codeBlock = await CodeBlockModel.findOne(
        { id: res.codeblock_id },
        'title description solution code -_id'
      );
      return codeBlock;
    }
    return {};
  } catch (error) {
    console.log(error);
    return {};
  }
}

export async function getCards() {
  try {
    const codeBlocks = await CodeBlockModel.find(
      {},
      'title description code id -_id'
    );
    return codeBlocks;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getStudents() {
  try {
    const students = await StudentsModel.find({}, 'name -_id');
    // console.log(students);
    return students;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function checkSignIn(name: string, password: string) {
  const student = await StudentsModel.findOne({
    name: name,
    password: password,
  });
  if (student) return { success: true, student: true };

  const mentor = await MentorModel.findOne({ name: name, password: password });
  if (mentor) return { success: true, student: false };

  return { success: false, student: false };
}

export async function checkUuid(uuid: string, name: string) {
  const ans = await SessionModel.findOne({ student_name: name, uuid: uuid });
  if (ans && ans.student_name) return true;
  else return false;
}

export async function checkMentorCookie(uuid: string) {
  const ans = await SessionModel.findOne({ uuid: uuid });
  // console.log('checkMentorCookie ans', ans);
  if (ans && ans.uuid) return true;
  else return false;
}

export async function newSession(name: string, id: number) {
  try {
    const uuid = uuidv4();
    await new SessionModel({
      uuid: uuid,
      student_name: name,
      codeblock_id: id,
    }).save();

    console.log('newSession', uuid);
    return uuid;
  } catch (error) {
    return '';
  }
}

async function createCodeBlock() {
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

async function createStudent() {
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
async function mongooseInit() {
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
