import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editComment } from "../../store/commentSlice";

const EditComment = ({ comment, setEditMode, product }) => {
  const [newCommentText, setNewCommentText] = useState(comment.comment);
  const dispatch = useDispatch();
  const productId = product._id;
  const commentId = comment._id;

  const onContentChanged = (e) => setNewCommentText(e.target.value);

  const onSaveCommentClicked = () => {
    if (newCommentText) {
      dispatch(editComment({ productId, commentId, newCommentText }));
      setEditMode(null);
    }
  };

  return (
    <section>
      <div className="d-flex align-items-center">
        <input
          value={newCommentText}
          onChange={onContentChanged}
          className="edit-input"
        />
        <button
          type="button"
          onClick={onSaveCommentClicked}
          className="edit-button"
        >
          حفظ
        </button>
        <button onClick={() => setEditMode(null)} className="edit-button">
          الغاء
        </button>
      </div>
    </section>
  );
};

export default EditComment;
