const Doctor = require("../models/Doctor");
const doctorControllers = {
  newDoctor: async (req, res) => {
    console.log("entro al controlador");
    const {
      name,
      lastName,
      dni,
      description,
      registration,
      specialty,
      password,
      data,
      score,
      appointment,
      flag,
    } = req.body;
    const newDoctor = new Doctor({
      name,
      lastName,
      dni,
      description,
      registration,
      specialty,
      password,
      data,
      score,
      appointment,
      flag,
    });
    try {
      let doctorExist = await Doctor.findOne({ dni: dni });
      if (doctorExist) throw new Error("Existe otro doctor con ese DNI");
      await newDoctor.save();
      res.json({
        success: true,
        doctor: newDoctor,
        error: null,
      });
    } catch (e) {
      res.json({ success: false, doctor: null, error: e.message });
    }
  },
  getDoctors: async (req, res) => {
    try {
      let doctors = await Doctor.find();

      if (doctors.length > 0) {
        res.json({ success: true, response: doctors });
      } else {
        throw new Error();
      }
    } catch (e) {
      res.json({ success: false, response: e });
    }
  },
  getDoctorById: async (req, res) => {
    try {
      let doctor = await Doctor.findOne({ _id: req.params.doctorId });
      if (doctor) {
        res.json({ success: true, response: doctor });
      } else {
        throw new Error();
      }
    } catch (e) {
      res.json({ success: false, response: e });
    }
  },
};

module.exports = doctorControllers;
