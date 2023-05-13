import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    report: {
        type: String,
        required: true
    },
    reportCompany: {
        type: [String],
        required: true
    }
}, { timestamps: true });

const Users = models.user || model('user', userSchema);

export default Users;