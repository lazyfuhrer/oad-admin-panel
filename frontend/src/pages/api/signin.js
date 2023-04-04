import connectToDatabase from '../../../database/conn';
import Users from '../../../model/Schema';
import { sign } from 'jsonwebtoken';

export default async function handler(req, res) {

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    await connectToDatabase();
    try{
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(422).json({ error: 'All fields are required' });
        }
        const userLogin = await Users.findOne({ username: username });

        if (userLogin) {
            const isMatch = password == userLogin.password;

            if (!isMatch) {
                res.status(422).json({ error: 'Invalid username or password' });
            }
            else {
                const token = sign({ username: userLogin.username },'secret');
                res.json({message: 'User logged in successfully', token: token});
            }
        }
        else {
            res.status(422).json({ error: 'Invalid username or password' });
        }
        
    } catch(error){
        console.log(error);
    }
}
