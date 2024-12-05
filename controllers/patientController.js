const alertMessage = require('../helpers/alertMessage');
const Patient = require('../models/patient');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getPatientPortal = async (req, res) => {
    const data = { title: 'Patient Portal', message: undefined, user: res.locals.user }
    res.render('patients/patient_portal', data)
}

exports.getRegisterPatient = async (req, res) => {
    const data = { title: 'Register New Patient', message: undefined, user: res.locals.user }
    res.render('register_patient', data)
}

exports.createPatient = async (req, res) => {

    const data = { title: 'Register', message: undefined, user: res.locals.user }
    try {

        const patientInfo = await Patient.findOne({ email: req.body.email }).exec();
        if (patientInfo) {
            data.message = alertMessage.alertMessage('error', 'Email already registered', `Email already registered`);
            res.render('register', data)
            return;
        }
        const patient = new Patient(req.body);
        await patient.save();
        data.message = alertMessage.alertMessage('success', 'Patient Registered!', `Patient Registered, user your email and password to login!`);
        res.render('login', data)
        return
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find();
        res.json(patients);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getPatientById = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.json(patient);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updatePatient = async (req, res) => {
    try {
        const { id } = req.params;
        const patient = await Patient.findByIdAndUpdate(id, req.body, { new: true });
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.json(patient);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deletePatient = async (req, res) => {
    try {
        const { id } = req.params;
        const patient = await Patient.findByIdAndDelete(id);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.json({ message: 'Patient deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.checkLogin = async (req, res) => {

    const data = { title: 'Login', message: undefined, user: res.locals.user }

    const { email, password, type } = req.body;
    const patientInfo = await Patient.findOne({ email: req.body.email }).exec();
    if (!patientInfo) {

        data.message = alertMessage.alertMessage('error', 'Login Failed!', `Patient not found for email: ${req.body.email}`);
        res.render('login', data)
        return
    }
    const isValidPassword = await bcrypt.compare(req.body.password.trim(), patientInfo.password);
    if (!isValidPassword) {
        data.message = alertMessage.alertMessage('error', 'Login Failed!', `Patient not found for email: ${req.body.email}`);
        res.render('login', data)
        return
    }
    const token = jwt.sign(
        { username: email, id: patientInfo.id, role: 'patient' }, // Incluindo type no payload
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
    data.title = 'Patient Portal'
    res.cookie('jwt', token, { httpOnly: true });
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            res.locals.user = null;
            return next();
        }
        res.locals.user = decoded;
        data.user = decoded
    });

    data.message = alertMessage.alertMessage('success', 'Welcome', `Welcome ${patientInfo.name}`);
    res.render('patients/patient_portal', data)
    return

};

exports.getHealthRecords = async (req, res) => {
    const patientInfo = await Patient.findById(res.locals.user.id)
    if (patientInfo && patientInfo.dateOfBirth) {
        patientInfo.formattedDateOfBirth = patientInfo.dateOfBirth.toISOString().split('T')[0]; // Convert to "YYYY-MM-DD"
    }
    const data = { title: 'Health Records', message: undefined, user: res.locals.user, patient: patientInfo }
    res.render('patients/access_health_records', data)
}

exports.getLogout = async (req, res) => {
    res.clearCookie('jwt');     
    res.redirect('/');
}
exports.getChangePassword = async (req, res) => {

    const data = { title: 'Change Password', message: undefined, user: res.locals.user }
    res.render('patients/change_password',data);
}

exports.postChangePassword = async (req, res) => {

    const data = { title: 'Change Password', message: undefined, user: res.locals.user }

    const { password, newPassowrd, newPassowrd2 } = req.body;

    const patientInfo = await Patient.findById(res.locals.user.id);


    if(!newPassowrd || !newPassowrd || !newPassowrd2 || !patientInfo){
        data.message = alertMessage.alertMessage('error', 'Error!', `Field(s) missing`);
        res.render('patients/change_password',data);
        return 
    }


    const isValidPassword = await bcrypt.compare(password, patientInfo.password);

    if(!isValidPassword){
        data.message = alertMessage.alertMessage('error', 'Invalid Password', `You old passord is incorrect `);
        res.render('patients/change_password',data);
        return     
    }

    if(newPassowrd != newPassowrd2){
        data.message = alertMessage.alertMessage('error', 'Invalid Password', `The New Password does not match the Confirm Password `);
        res.render('patients/change_password',data);
        return     
    }    
    patientInfo.password = newPassowrd;
    await patientInfo.save();

    data.message = alertMessage.alertMessage('success', 'Passowrd Updated!', `Passowrd Updated!`);
    res.render('patients/patient_portal',data);
}


exports.resetPassword = async (req, res) => {

    const data = { title: 'Recover Password', message: undefined, user: res.locals.user }
    const patientInfo = await Patient.findOne({ email: req.body.email }).exec();
    let password =  req.body.password
    if(!patientInfo){
        data.message = alertMessage.alertMessage('error', 'Email Not Found', `Email not Found `);
        res.render('reset_password',data);
        return  
    }
 
    patientInfo.password = password;
    await patientInfo.save();

    data.message = alertMessage.alertMessage('success', 'Passowrd Updated!', `Passowrd Updated!`);
    res.render('login',data);
}


exports.getBookAppointment = async (req, res) => {
    const data = { title: 'Booking', message: undefined, user: res.locals.user }
    res.render('patients/book_appointment',data);
}


