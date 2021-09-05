const express = require("express")
const router = express.Router()
const patientsControllers = require("../controllers/patientsControllers")

router.route("/patient").put(patientsControllers.putPatient)

module.exports = router
