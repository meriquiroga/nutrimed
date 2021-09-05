const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: String,
  lastName: String,
  dni: Number,
  description: String,
  registration: String,
  specialty: String,
  password: String,
  data: {
    direction: {
      calle: String,
      num: String,
      city: String,
    },
    phoneNumber: Number,
    mail: String,
  },
  score: Array,
  appointment: [
    {
      patientId: { type: mongoose.Types.ObjectId, ref: "patient" },
      date: {
        hour: String,
        date: String,
      },
    },
  ],
  flag: { type: String, default: "doctor" },
});

const Doctor = mongoose.model("doctor", doctorSchema);
module.exports = Doctor;
