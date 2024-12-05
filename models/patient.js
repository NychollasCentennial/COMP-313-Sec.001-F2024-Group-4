const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const patientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastName: { type: String},
    dateOfBirth: { type: Date },
    Gender: { type: String },
    medicalHistory: { type: String },
    vitalSigns: { type: String },
    diagnosis: { type: String },
    bloodPressure: { type: Number },
    temperature: { type: Number },
    heartRate: { type: Number },
    password: {type: String},  
    email: {type: String},  
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

patientSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password.trim(), salt);
    this.password = hashedPassword;
})

module.exports = mongoose.model('Patient', patientSchema);
