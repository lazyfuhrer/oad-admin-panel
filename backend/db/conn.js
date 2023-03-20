const mongoose = require('mongoose');

const DB = process.env.DATABASE;

mongoose.connect(DB).then(() => {
    console.log(`DB Connection successful`);
}).catch((err) => console.log(`DB Connection unsuccessful`));