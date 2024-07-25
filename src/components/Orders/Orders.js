import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, getAllOrders } from "../../store/ordersSlice";
import { Col, Row } from "react-bootstrap";
import "./order.css";
import { Link } from "react-router-dom";
import { LiaShippingFastSolid } from "react-icons/lia";
import { FaCheckSquare, FaEye } from "react-icons/fa";
import { BsFillSendCheckFill } from "react-icons/bs";

function Orders() {
  const orders = useSelector(getAllOrders);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  return (
    <div className="main-order">
      <div className="container">
        <Row>
          {orders.map((order) => {
            return (
              <Fragment>
                <Col lg="4" sm="12" xs="12" className="p-2 mb-4" key={order.id}>
                  <div className="order-card">
                    <div className="order-card-header d-flex justify-content-between align-items-center mb-3">
                      <h6 className="order-card-title mb-0">
                        رقم الطلب :{order.id}
                      </h6>
                      <Link
                        to={`/profile/orders/${order.id}`}
                        className="text-dark"
                      >
                        <span className="text-black-50">
                          تفاصيل
                          <FaEye className="me-1" />
                        </span>
                      </Link>
                    </div>
                    <div className="order-card-info d-flex justify-content-between align-items-center ps-3 pe-3 mb-3">
                      <div className="order-status d-flex flex-column g-2 align-items-center">
                        <BsFillSendCheckFill className="active" />
                        <span className="order-status-text">تم الطلب</span>
                      </div>
                      <div className="order-status d-flex flex-column g-2 align-items-center">
                        <LiaShippingFastSolid
                          className={
                            order.shipping_status === "تم الشحن" ||
                            order.shipping_status === "تم التوصيل"
                              ? "active"
                              : ""
                          }
                        />
                        <span className="order-status-text">تم الشحن</span>
                      </div>
                      <div className="order-status d-flex flex-column g-2 align-items-center">
                        <FaCheckSquare
                          className={
                            order.shipping_status === "تم التوصيل"
                              ? "active"
                              : ""
                          }
                        />
                        <span className="order-status-text">تم التوصيل</span>
                      </div>
                      <div className="order-status d-flex flex-column g-2 align-items-center">
                        <LiaShippingFastSolid
                          className={
                            order.shipping_status === "مسترجع"
                              ? "active order-back"
                              : "order-back"
                          }
                        />
                        <span className="order-status-text">مسترجع</span>
                      </div>
                    </div>
                  </div>
                </Col>
              </Fragment>
            );
          })}
        </Row>
      </div>
    </div>
  );
}

export default Orders;
