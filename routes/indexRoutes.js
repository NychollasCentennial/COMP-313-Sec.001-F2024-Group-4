
const express = require('express');
const router = express.Router();

const patientRoutes = require('./patientRoutes');
const doctorRoutes = require('./doctorRoutes');
const appointmentRoutes = require('./appointmentRoutes');
const generalRoutes = require('./generalRoutes');
const clinicRoutes = require('./clinicRoutes');

router.use(generalRoutes);
router.use(patientRoutes);
router.use(doctorRoutes);
router.use(appointmentRoutes);
router.use(clinicRoutes);

module.exports = router;
