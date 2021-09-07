import { useState, useEffect } from "react";
import { connect } from "react-redux";
import doctorActions from "../redux/actions/doctorActions";

const EveryReview = ({review, user, userToken, deleteReviewHandler,actionReview}) => {
  const {text, patientId, _id}=review
  const [newText, setNewText]=useState({review:text , edit:false, editReview:text})
  const [edit, setEdit]= useState(false)
  const [enable, setEnable] = useState({edit:false, delete:false})
  const [error, setError] = useState('')

  console.log(review)
  
  useEffect(()=>{
    user._id === patientId._id ? setEdit(true) : setEdit(false)
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
    actionReview(_id, userToken, text)
    .then(res=>{
        console.log(res)
        }
    )
  }
  const editReviews= !edit ? null 
                    :<div>
                        {(!enable.edit && enable.delete) && <span>Are you sure?</span>}
                        {(!enable.delete && !enable.edit) && <img className='icon'  src='/assets/delete.png' alt='delete' onClick={enableDeleteHandler}/>}
                        {enable.edit && <img className='icon'  src='/assets/send.png' alt='delete' onClick={()=>actionReviewHandler(newText.editReview)}/>}
                        {(enable.edit || enable.delete) && <img className='icon'  src='/assets/cross.png' alt='edit' onClick={()=>enableEditHandler('cross')}/>}
                        {(!enable.edit && enable.delete) && <img className='icon'  src='/assets/check.png' alt='edit' onClick={()=>deleteReviewHandler(_id)}/>}
                        {(!enable.edit && !enable.delete) && <img className='icon'  src='/assets/edit.png' alt='edit' onClick={()=>enableEditHandler('edit')}/>}
                    </div>

  return(
    <div>
        <div style={{backgroundImage:`url("${user.src}")`}}></div>
        <div>
            <div>
                <p></p>
                <div>
                    {!enable.edit && <p>{text}</p>}
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