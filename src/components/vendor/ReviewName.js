import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { fetchUserProfile, selectUserById } from "../../store/usersSlice";

function ReviewName({ review }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = review && review.userId;
  const user = useSelector((state) => selectUserById(state, userId));

  useEffect(() => {
    dispatch(fetchUserProfile(userId));
  }, [dispatch, userId]);

  return (
    <div>
      <p className="mb-0">
        {user && user.FirstName} {user && user.LastName}
      </p>
    </div>
  );
}

export default ReviewName;
