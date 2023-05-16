import connectToDatabase from '../../../database/conn';
import User from '../../../model/Schema';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  await connectToDatabase();

  const { username } = req.query;
  try {
    const deletedUser = await User.findOneAndDelete({ username });
    res.status(200).json(deletedUser);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while deleting the user.');
  }
  
}
