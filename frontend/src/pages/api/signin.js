import connectToDatabase from '../../../database/conn';
import Users from '../../../model/Schema';

export default async function handler(req, res) {

    await connectToDatabase();
    try{
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(422).json({ error: 'All fields are required' });
        }
        const userLogin = await Users.findOne({ username: username });
        if (!userLogin) {
            res.status(422).json({ error: 'User does not exist' });
        }
        else {
            res.json({message: 'User logged in successfully'});
        }
    } catch{
        console.log(error);
    }
}