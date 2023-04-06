import connectToDatabase from '../../../database/conn';
import User from '../../../model/Schema';

export default async function handler(req, res) {
    await connectToDatabase();
   
    const singleUser = await User.findOne({ username: req.query.username});
    res.status(200).json({singleUser});
}
