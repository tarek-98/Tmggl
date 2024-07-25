import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchSingleOrder, getSingleOrder } from "../../store/ordersSlice";
import "./order.css";
import { Table } from "react-bootstrap";

function OrderInfo() {
  const { id } = useParams();
  const order = useSelector(getSingleOrder);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSingleOrder(id));
  }, []);

  return (
    <div className="main-order">
      <div className="container mt-5">
        <div className="order-card">
          <div className="order-header d-flex justify-content-between align-items-center mb-5">
            <h5 className="mb-0">كود الطلب : {id}</h5>
            <span>
              عدد الشحنات :<span></span> 1
            </span>
          </div>
          <div className="order-product">
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Larry the Bird</td>
                  <td>Larry the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderInfo;
