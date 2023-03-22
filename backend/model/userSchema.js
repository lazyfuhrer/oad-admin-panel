const mongoose = require('mongoose');

// Define a roles schema
const rolesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  permissions: [String]
});

// Create a roles model
const Role = mongoose.model('Role', rolesSchema);

// Insert some sample roles and permissions data
const roles = [
  {
    name: 'Admin',
    permissions: ['create', 'read', 'update', 'delete']
  },
  {
    name: 'Member',
    permissions: ['read']
  }
];

/*Role.insertMany(roles)
  .then((result) => {
    console.log(`Inserted ${result.length} roles`);
  })
  .catch((error) => {
    console.error(error);
  }); */

// Modify the user schema to reference the roles collection
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role'
  }
});

const User = mongoose.model('User', userSchema);
