const mongoose = require("mongoose")

const patientsSchema = new mongoose.Schema({
    patient_id: {
        unique: true,
        type: Number,
        required: true
    },
    patient_name: {
        type: String,
        required: true
    },
    patient_age: {
        required: true,
        type: Number
    },
    patient_address: {
        required: true,
        type: String
    },
    patient_mobileNo: {
        required: true,
        type: Number
    },
    patient_disease: {
        required: true,
        type: String
    },
}, { timestamps: true })


const Patients = mongoose.model("patients", patientsSchema)

module.exports = Patients