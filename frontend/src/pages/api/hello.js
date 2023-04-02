// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectToDatabase from '../../../database/conn';

export default async function handler(req, res) {

  await connectToDatabase();

  res.status(200).json({ name: 'John Doe' })
}
