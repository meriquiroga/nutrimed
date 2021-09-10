const Appointment = require("../models/Appointment")
const transport = require("../config/transport")

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
      console.log(req.user)
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

   // deleteAppointment: async (req, res) => {
   //    console.log(req)
   //    try {
   //       let appointmentToDelete = await Appointment.findOneAndUpdate(
   //          { _id: req.params.id },
   //          {
   //             $pull: {
   //                appointment: { _id: req.body.appointmentId },
   //             },
   //          },
   //          { new: true }
   //       )
   //       // ).populate("review.patientId", { name: 1, lastName: 1, src: 1 });
   //       res.json({ success: true, res: appointmentToDelete.date })
   //    } catch (err) {
   //       res.json({ success: false, res: err.message })
   //    }
   // },

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
   sendMails: async (req, res) => {
      try {
         let options = {
            from: "NutriMed <nutrimed.centronutricional@gmail.com>",
            to: req.user.data.mail,
            subject: "Confimarcion de Turno",
            // text:`Hola ${req.user.name} ${req.user.lastName}`
            html: `
            <img src="/assets/logo.png" alt="logo" />
            <div>
              <h1>Reserva de turno</h1>
              <h2>
                Estimado/a ${req.user.name} ${req.user.lastName}:
              </h2>
              <p>
                Te enviamos este e-mail para comunicarte que has reservado un turno en
                el Centro Medico NutriMed
              </p>
            </div>
            
            <div>
              <h3>Datos del paciente:</h3>
              <p>Nombre: ${req.user.name} </p>
              <p>Apellido: ${req.user.lastName}</p>
              <p>Tipo Documento: D.N.I.</p>
              <p>Nro. Doc. :</p>
            </div>
            
            <div>
              <h2>Constancia del Turno:</h2>
              <p>Ubicación: Av Colón 150</p>
              <p>Servicio: ${req.user.specialty}</p>
              <p>Profesional: ${req.user.id}</p>
              <p>Turno para el día ${req.user.date} </p>
              <p>Preparaciones Previas:</p>
            </div>
            
            <div>
              <h2>INFORMACION IMPORTANTE - MEDIDAS DE PROTECCIÓN:</h2>
              <p>
                Nuestra institución cumple todos los protocolos, recomendaciones e
                instrucciones sanitarias en torno al nuevo Coronavirus. Por esta
                razón, le solicitamos respetar las siguientes medidas al concurrir a
                su turno:
              </p>
              <ul>
                <li>Asista solo. Cuando lo necesite, con 1 acompañante.</li>
                <li>Utilice barbijo durante su permanencia en la institución.</li>
                <li>Mantenga 2 metros de distancia con los demás.</li>
                <li>
                  Higienice sus manos al ingresar, antes de retirarse y las veces que
                  lo considere necesario.
                </li>
              </ul>
            </div>
            
            <div>
              <h2>Importante:</h2>
              <p>
                Sr/a. Paciente: Solicitamos por favor que en caso de no poder asistir
                al turno solicitado tenga bien avisarnos via Web o al teléfono
                0810-222-2424.
              </p>
            </div>
            
            `,
         }
         transport.sendMail(options, (err, info) => {
            console.log(err)
         })
      } catch (err) {
         console.log(err)
      }
   },
}

module.exports = appointmentControllers
