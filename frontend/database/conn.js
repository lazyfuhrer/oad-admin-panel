import mongoose from 'mongoose';

export default async function connectToDatabase() {
  const DB = process.env.MONGO_DB_URL;
  try {
    await mongoose.connect(DB);
    console.log(`Connected to MongoDB Atlas`);
  } catch (err) {
    console.log(`DB Connection unsuccessful`);
  }
}
