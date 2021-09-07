const express = require("express");
const router = express.Router();
const passport = require("passport");
const userControllers = require("../controllers/userControllers");
const doctorControllers = require("../controllers/doctorControllers");
const patientControllers = require("../controllers/patientControllers");
const appointmentControllers = require("../controllers/appointmentControllers");

router.route("/user").post(userControllers.addUser);

router
<<<<<<< HEAD
  .route("/doctor")
  .get(doctorControllers.signIn)
  .put(
    passport.authenticate("jwt", { session: false }),
    doctorControllers.editProfile
  );
=======
   .route("/doctor")
   .post(doctorControllers.signIn)
   .put(
      passport.authenticate("jwt", { session: false }),
      doctorControllers.editProfile
   )
>>>>>>> 06aa5a502c183a3fb65d269b5a6d6f553b8c0294

router.route("/doctors").get(doctorControllers.getDoctors);

router
  .route("/doctor/:id")
  .get(doctorControllers.getDoctorById)
  .put(
    passport.authenticate("jwt", { session: false }),
    doctorControllers.changedReview
  );

router
<<<<<<< HEAD
  .route("/patient")
  .post(patientControllers.signIn)
  .put(
    passport.authenticate("jwt", { session: false }),
    patientControllers.editProfile
  );
=======
   .route("/patient")
   .post(patientControllers.signIn)
   .put(
      passport.authenticate("jwt", { session: false }),
      patientControllers.editProfile
   )
>>>>>>> 06aa5a502c183a3fb65d269b5a6d6f553b8c0294

router.route("/patients").get(patientControllers.getPatients);

router
  .route("/patient/:id")
  .put(
    passport.authenticate("jwt", { session: false }),
    patientControllers.addMedicalData
  );

router
  .route("/appointment/:id")
  .post(
    passport.authenticate("jwt", { session: false }),
    appointmentControllers.addAppointment
  )
  .delete(
    passport.authenticate("jwt", { session: false }),
    appointmentControllers.deleteAppointment
  );

router
  .route("/appointments")
  .get(
    passport.authenticate("jwt", { session: false }),
    appointmentControllers.getAppointments
  );

router
  .route("/verifyToken")
  .get(
    passport.authenticate("jwt", { session: false }),
    userControllers.verifyToken
  );

module.exports = router;
