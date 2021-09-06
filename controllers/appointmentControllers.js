const Appointment = require("../models/Appointment");

const appointmentControllers = {
  addAppointment: async (req, res) => {
    const newAppointment = new Appointment({
      doctorId: req.params.id,
      patientId: req.user._id,
      date: req.body.date,
    });
    try {
      await newAppointment.save();
      res.json({ success: true, res: newAppointment });
    } catch (err) {
      res.json({ success: false, res: err.message });
    }
  },
  getAppointments: async (req, res) => {
    if (req.user.doc) {
      console.log("entra a if de doctor");
      try {
        let appointments = await Appointment.find({
          doctorId: req.user._id,
        });
        console.log(appointments);
        res.json({ success: true, res: appointments });
      } catch (err) {
        res.json({ success: false, res: err.message });
      }
    } else {
      try {
        let appointments = await Appointment.find({
          patientId: req.user._id,
        });
        res.json({ success: true, res: appointments });
      } catch (err) {
        res.json({ success: false, res: err.message });
      }
    }
  },
  deleteItinerary: (req, res) => {
    try {
      let appointmentToDelete = await Appointment.findOneAndDelete({
        _id: req.body._id,
      });

      res.json({ success: true, res: appointmentToDelete });
    } catch (err) {
      res.json({ success: false, res: err.message });
    }
  },
};

module.exports = appointmentControllers;
