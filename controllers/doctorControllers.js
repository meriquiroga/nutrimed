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
    changedDoctor:async(req,res)=>{
        switch(req.body.action){
            case 'addReview':
                try{
                    let newReview = await Doctor.findOneAndUpdate({_id: req.params.id},{$push:{review:{patientId:req.user._id, text:req.body.text}}},{new:true}).populate('appointment.patientId',{password:0, _v:0,})
                    res.json({success:true, res:newReview.review})
                }catch(err){
                    res.jon({success:false, res:err.message})
                }
            break;
        }
    },
    editPerfil:async(req,res)=>{
        try{
            var changedCity = await City.findOneAndUpdate({_id : req.params.id}, {...req.body}, {new:true})
            if(changedCity){
                res.json({success : true, res:changedCity})
            }else{
                throw new Error()
            } 
        }catch(err){
            res.json({success: false, res:err.message})
        }
    },
    getDoctors: async (req, res) => {
        try {
            let doctors = await Doctor.find()
            res.json({success:true, res:doctors })
        }catch (err){
            res.json({success:false, res:err.message})
        }
    },
    getDoctorById: async (req, res) => {
        try {
            let doctor = await Doctor.findOne({_id: req.params.doctorId})
            if(doctor){
                res.json({success:true, res:doctor})
            }else{
                throw new Error()
            }
        }catch(err){
            res.json({success:false, res:err.message})
        }
    }
}
module.exports = doctorControllers
