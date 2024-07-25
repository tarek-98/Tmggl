import React, { useEffect } from "react";
import "./following.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchFollowers, getAllFollowers } from "../../store/vendorsSlice";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";

function Following() {
  const vendors = useSelector(getAllFollowers);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const userData = userInfo[`Client data`][0];
  const userId = userData._id;
  useEffect(() => {
    dispatch(fetchFollowers(userId));
    console.log(vendors);
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
              {vendors.lenght > 0 &&
                vendors.map((vendor) => {
                  return (
                    <Col lg="12">
                      <div className="vendor-details">
                        <Link
                          to={`/vendorpage/${vendor.id}`}
                          className="text-dark"
                        >
                          {vendor.name}
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
