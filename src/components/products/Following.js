import React, { useEffect } from "react";
import "./following.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchFollowers, getAllFollowers } from "../../store/vendorsSlice";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import logo1 from "../../assets/images/logo1.png";

function Following() {
  const followersdata = useSelector(getAllFollowers);
  const followers = followersdata && followersdata.result;
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const userData = userInfo[`Client data`][0];
  const userId = userData._id;
  useEffect(() => {
    dispatch(fetchFollowers(userId));
    console.log(followers);
  }, []);
  useEffect(() => {
    document.title = "تمقل - اتابعهم";
  }, []);
  return (
    <div className="following-main">
      <div className="container">
        <div className="main-title mb-5 pt-3">
          <h1>اتابعهم</h1>
        </div>
        <div className="following-menu">
          <div className="following-menu-item">
            <Row>
              {followers &&
                followers.length > 0 &&
                followers.map((follower) => {
                  return (
                    <Col lg="12">
                      <div className="vendor-details">
                        <Link
                          to={`/vendorpage/${follower._id}`}
                          className="text-dark d-flex align-items-center gap-2"
                        >
                          <div className="logo">
                            {follower && follower.logo ? (
                              <img
                                src={follower && follower.logo}
                                alt="User Avatar"
                                className="avatar ms-3"
                              />
                            ) : (
                              <img
                                src={logo1}
                                alt="User Avatar"
                                className="avatar ms-3"
                              />
                            )}
                          </div>
                          <span> {follower.brandName}</span>
                        </Link>
                      </div>
                    </Col>
                  );
                })}
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Following;
