import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { join } from 'path';
import { MentorModel, StudentsModel } from './models';
dotenv.config({ path: join(__dirname, '../../.env') });

const key = process.env.MONGO_DB_KEY;
const uri = `mongodb+srv://${key}@cluster0.lpv2zne.mongodb.net/MoveoProject?retryWrites=true&w=majority`;

export async function mongooseConnect() {
  try {
    await mongoose.connect(uri);
    // mongooseInit().catch((err) => console.log(err));
    // createSession().catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
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
  const SessionSchema = new mongoose.Schema({
    uuid: String,
    user_name: String,
    codeblock_id: Number,
  });

  const SessionModel = mongoose.model('session', SessionSchema);
  await new SessionModel({
    uuid: 'ee72839h3191',
    user_name: '339827231',
    codeblock_id: 0,
  }).save();

  const session = await SessionModel.find();

  const CodeBlockSchema = new mongoose.Schema({
    title: String,
    code: String,
  });

  const CodeBlockModel = mongoose.model('code-block', CodeBlockSchema);
  await new CodeBlockModel({ title: 'Async functions', code: '......' }).save();

  const codeBlock = await CodeBlockModel.find();
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
