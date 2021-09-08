import { useEffect, useState } from "react";
import EveryAppoinmet from "./EveryAppoinmet";

const AppointmentDay =({day,timeTable,appointmentByDay,bookAppointmentHandler,fullDay})=>{
    const[view, setView] = useState({turn: false, warning:false})

    const viewHandler=()=>{
        setView({...view, turn:!view.turn})
    }
    const viewWarningHandler =()=>{
        setView({...view, warning:!view.warning})
    }
    const turn = timeTable.map((obj,index)=> {
        const fullHour = appointmentByDay.filter(objeto=> objeto.date.hour === obj)
        return(
            <EveryAppoinmet key={index} hour={obj} fullHour={fullHour} day={day} viewHandler={viewHandler} bookAppointmentHandler={bookAppointmentHandler}/>
        )})
    return(
        <>
            <div className={fullDay ? 'full' : 'noFull'} onClick={!fullDay ? viewHandler : viewWarningHandler}>
                <h3>{day}</h3>
            </div>
            <div>
                {view.turn && turn}
                {view.warning && <p>Sin turnos disponible, intente con otra fecha</p>}
            </div>
        </>
    )

  const turn = timeTable.map((obj, index) => {
    const fullHour = appointmentByDay.filter((day) => day.date.hour === obj);

    return (
      <EveryAppoinmet
        key={index}
        bookAppointmentHandler={bookAppointmentHandler}
        hour={obj}
        fullHour={fullHour}
      />
    );
  });
  return (
    <>
      <div
        className={fullDay ? "full" : "noFull"}
        onClick={!fullDay ? viewHandler : () => {}}
      >
        <h3>{day}</h3>
      </div>
      <div>{view && turn}</div>
    </>
  );
};
export default AppointmentDay;
