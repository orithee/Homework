import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { join } from 'path';
import { CodeBlockModel, MentorModel, StudentsModel } from './models';
dotenv.config({ path: join(__dirname, '../../.env') });

const key = process.env.MONGO_DB_KEY;
const uri = `mongodb+srv://${key}@cluster0.lpv2zne.mongodb.net/MoveoProject?retryWrites=true&w=majority`;

export async function mongooseConnect() {
  try {
    await mongoose.connect(uri);
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

async function createSession() {
  // await new SessionModel({
  //   uuid: 'ee72839h3191',
  //   user_name: '339827231',
  //   codeblock_id: 0,
  // }).save();

  // const session = await SessionModel.find();

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
