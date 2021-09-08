import { useState } from "react"
import EveryAppoinmet from "./EveryAppoinmet"

const AppointmentDay =({day,timeTable})=>{
    const[view, setView] = useState(false)

    const viewHandler=()=>{
        setView(!view)
    }

    const bookAppointmentHandler=()=>{
        console.log('estoy segura')
    }

    const turn = timeTable.map((obj,index)=> <EveryAppoinmet key={index} bookAppointmentHandler={bookAppointmentHandler} hour={obj}/>)
    return(
        <>
            <div  className='item2' onClick={viewHandler}>
                <h3>{day}</h3>
            </div>
            <div>
                {view && turn}
            </div>
        </>
    )

}
export default AppointmentDay