import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { join } from 'path';
dotenv.config({ path: join(__dirname, '../../.env') });

const key = process.env.MONGO_DB_KEY;
const uri = `mongodb+srv://${key}@cluster0.lpv2zne.mongodb.net/MoveoProject?retryWrites=true&w=majority`;

export async function mongooseConnect() {
  try {
    await mongoose.connect(uri);
  } catch (error) {
    console.log(error);
  }
}

export async function mongooseFun() {
  const friendsSchema = new mongoose.Schema({
    name: String,
    finalName: String,
  });

  const friendsModel = mongoose.model('friends', friendsSchema);
  await friendsModel.insertMany([{ name: 'ori5' }, { name: 'ori6' }]);
  //   const oriFriend = await new friendsModel({ name: 'ori', ott: 'de' }).save();
  //   console.log(oriFriend.name); // 'ori'

  //   const fluffy = new friendsModel({ name: 'yoni' });

  //   await fluffy.save();

  const allFriends = await friendsModel.find();
  console.log(allFriends[1].finalName);
  console.log(allFriends[1].name);
}
