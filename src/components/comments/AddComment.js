import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../store/commentSlice";
import { fetchAsyncProducts } from "../../store/productSlice";

const AddComment = ({ product }) => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const { userInfo, isAuthenticated } = useSelector((state) => state.auth);
  const userData = userInfo ? userInfo[`Client data`][0] : null;
  const client = userData ? userData._id : null;
  const productId = product._id;

  const onContentChanged = (e) => setComment(e.target.value);

  const onSaveCommentClicked = () => {
    if (comment) {
      dispatch(addComment({ productId, client, comment }));
      setComment("");
      // setTimeout(() => {
      //   dispatch(fetchAsyncProducts());
      // }, 1000);
    }
  };

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
        disabled={!isAuthenticated || comment === ""}
      >
        اضف
      </button>
    </Fragment>
  );
};

export default AddComment;
