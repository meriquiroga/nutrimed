import ScrollableFeed from "react-scrollable-feed";
import EveryReview from "./EveryReview";
import doctorActions from "../redux/actions/doctorActions";
import { connect } from "react-redux";
import { useState } from "react";

const Reviews = ({ reviews, dataUser, doctorId, userToken, actionReview}) => {
  const [newReviews, setNewReview] = useState(reviews)
  const [text, setText] = useState("")
 
  const deleteReviewHandler = (reviewId) => {
    actionReview(userToken, doctorId, text, 'deleteReview',reviewId)
    .then(res=>{
      if(res.success){
        setNewReview(res.res)
      }else{
        console.log(res)
      }
    })
  }
 
  const editTextReviewHandler = (e) => {
    setText(e.target.value);
  }

  const addReviewHandler = () => {
    setText('')
    if (text) {
      actionReview(userToken, doctorId, text, 'addReview')
      .then((res) => {
        if (res.success) {
          setNewReview([...newReviews, res.res[res.res.length - 1]])
        } else {
          console.log(res)
        }
      })
    }
  }

  const everyReview = newReviews.map(obj => (
    <EveryReview
      key={obj._id}
      review={obj}
      user={dataUser}
      userToken={userToken}
      doctorId={doctorId}
      deleteReviewHandler={deleteReviewHandler}
      editTextReviewHandler={editTextReviewHandler}
    />
  ));
  return (
    
    <div className="divReview">
      <ScrollableFeed className="divComentaries">{everyReview}</ScrollableFeed>
      <div>
        <input
          placeholder={!userToken ? 'Create una cuenta para dejar tu feedback al profesional' : 'Dejale tu feedback al profesional'} 
          disabled={!userToken}
          onChange={editTextReviewHandler}
          value={text}
        />
        <button onClick={addReviewHandler} disabled={!userToken}>ENVIAR</button>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    dataUser: state.users.dataUser,
    userToken: state.users.token,
  };
};
const mapDispatchToProps = {
  actionReview: doctorActions.actionReview,
};
export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
