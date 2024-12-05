const alertMessage = require('../helpers/alertMessage');
const Clinic = require('../models/clinic');
// 

exports.addClinic = async (req, res) => {
    try {
        const clinic = new Clinic(req.clinicData);
        await clinic.save();
        console.log("Clinic added successfully:", clinic);
    } catch (error) {
        console.error("Error adding clinic:", error);
    }
};
exports.getAllClinics = async (req, res) => {
    try {
    const data = { title: 'Clinics', message: undefined, user: res.locals.user }
    const filter ={...req.body}
    const clinics = await Clinic.find(); 
       res.render('clinics/clinics',{ data, clinics,filter })
    } catch (error) {
      console.error("Error retrieving clinics:", error);
      res.render('clinics')
    }
  };
  exports.getClinicbyId = async (req, res) => {
    try {
    const filter ={...req.body}
    const clinics = await Clinic.findById(req.params.id);
        console.log(clinics.name)
    const data = { title: 'Clinics', message: undefined, user: res.locals.user,clinic: clinics}
    res.render('clinics/clinic_details', { data, clinics, filter });
    } catch (error) {
      console.error("Error retrieving clinics:", error);
      res.render('clinics')
    }
  }; 
exports.findClinics = async (req, res) => {
    const { location, specialty, minRating, maxDistance, openNow } = req.body;

    const query = {};

    // Search by specialty
    if (specialty) {
        query.specialty =  {$in: [specialty]};
    }

    // Filter by minimum rating
    if (minRating) {
        query.rating = { $gte: parseFloat(minRating) };
    }

    // Filter by location with geospatial search
    if (location) {

        query["location.city"] = location;
    }

    // Filter by current open status if needed
    if (openNow) {
        const day = new Date().toLocaleString('en-US', { weekday: 'long' }).toLowerCase();
        const currentTime = new Date().toTimeString().split(' ')[0];
        query[`clinicHours.${day}.open`] = { $lte: currentTime };
        query[`clinicHours.${day}.close`] = { $gte: currentTime };
    }

    // Find and return clinics based on filters
    console.log(query)
    const clinics = await Clinic.find(query);
    const data = { title: 'Clinics', message: undefined, user: res.locals.user }
    const filter ={location,specialty,minRating}

    res.render('clinics/clinics',{ data, clinics,filter })
};
exports.updateClinic = async (req, res) => {
    try {
        const updatedClinic = await Clinic.findByIdAndUpdate(
            req.clinicId,
            { $set: req.updateData },
            { new: true } // Return the updated document
        );
        console.log("Clinic updated successfully:", updatedClinic);
    } catch (error) {
        console.error("Error updating clinic:", error);
    }
};
exports.deleteClinic = async (req, res) => {
    try {
        const deletedClinic = await Clinic.findByIdAndDelete(req.clinicId);
        if (deletedClinic) {
            console.log("Clinic deleted successfully:", deletedClinic);
        } else {
            console.log("Clinic not found.");
        }
    } catch (error) {
        console.error("Error deleting clinic:", error);
    }
};