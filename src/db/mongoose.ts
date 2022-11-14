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

// Starting the connection:
export async function mongooseConnect() {
  try {
    await mongoose.connect(uri);
  } catch (error) {
    console.log(error);
  }
}

// Pulling the current code block:
export async function getCurrentCodeBlock(uuidStr: string) {
  try {
    const res = await SessionModel.findOne({ uuid: uuidStr });
    if (res) {
      const find = { id: res.codeblock_id };
      const params = 'title description solution code -_id';
      const codeBlock = await CodeBlockModel.findOne(find, params);
      return codeBlock;
    } else return {};
  } catch (error) {
    console.log(error);
    return {};
  }
}
// Delete all sessions:
export async function deleteSession() {
  console.log('deleteSession');
  try {
    const res = await SessionModel.deleteMany();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

// Pulling all blocks:
export async function getAllCodeBlocks() {
  try {
    const params = 'title description solution code id -_id';
    const codeBlocks = await CodeBlockModel.find({}, params);
    console.log(codeBlocks);
    return codeBlocks;
  } catch (error) {
    console.log(error);
    return [];
  }
}

// Pulling all students:
export async function getAllStudents() {
  try {
    const students = await StudentsModel.find({}, 'name -_id');
    console.log(students);
    return students;
  } catch (error) {
    console.log(error);
    return [];
  }
}

// Checking login details:
export async function checkSignIn(name: string, password: string) {
  try {
    const find = { name: name, password: password };
    const student = await StudentsModel.findOne(find);
    if (student) return { success: true, student: true };

    const mentor = await MentorModel.findOne(find);
    if (mentor) return { success: true, student: false };
    else return { success: false, student: false };
  } catch (error) {
    return { success: false, student: false };
  }
}

// Checking uuid string:
export async function checkUuid(uuid: string, name: string) {
  try {
    const ans = await SessionModel.findOne({ student_name: name, uuid: uuid });
    if (ans && ans.student_name) return true;
    else return false;
  } catch (error) {
    return false;
  }
}

// Checking mentor cookie:
export async function checkMentorCookie(uuid: string) {
  try {
    const ans = await SessionModel.findOne({ uuid: uuid });
    if (ans && ans.uuid) return true;
    else return false;
  } catch (error) {
    return false;
  }
}

// Open a new session:
export async function newSession(name: string, id: number) {
  try {
    const uuid = uuidv4();
    return await new SessionModel({
      uuid: uuid,
      student_name: name,
      codeblock_id: id,
    })
      .save()
      .then(() => uuid)
      .catch(() => '');
  } catch (error) {
    return '';
  }
}
