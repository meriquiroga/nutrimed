const mongoose = require('mongoose')

const appointmentSchema= new mongoose.Schema({
    doctorId:{type:mongoose.Types.ObjectId, ref:'doctor'},
    patientId:{type:mongoose.Types.ObjectId, ref:'patient'},
    date:{
        hour:{type:String, default:null},
        date:{type:String, default:null}
        }
})

const Appointment = mongoose.model('appointment', appointmentSchema)
module.exports = Appointment