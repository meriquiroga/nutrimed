import ScrollableFeed from "react-scrollable-feed";
import EveryReview from "./EveryReview";
import doctorActions from "../redux/actions/doctorActions";
import { connect } from "react-redux";
import { useState } from "react";

const Reviews = ({ reviews, dataUser, doctorId, userToken, addReview }) => {
  const [newReviews, setNewReview] = useState(reviews);
  const [text, setText] = useState("");
  const deleteReviewHandler = () => {};
  const editTextReviewHandler = (e) => {
    setText(e.target.value);
  };

  const addReviewHandler = () => {
    setText("");
    if (text) {
      addReview(userToken, doctorId, text).then((res) => {
        if (res.success) {
          setNewReview([...newReviews, res.res[res.res.length - 1]]);
        } else {
          console.log(res.res);
        }
      });
    }
  };

  const everyReview = newReviews.map((obj) => (
    <EveryReview
      key={obj._id}
      review={obj}
      user={dataUser}
      userToken={userToken}
      deleteReviewHandler={deleteReviewHandler}
      editTextReviewHandler={editTextReviewHandler}
    />
  ));
  return (
    <div className="divReview">
      <ScrollableFeed className="divComentaries">{everyReview}</ScrollableFeed>
      <div>
        <input
          placeholder="review"
          onChange={editTextReviewHandler}
          defaultValue={text}
        />
        <button onClick={addReviewHandler}>enviar</button>
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
  addReview: doctorActions.addReview,
};
export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
