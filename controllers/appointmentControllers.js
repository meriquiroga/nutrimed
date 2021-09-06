const Appointment = require('../models/Appointment')

const appointmentControllers={
    addAppointment:async(req,res)=>{
        const newAppointment = new Appointment ({doctorId:req.params.id, patientId:req.user._id, date:req.body.date},{new:true})
        try{ 
            await newAppointment.save()
            res.json({success:true, res:newAppointment})
        }catch(err){
            res.json({success:false, res:err.message})
        }
    },
}

module.exports = appointmentControllers
