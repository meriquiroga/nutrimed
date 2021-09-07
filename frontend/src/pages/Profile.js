import { Component } from "react"
import EditProfileDoctor from "../components/EditProfileDoctor"
import EditProfilePatient from "../components/EditProfilePatient"
import ProfileUser from "../components/ProfileUser"


export default class Profile extends Component {
   render() {
      return (
         <>
            <ProfileUser />
         </>
      )
   }
}
