const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const nurseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    specialty: { type: String },
    password: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
nurseSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password.trim(), salt);
    this.password = hashedPassword;
})

module.exports = mongoose.model('Nurse', nurseSchema);
