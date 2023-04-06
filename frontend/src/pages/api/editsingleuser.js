import connectToDatabase from '../../../database/conn';
import User from '../../../model/Schema';

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  await connectToDatabase();
  console.log(req.body)

  const { firstname, lastname, email, username, password, cpassword, role, status } = req.body;

  if (!firstname || !lastname || !email || !username || !password|| !cpassword|| !role || !status) {
    res.status(422).json({ error: 'All fields are required' });
  }

  try {
    const updatedUser = await User.findOneAndUpdate(
      { username: username },
      { firstname, lastname, email, password, cpassword, role, status },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}