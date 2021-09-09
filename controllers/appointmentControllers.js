const Appointment = require("../models/Appointment")
const transport = require('../config/transport')

const appointmentControllers = {
   addAppointment: async (req, res) => {
      try {
         const newAppointment = new Appointment({
            date: req.body.date,
            doctorId: req.params.id,
            patientId: req.user._id,
         })
         await newAppointment.save()
         res.json({ success: true, res: newAppointment })
      } catch (err) {
         res.json({ success: false, res: err.message })
      }
   },
   getAppointments: async (req, res) => {
      if (req.user.doc) {
         try {
            let appointments = await Appointment.find({
               doctorId: req.user._id,
            }).populate("patientId")
            res.json({ success: true, res: appointments })
         } catch (err) {
            res.json({ success: false, res: err.message })
         }
      } else {
         try {
            let appointments = await Appointment.find({
               patientId: req.user._id,
            }).populate("doctorId", {
               name: 1,
               lastName: 1,
               src: 1,
               registration: 1,
               specialty: 1,
            })
            res.json({ success: true, res: appointments })
         } catch (err) {
            res.json({ success: false, res: err.message })
         }
      }
   },
   deleteAppointment: async (req, res) => {
      try {
         let appointmentToDelete = await Appointment.findOneAndDelete({
            _id: req.params.id,
         })
         res.json({ success: true })
      } catch (err) {
         res.json({ success: false, res: err.message })
      }
   },
   getAppointementByDoctor: async (req, res) => {
      try {
         let appointmenDoctor = await Appointment.find({
            doctorId: req.params.id,
         })
         res.json({ success: true, res: appointmenDoctor })
      } catch (err) {
         res.json({ success: false, res: err.message })
      }
   },
   sendMails:async(req, res)=>{
      try{
         let options ={
            from:'NutriMed <nutrimed.centronutricional@gmail.com>',
            to: req.user.data.mail,
            subject:'Confimarcion de Turno',
            text:`Hola ${req.user.name} ${req.user.lastName}`
         }
         transport.sendMail(options, (err,info)=>{
            console.log(err)
         })
      }catch(err){
         console.log(err)
      }
   }
}

module.exports = appointmentControllers
