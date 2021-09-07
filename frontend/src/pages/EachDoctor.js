import { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import doctorActions from "../redux/actions/doctorActions"
import Reviews from "../components/Reviews"
import patientActions from "../redux/actions/patientActions"

class EachDoctor extends Component {
   state = {
      loading: { condition: true, text: "loading...", link: "" },
   }

   componentDidMount() {
      window.scroll(0, 0)
      if (!this.props.doctors.length) {
         this.props.getOneDoctorDB(this.props.match.params.id).then((res) => {
            res.success
               ? this.setState({ loading: { condition: false } })
               : this.setState({
                    loading: {
                       ...this.state.loading,
                       text: "Ocurrio un error, intelo mas tarde",
                       link: "Home",
                    },
                 })
         })
      } else {
         this.props.getOneDoctor(this.props.match.params.id)
         this.setState({ loading: { condition: false } })
      }
   }
   render() {
      if (this.state.loading.condition) {
         return (
            <>
               <h2>{this.state.loading.text}</h2>
               <Link to="/">{this.state.loading.link}</Link>
            </>
         )
      }
      return (
         <div className="pageDoctor">
            <div>
               <div
                  className="doc"
                  style={{ backgroundImage: `url('${this.props.doctor.src}')` }}
               ></div>
               <p>
                  {this.props.doctor.name} {this.props.doctor.lastName}
               </p>
               <p>{this.props.doctor.registration}</p>
               <p>{this.props.doctor.description}</p>
               <p>{this.props.doctor.specialty}</p>
               <div>
                  <Reviews
                     reviews={this.props.doctor.review}
                     doctorId={this.props.doctor._id}
                  />
               </div>
            </div>
         </div>
      )
   }
}
const mapStateTopProps = (state) => {
   return {
      doctor: state.doctors.doctor,
      doctors: state.doctors.doctors,
   }
}
const mapDispatchToProps = {
   getOneDoctor: doctorActions.getOneDoctor,
   getOneDoctorDB: doctorActions.getOneDoctorDB,
}

export default connect(mapStateTopProps, mapDispatchToProps)(EachDoctor)
