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
    //await mongooseInit()
    // await createSession();
  } catch (error) {
    console.log(error);
  }
}

export async function getCards() {
  try {
    const codeBlocks = await CodeBlockModel.find(
      {},
      'title description code id -_id'
    );
    console.log(codeBlocks);
    return codeBlocks;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getStudents() {
  try {
    const students = await StudentsModel.find({}, 'name -_id');
    console.log(students);
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

export async function newSession(name: string, id: number) {
  try {
    const uuid = uuidv4();
    await new SessionModel({
      uuid: uuid,
      student_name: name,
      codeblock_id: id,
    }).save();

    console.log(uuid);
    return uuid;
  } catch (error) {
    return '';
  }
}

async function createSession() {
  await new CodeBlockModel({
    title: 'Async functions',
    description: 'assss',
    code: '......',
    id: 1,
  }).save();

  await new CodeBlockModel({
    title: 'Dynamic imports',
    description: 'dvdvdvdvd',
    code: '......',
    id: 2,
  }).save();

  await new CodeBlockModel({
    title: 'Syntax',
    description: 'dvdvdvdvd',
    code: '......',
    id: 3,
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
