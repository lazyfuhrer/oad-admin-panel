import connectToDatabase from '../../../database/conn';
import User from '../../../model/Schema';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  await connectToDatabase();

  const { executiveUsername, company } = req.body;

  try {
    const executive = await User.findOne({ username: executiveUsername });

    if (!executive) {
      return res.status(404).json({ error: 'Executive not found' });
    }

    // Remove the company from the executive's reportCompany array
    executive.reportCompany = executive.reportCompany.filter(
      (c) => c !== company
    );

    await executive.save();

    res.status(200).json({ message: 'Company removed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while removing the company from the executive');
  }
}