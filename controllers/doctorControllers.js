const Doctor = require('../models/Doctor')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const doctorControllers = {
    singIn:async(req,res)=>{
        const {mail, password, flagGoogle} = req.body
        try{
            let userExist = await Doctor.findOne({'data.mail': mail}).populate('appointment.patientId',{password:0, _v:0,})
            if(!userExist) throw new Error('The data entered is not valid. Please, try again.')
            if(userExist.google && !flagGoogle) throw new Error('Sign in with Google.')
            let match=bcryptjs.compareSync(password,userExist.password)
            if(!match)throw new Error('The data entered is not valid. Please, try again.')
            let token = jwt.sign({...userExist}, process.env.SECRETOKEN)
            res.json({success:true, res:{userExist,token}})
        }catch(err){
            res.json({success:false, res:err.message})
        }
    },
    addappointment:async(req,res)=>{
        try{
            let newAppointment=await Doctor.findOneAndUpdate({_id: req.params.id},{$push:{addappointment:{patientId:req.patient._id, date:{...req.body.date}}}},{new:true}).populate('appointment.patientId',{password:0, _v:0,})
            res.json({success:true, res:newAppointment.addappointment})
        }catch(err){
            res.json({success:false, res:err.message})
        }

    },
    getDoctors: async (req, res) => {
      try {
        let doctors = await Doctor.find();
        if (doctors.length > 0) {
          res.json({ success: true, response: doctors });
        } else {
          throw new Error();
        }
      } catch (e) {
        res.json({ success: false, response: e });
      }
    },
    getDoctorById: async (req, res) => {
      try {
        let doctor = await Doctor.findOne({ _id: req.params.doctorId });
        if (doctor) {
          res.json({ success: true, response: doctor });
        } else {
          throw new Error();
        }
      } catch (e) {
        res.json({ success: false, response: e });
      }
    }
}
module.exports = doctorControllers
