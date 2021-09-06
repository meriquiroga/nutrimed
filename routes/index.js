const express = require("express");
const router = express.Router();
const passport = require("passport");
const userControllers = require("../controllers/userControllers");
const doctorControllers = require("../controllers/doctorControllers");
const patientControllers = require("../controllers/patientControllers");
const appointmentControllers = require("../controllers/appointmentControllers");

router.route("/user")
.post(userControllers.addUser)

router.route("/doctor")
.get(doctorControllers.singIn)
.put(passport.authenticate("jwt", { session: false }),doctorControllers.editProfile)

router.route("/doctors")
.get(doctorControllers.getDoctors)

router.route("/doctor/:id")
.get(doctorControllers.getDoctorById)
.put(passport.authenticate("jwt", { session: false }),doctorControllers.changedReview)

router.route("/patient")
.get(patientControllers.singIn)
.put(passport.authenticate("jwt", { session: false }),patientControllers.editProfile)

router.route("/patient/:id")
.put(passport.authenticate("jwt", { session: false }),patientControllers.addMedicalData)

router.route("/appointment/:id")
.post(passport.authenticate("jwt", { session: false }),appointmentControllers.addAppointment)
.delete(passport.authenticate("jwt", { session: false }),appointmentControllers.deleteAppointment)

router.route("/appointments")
.get(passport.authenticate("jwt", { session: false }),appointmentControllers.getAppointments)

module.exports = router;
