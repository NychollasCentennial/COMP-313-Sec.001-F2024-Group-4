const mongoose = require('mongoose');

// Define a schema for Clinic
const clinicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    address: String,
    city: String,
    state: String,
    zipCode: String,
    coordinates: {
      type: { type: String, enum: ['Point'], required: true },
      coordinates: { type: [Number], required: true } 
    }
  },
  specialty: {
    type: [String],
    required: true 
  },
  rating: {
    type: Number,
    min: 0,
    max: 5
  },
  clinicHours: {
    monday: { open: String, close: String },
    tuesday: { open: String, close: String },
    wednesday: { open: String, close: String },
    thursday: { open: String, close: String },
    friday: { open: String, close: String },
    saturday: { open: String, close: String },
    sunday: { open: String, close: String }
  },
  contact: {
    phone: String,
    email: String,
    website: String
  },
  amenities: [String] 
}, { timestamps: true });

clinicSchema.index({ "location.coordinates": "2dsphere" });

const Clinic = mongoose.model('Clinic', clinicSchema);

module.exports = Clinic;
