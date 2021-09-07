import { useState, useEffect } from "react";
import { connect } from "react-redux";
import doctorActions from "../redux/actions/doctorActions";

const EveryReview = ({review, user, userToken, deleteReviewHandler,actionReview, doctorId}) => {
  const {userExist} = user
  const {text, patientId, _id}=review
  const [newText, setNewText]=useState({review:text , edit:false, editReview:text})
  const [edit, setEdit]= useState(false)
  const [enable, setEnable] = useState({edit:false, delete:false})
  const [error, setError] = useState('')

  useEffect(()=>{
    if(userToken){
      userExist._id === patientId._id ? setEdit(true) : setEdit(false)
    }
  },[user])

  const enableEditHandler=(icon)=>{
    icon === 'cross' && setEnable({delete:false, edit:false})
    icon === 'edit' && setEnable({delete:true, edit:true})
  }

  const editText=(e)=>{
    setNewText({...newText, edit: !edit})
    setNewText({...newText, editReview:e.target.value})
  }

  const enableDeleteHandler=()=>{
    setEnable({...enable, delete:true})
  }
  const actionReviewHandler=(text)=>{
    actionReview(userToken, doctorId, text, 'editReview', _id)
    .then(res=>{
        if(res.success){
          let obj = res.res.find(obj=>obj._id === _id)
          setNewText({review:obj.text , edit:false, editReview:obj.text})
          setEnable({delete:false, edit:false})
        }else{
          console.log(res)
        }
        }
    )
  }
  const editReviews= !edit ? null 
                    :<div>
                        {(!enable.edit && enable.delete) && <span>Seguro?</span>}
                        {(!enable.delete && !enable.edit) && <img className='icon'  src='/assets/delete.png' alt='delete' onClick={enableDeleteHandler}/>}
                        {enable.edit && <img className='icon'  src='/assets/send.png' alt='delete' onClick={()=>actionReviewHandler(newText.editReview, _id)}/>}
                        {(enable.edit || enable.delete) && <img className='icon'  src='/assets/cross.png' alt='edit' onClick={()=>enableEditHandler('cross')}/>}
                        {(!enable.edit && enable.delete) && <img className='icon'  src='/assets/check.png' alt='edit' onClick={()=>deleteReviewHandler(_id)}/>}
                        {(!enable.edit && !enable.delete) && <img className='icon'  src='/assets/edit.png' alt='edit' onClick={()=>enableEditHandler('edit')}/>}
                    </div>

  return(
    <div>
        <div className='iconperfil' style={{backgroundImage:`url("${patientId.src}")`}}></div>
        <div>
            <div>
                <p>{patientId.name} {patientId.lastName}</p>
                <div>
                    {!enable.edit && <p>{newText.review}</p>}
                    {enable.edit && <textarea maxLength='200' defaultValue={newText.review} onChange={editText} disabled={!enable}/>}
                </div>
            </div>
            {editReviews}
        </div>
    </div>
  )
};
const mapDispatchToProps = {
  actionReview:doctorActions.actionReview
};
export default connect(null, mapDispatchToProps)(EveryReview)