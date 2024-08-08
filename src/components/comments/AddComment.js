import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../store/commentSlice";
import { fetchAsyncProductSingle } from "../../store/productSlice";

const AddComment = ({ product, alertLogin, setLoginPopup, logInPopup }) => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const { userInfo, isAuthenticated } = useSelector((state) => state.auth);
  const userData = userInfo ? userInfo.data : null;
  const client = userData ? userData._id : null;
  const productId = product._id;

  const onContentChanged = (e) => setComment(e.target.value);

  const onSaveCommentClicked = () => {
    if (comment && isAuthenticated) {
      dispatch(addComment({ productId, client, comment }));
      setComment("");
      setTimeout(() => {
        dispatch(fetchAsyncProductSingle(product && product._id));
      }, 1000);
    } else {
      checkLogin();
    }
  };

  function checkLogin() {
    if (!isAuthenticated) {
      // alertLogin();
      setLoginPopup(true);
    }
  }

  return (
    <Fragment>
      <input
        value={comment}
        onChange={onContentChanged}
        className="comment-input"
      />
      <button
        type="button"
        onClick={onSaveCommentClicked}
        className="comment-button"
        // disabled={!isAuthenticated || comment === ""}
      >
        اضف
      </button>
    </Fragment>
  );
};

export default AddComment;
