import { Schema, model, models } from 'mongoose';

const companySchema = new Schema({
    clientName: {
        type: String,
        required: true
    },
    clientEmail: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    companyBuilding: {
        type: String,
        required: true
    },
    companyStreet: {
        type: String,
        required: true
    },
    companyBlock: {
        type: String,
        required: true
    },
    companyCity: {
        type: String,
        required: true
    },
    companyState: {
        type: String,
        required: true
    },
    companyPincode: {
        type: String,
        required: true
    },
    companyCountry: {
        type: String,
        required: true
    },
    companyUnit: {
        type: String,
        required: true
    },
    companyLevel: {
        type: String,
        required: true
    }
});

const Company = models.company || model('company', companySchema);
export default Company;