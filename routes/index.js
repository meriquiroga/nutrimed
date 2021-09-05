<<<<<<< HEAD
const express = require('express')
const router = express.Router()
const passport= require('passport')
const userControllers = require('../controllers/userControllers')
const doctorControllers = require('../controllers/doctorControllers')
const patientControllers = require('../controllers/patientControllers')

router.route('/user')
.post(userControllers.addUser)

router.route('/doctor')
.get(doctorControllers.singIn)

router.route('/doctor/:id')
.post(doctorControllers.addappointment)

router.route('/patient')
.get(patientControllers.singIn)

router.route('/patient/:id')
.post(patientControllers.addMedicalData)

module.exports=router
=======
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
>>>>>>> origin/dario
