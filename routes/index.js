const express = require("express")
const router = express.Router()
const passport = require("passport")
const userControllers = require("../controllers/userControllers")
const doctorControllers = require("../controllers/doctorControllers")
const patientControllers = require("../controllers/patientControllers")
const appointmentControllers = require("../controllers/appointmentControllers")

router
   .route("/user")
   .post(userControllers.addUser)
   .get(userControllers.getPatients)

router.route("/user/:id").put(userControllers.modifyPatient)

router.route("/doctor").get(doctorControllers.singIn)

router
   .route("/doctor/:id")
   .get(doctorControllers.getDoctorById)
   .put(
      passport.authenticate("jwt", { session: false }),
      doctorControllers.changedReview
   )

router.route("/doctor/profile/:id").put(doctorControllers.editProfile)

router.route("/patient").get(patientControllers.singIn)

router
   .route("/patient/:id")
   .put(
      passport.authenticate("jwt", { session: false }),
      patientControllers.addMedicalData
   )

router
   .route("/appointment/:id")
   .post(
      passport.authenticate("jwt", { session: false }),
      appointmentControllers.addAppointment
   )

router
   .route("/appointments")
   .get(
      passport.authenticate("jwt", { session: false }),
      appointmentControllers.getAppointments
   )

module.exports = router
