import { useState, useEffect } from "react";
import { connect } from "react-redux";
import doctorActions from "../redux/actions/doctorActions";

const EveryReview = ({ review, user, userToken, deleteReviewHandler }) => {
  return (
    <div>
      <p>{review.text}</p>
    </div>
  );
};
const mapDispatchToProps = {};
export default connect(null, mapDispatchToProps)(EveryReview);
