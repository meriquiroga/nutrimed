const Patient = require("../models/Patient")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

const patientControllers = {
   singIn: async (req, res) => {
      const { mail, password, flagGoogle } = req.body
      try {
         let userExist = await Patient.findOne({ "data.mail": mail }).populate(
            "medicalData.doctorID",
            { name: 1, lastName: 1, registration: 1 }
         )
         if (!userExist)
            throw new Error("The data entered is not valid. Please, try again.")
         if (userExist.google && !flagGoogle)
            throw new Error("Sign in with Google.")
         let match = bcryptjs.compareSync(password, userExist.password)
         if (!match)
            throw new Error("The data entered is not valid. Please, try again.")
         let token = jwt.sign({ ...userExist }, process.env.SECRETOKEN)
         res.json({ success: true, res: { userExist, token } })
      } catch (err) {
         res.json({ success: false, res: err.message })
      }
   },
   addMedicalData: async (req, res) => {
      console.log(req.user._id)
      try {
         let newMedicalData = await Patient.findOneAndUpdate(
            { _id: req.params.id },
            {
               $push: {
                  medicalData: {
                     doctorID: req.user._id,
                     description: req.body.description,
                  },
               },
            },
            { new: true }
         )
         res.json({ success: true, res: newMedicalData.medicalData })
      } catch (err) {
         res.json({ success: false, res: err.message })
      }
   },
}
module.exports = patientControllers
