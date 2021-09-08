<<<<<<< HEAD
import { useEffect, useState } from "react"

const EveryAppoinmet = ({hour,fullHour,bookAppointmentHandler,viewHandler,doctorName,day})=>{
    const [view, setView] = useState(true)

    useEffect(()=>{
        if(fullHour[0]){
            fullHour[0].date.hour === hour && setView(false)
        }
    },[])
    const functionHandler= () =>{
        bookAppointmentHandler(hour,day,doctorName)
        viewHandler()
    }   
    
    return(
        <div>
            {view && <button onClick={functionHandler}>{hour}</button>}
        </div>
    )
}
export default EveryAppoinmet
=======
const EveryAppoinmet = ({ hour, bookAppointmentHandler, fullHour }) => {
  return (
    <div>
      <button onClick={bookAppointmentHandler}>{hour}</button>
    </div>
  );
};
export default EveryAppoinmet;

{
  /* <p>seguro?</p>
            <img className='icon' src='/assets/check.png' alt='edit' />
            <img className='icon'  src='/assets/cross.png' alt='edit' onClick={confirmHandler}/> */
}
>>>>>>> origin/dario
