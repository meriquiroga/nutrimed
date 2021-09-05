const Appointment = require('../models/Appointment')

const appointmentControllers={
    addAppointment:async(req,res)=>{
        try{ 
            const newAppointment = new Appointment({date:req.body.date, doctorId: req.params.id, patientId:req.user._id})
            await newAppointment.save()
            res.json({success:true, res:newAppointment})
        }catch(err){
            res.json({success:false, res:err.message})
        }
    },
}

module.exports = appointmentControllers
