const Patient = require("../models/Patient")
const Doctor = require("../models/Doctor")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userControllers = {
   addUser: async (req, res) => {
      const { name, lastName, data, password, src, google, doc, passwordAdm } =
         req.body
      const hashedPassword = bcryptjs.hashSync(password)
      const userType = doc ? Doctor : Patient
      try {
         if (process.env.PASSWORD_ADM !== passwordAdm && userType == Doctor)
            throw new Error("No tienes autorizacion")
         let newUser = new userType({
            name,
            lastName,
            data,
            password: hashedPassword,
            src,
            google,
            doc,
         })
         let repeatUser = await userType.findOne({ "data.mail": data.mail })
         if (repeatUser)
            throw new Error("Mail is being used with another account")
         await newUser.save()
         let token = jwt.sign({ ...newUser }, process.env.SECRETOKEN)
         res.json({ success: true, res: { newUser, token } })
      } catch (err) {
         res.json({ success: false, res: err.message })
      }
   },

   getPatients: (req, res) => {
      Patient.find()
         .then((patients) => res.json({ success: true, response: patients }))
         .catch((err) => res.json({ success: false, response: err }))
   },

   modifyPatient: (req, res) => {
      Patient.findOneAndUpdate(
         { _id: req.params.id },
         { ...req.body },
         { new: true }
      )
         .then((modifyPatient) =>
            res.json({ success: true, response: modifyPatient })
         )
         .catch((err) => res.json({ success: false, response: err }))
   },

   addData: async (req, res) => {
      try {
         let newData = await Patient.findOneAndUpdate(
            { _id: req.params.id },
            {
               ...req.body,
            },
            { new: true }
         )
         res.json({ success: true, res: newData })
      } catch (err) {
         res.json({ success: false, res: err.message })
      }
   },

   // putPatient: async (req, res) => {
   //    console.log(req)
   //    try {
   //       let modifyPatient = await Patient.findOneAndUpdate(
   //          { _id: req.user._id },
   //          { ...req.body },
   //          { new: true }
   //       )
   //       if (modifyPatient) {
   //          res.json({ success: true, res: modifyPatient })
   //       } else {
   //          throw new Error("Error")
   //       }
   //    } catch (err) {
   //       res.json({ success: false, error: err })
   //    }
   // },
}
module.exports = userControllers
