const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

const authenticateToken = require('../middleware/authMiddleware'); 
router.post('/patients', patientController.createPatient);
router.get('/register_patient', patientController.getRegisterPatient);
router.get('/patients',authenticateToken, patientController.getAllPatients);
router.get('/patient_portal',authenticateToken, patientController.getPatientPortal);
router.get('/patients/patient_portal',authenticateToken, patientController.getPatientPortal);
router.get('/patients/access_health_records',authenticateToken, patientController.getHealthRecords);
router.get('/patients/change_password',authenticateToken, patientController.getChangePassword);
router.post('/patients/change_password',authenticateToken, patientController.postChangePassword);
router.post('/patients/book_appointment',authenticateToken, patientController.getBookAppointment);

router.get('/patients/logout', patientController.getLogout);




//keep it at the end 
// router.get('/patients/:id',authenticateToken, patientController.getPatientById);
// router.put('/patients/:id',authenticateToken, patientController.updatePatient);
// router.delete('/patients/:id',authenticateToken, patientController.deletePatient);

module.exports = router;
