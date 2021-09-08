import { useEffect, useState } from "react"
import EveryAppoinmet from "./EveryAppoinmet"

const AppointmentDay =({day,timeTable,appointmentByDay,fullDay})=>{
    const[view, setView] = useState(false)

    const viewHandler=()=>{
        setView(!view)
    }

    const bookAppointmentHandler=()=>{
        console.log('estoy segura')
    }
    console.log(appointmentByDay)
    const turn = timeTable.map((obj,index)=> {
        const fullHour = appointmentByDay.filter(day=> day.date.hour === obj)
        console.log(fullHour)
        return(
            <EveryAppoinmet key={index} bookAppointmentHandler={bookAppointmentHandler} hour={obj} fullHour={fullHour}/>
        )})
    return(
        <>
            <div className={fullDay ? 'full' : 'noFull'} onClick={!fullDay ? viewHandler : ()=>{}}>
                <h3>{day}</h3>
            </div>
            <div>
                {view && turn}
            </div>
        </>
    )

}
export default AppointmentDay