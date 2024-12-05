const Doctor = require('../models/doctor');


exports.getDoctorPortal = async (req, res) => {
    res.render('doctor_portal')
}

exports.createDoctor = async (req, res) => {
    try {
        const newDoctor = new Doctor(req.body);
        await newDoctor.save();
        res.status(201).json(newDoctor);
    } catch (error) {
        res.status(400).send('Error creating doctor');
    }
};

exports.getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.json(doctors);
    } catch (error) {
        res.status(500).send('Error fetching doctors');
    }
};

exports.getDoctorById = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) {
            return res.status(404).send('Doctor not found');
        }
        res.json(doctor);
    } catch (error) {
        res.status(500).send('Error fetching doctor');
    }
};

exports.updateDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!doctor) {
            return res.status(404).send('Doctor not found');
        }
        res.json(doctor);
    } catch (error) {
        res.status(400).send('Error updating doctor');
    }
};

exports.deleteDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findByIdAndDelete(req.params.id);
        if (!doctor) {
            return res.status(404).send('Doctor not found');
        }
        res.json({ message: 'Doctor deleted successfully' });
    } catch (error) {
        res.status(500).send('Error deleting doctor');
    }
};
