const express = require('express')
const router = express.Router()
// const passport= require('passport')
const userControllers = require('../controllers/userControllers')
const doctorControllers = require('../controllers/doctorControllers')
const patientControllers = require('../controllers/patientControllers')

router.route('/user')
.post(userControllers.addUser)

router.route('/doctor')
.get(doctorControllers.singIn)

router.route('/doctor/:id')
.post(doctorControllers.addappointment)
.get(doctorControllers.getDoctorById)

router.route('/patient')
.get(patientControllers.singIn)
.put(patientControllers.putPatient)

router.route('/patient/:id')
.post(patientControllers.addMedicalData)

module.exports=router




