const EveryAppoinmet = ({hour, bookAppointmentHandler,fullHour})=>{
    console.log(fullHour)

    return(
        <div>
            <button onClick={bookAppointmentHandler}>{hour}</button>
        </div>
    )
}
export default EveryAppoinmet

{/* <p>seguro?</p>
            <img className='icon' src='/assets/check.png' alt='edit' />
            <img className='icon'  src='/assets/cross.png' alt='edit' onClick={confirmHandler}/> */}