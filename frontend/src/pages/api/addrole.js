import connectToDatabase from '../../../database/conn';
import Roles from '../../../model/Role';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  await connectToDatabase();
  const { role, permissions } = req.body;

  //console.log(req.body)

  if (!role || !permissions) {
    res.status(422).json({ error: 'All fields are required' });
  }

  try {
    const newRole = new Roles({ role, permissions });
    const roleRegistered = await newRole.save();
    if (roleRegistered) {
      res.status(201).json({ message: 'Role registered successfully' });
    } else {
      res.status(500).json({ error: 'Role Registration failed' });
    }
  } catch (error) {
    console.log(error);
  }
}
