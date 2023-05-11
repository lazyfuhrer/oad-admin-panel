import connectToDatabase from '../../../database/conn';
import Users from '../../../model/Schema';

export default async function handler(req, res) {

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  await connectToDatabase();
  const { firstname, lastname, email, username, password, cpassword , role, status, report } = req.body;

  // console.log(role)

  if (!firstname || !lastname || !email || !username || !password|| !cpassword|| !role || !status || !report) {
    res.status(422).json({ error: 'All fields are required' });
  }

  try{
    const userExist = await Users.findOne({ $or: [{ username }, { email }] });
    if (userExist) {
      if (userExist.username === username) {
        return res.status(422).json({ error: 'Username already exists' });
      } else {
        return res.status(422).json({ error: 'Email already exists' });
      }
    };
    const user = new Users({ firstname, lastname, email, username, password, cpassword, role, status, report });
    const userRegistered = await user.save();
    if (userRegistered) {
        res.status(201).json({ message: 'User registered successfully' });
    }
    else {
        res.status(500).json({ error: 'Registration failed' });
    }
  } catch{
    console.log(error);
  }
}
