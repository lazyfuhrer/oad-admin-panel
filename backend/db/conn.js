const mongoose = require('mongoose');

const DB = process.env.DATABASE;

mongoose.connect(DB).then(() => {
    console.log(`Connected to MongoDB Atlas`);
}).catch((err) => console.log(`DB Connection unsuccessful`));