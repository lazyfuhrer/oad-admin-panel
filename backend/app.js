const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

app.use(express.json());

dotenv.config({ path: './config.env' });
require('./db/conn');
const User = require('./model/userSchema');

const PORT = process.env.PORT;

/*async function insertUsers() {
    try {
      const users = [
        { name: 'John Doe', email: 'john@example.com', password: 'password1', role: 'member' },
        { name: 'Jane Smith', email: 'jane@example.com', password: 'password2', role: 'admin' },
        { name: 'Bob Johnson', email: 'bob@example.com', password: 'password3', role: 'member' },
        { name: 'Alice Lee', email: 'alice@example.com', password: 'password4', role: 'admin' },
        { name: 'Tom Wilson', email: 'tom@example.com', password: 'password5', role: 'member' },
      ];
  
      const result = await User.insertMany(users);
      console.log(`Inserted ${result.length} users`);
    } catch (error) {
      console.error(error);
    } finally {
      mongoose.connection.close();
    }
  }
  
  insertUsers();  */


// Middleware
const middleware = (req, res, next) => {
    console.log(`Middleware is running`);
    next();
}

const verifyRoleAndPermissions = (requiredRole, requiredPermissions) => {
    return async (req, res, next) => {
      const userId = req.user.id;
  
      try {
        // Find the user in the database and populate the 'role' field
        const user = await User.findById(userId).populate('role');
  
        // Verify that the user has the required role
        if (user.role.name !== requiredRole) {
          return res.status(403).send('Access denied');
        }
  
        // Verify that the user has all the required permissions
        const userPermissions = user.role.permissions;
        for (const permission of requiredPermissions) {
          if (!userPermissions.includes(permission)) {
            return res.status(403).send('Access denied');
          }
        }
  
        // If the user has the required role and permissions, call the next middleware
        next();
      } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
      }
    };
  };

router.get('/admin-only', verifyRoleAndPermissions('Admin', ['create', 'read', 'update', 'delete']), (req, res) => {
    res.send('This page is only accessible to admins');
});
    

app.get('/test', middleware, (req, res) => {
    res.json(`You're in test page`);
});

app.get('/contact', (req, res) => {
    res.send(`You're in contact page`);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});