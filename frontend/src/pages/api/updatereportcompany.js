import connectToDatabase from '../../../database/conn';
import User from '../../../model/Schema';

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  await connectToDatabase();

  const { executiveUsername, reportCompany } = req.body;

  try {
    const executive = await User.findOne({ username: executiveUsername });

    if (!executive) {
      return res.status(404).json({ error: 'Executive not found' });
    }

    // Update the executive's reportCompany array
    executive.reportCompany = reportCompany;

    await executive.save();

    res.status(200).json({ message: 'Report company updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while updating the report company for the executive');
  }
}