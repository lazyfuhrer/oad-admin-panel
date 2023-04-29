import connectToDatabase from '../../../database/conn';
import Company from '../../../model/Company';

export default async function handler(req, res) {
    await connectToDatabase();
   
    const allCompanies = await Company.find({});
    res.status(200).json({allCompanies});
};