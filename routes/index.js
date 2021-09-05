const express = require("express");
const router = express.Router();
const doctorControllers = require("../controllers/doctorControllers");

router
  .route("/doctor/signup")
  .get(doctorControllers.getDoctors)
  .post(doctorControllers.newDoctor);

router.route("/doctor/:doctorId").get(doctorControllers.getDoctorById);
//   .put(doctorControllers.updateDoctor);
module.exports = router;
