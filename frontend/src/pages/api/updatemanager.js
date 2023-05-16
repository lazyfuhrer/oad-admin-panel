import connectToDatabase from '../../../database/conn';
import Users from '../../../model/Schema';

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  await connectToDatabase();

  const { executive, manager } = req.body;

  try {
    // Find the executive by their name and update the report field with the new manager
    const updatedExecutive = await Users.findOneAndUpdate(
      { firstname: executive.split(' ')[0], lastname: executive.split(' ')[1] },
      { report: manager },
      { new: true }
    );

    if (!updatedExecutive) {
      return res.status(404).json({ error: 'Executive not found' });
    }

    return res.status(200).json({ message: 'Executive reassigned successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}