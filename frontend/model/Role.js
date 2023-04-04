import { Schema, model, models } from 'mongoose';

const roleSchema = new Schema({
    role: {
        type: String,
        required: true
    },
    permissions: [{
        type: String,
        required: true
    }]
}, { timestamps: true });

const Roles = models.role || model('role', roleSchema);

export default Roles;