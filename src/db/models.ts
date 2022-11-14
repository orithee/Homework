import mongoose from 'mongoose';

const MentorSchema = new mongoose.Schema({
  name: String,
  password: String,
});

const StudentsSchema = new mongoose.Schema({
  name: String,
  password: String,
});

const SessionSchema = new mongoose.Schema({
  uuid: String,
  student_name: String,
  codeblock_id: Number,
});

const CodeBlockSchema = new mongoose.Schema({
  title: String,
  description: String,
  code: String,
  id: Number,
});

export const MentorModel = mongoose.model('mentors', MentorSchema);
export const StudentsModel = mongoose.model('students', StudentsSchema);
export const SessionModel = mongoose.model('session', SessionSchema);
export const CodeBlockModel = mongoose.model('code-block', CodeBlockSchema);
