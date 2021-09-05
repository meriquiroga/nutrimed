const Patient = require("../models/Patient")

const patientsControllers = {
   putPatient: async (req, res) => {
      try {
         let modifyPatient = await Patient.findOneAndUpdate(
            { _id: req.params.id },
            { ...req.body }
         )
         if (modifyPatient) {
            res.json({ success: true, response: modifyPatient })
         } else {
            throw new Error("Error")
         }
      } catch (err) {
         res.json({ success: false, error: err })
      }
   },
}

module.exports = patientsControllers
