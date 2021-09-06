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
    changedReview:async(req,res)=>{
        switch(req.body.action){
            case 'addReview':
                try{
                    let newReview = await Doctor.findOneAndUpdate({_id: req.params.id},{$push:{review:{patientId:req.user._id, text:req.body.text}}},{new:true}).populate('review.patientId',{name:1, lastName:1, src:1})
                    res.json({success:true, res:newReview.review})
                }catch(err){
                    res.json({success:false, res:err.message})
                }
            break;
            case 'editReview':
                try{
                    let editReview = await  Doctor.findOneAndUpdate({'review._id':req.body.reviewId},{$set:{'review.$.text':req.body.text}},{new:true}).populate('review.patientId',{name:1, lastName:1, src:1})
                    res.json({success:true, res:editReview.review})
                }catch(err){
                    res.json({success:false, res:err.message})
                }
            break;
            case 'deleteReview':
                try{
                    let newReview = await Doctor.findOneAndUpdate({_id: req.params.id},{$pull:{review:{patientId:req.user._id, text:req.body.text}}},{new:true}).populate('review.patientId',{name:1, lastName:1, src:1})
                    res.json({success:true, res:newReview.review})
                }catch(err){
                    res.json({success:false, res:err.message})
                }
            break;
        }
    },
    editProfile: async(req, res)=>{
        try{
            let changedDoctor= await Doctor.findOneAndUpdate({_id : req.params.id},{...req.body},{new:true})
            if(changedDoctor){
                res.json({success:true, res:changedDoctor})
            }else {
                throw new Error()
            }
        }catch(err){
            res.json({success: false, res:err.message})
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
