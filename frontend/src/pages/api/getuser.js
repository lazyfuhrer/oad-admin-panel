import connectToDatabase from '../../../database/conn';
import User from '../../../model/Schema';

export default async function handler(req, res) {
    await connectToDatabase();
   
    const allUsers = await User.find({});
    res.status(200).json({allUsers});
}
