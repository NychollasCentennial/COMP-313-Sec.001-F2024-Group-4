const express = require('express');
const router = express.Router();
const clinicController = require('../controllers/clinicController');

const authenticateToken = require('../middleware/authMiddleware'); 
router.get('/clinics',  clinicController.getAllClinics); 
router.post('/clinics', clinicController.findClinics); 



router.get('/clinics/:id',  clinicController.getClinicbyId); 
router.get('/clinics/filter',  clinicController.findClinics); 

module.exports = router;
