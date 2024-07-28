import React, { Fragment, useEffect, useState } from "react";
import "./bottomOption.css";
import "./addProduct.css";
import { useDispatch, useSelector } from "react-redux";
import { MdLocalShipping } from "react-icons/md";
import { fetchShippingMethods } from "../store/shippingSlice";
import { Button } from "@mui/material";
import { fetchAsyncProductSingle } from "../store/productSlice";

function BottomOption({ product, addProduct, setAddProduct, setSocial }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchShippingMethods());
  }, [dispatch]);

  /* shipping method*/
  const methods = useSelector((state) => state.shipping.methods);
  const enabledMethods = methods.filter((method) => method.enabled === true);
  /* */

  return (
    <Fragment>
      <div className="bottomOption">
        <Button
          variant="contained"
          className="add-cart"
          onClick={() => {
            setAddProduct(true);
            setSocial(false);
            dispatch(fetchAsyncProductSingle(product._id));
          }}
        >
          اضف للسلة
        </Button>
        <div className="price">
          <div className="new-price me-4">
            {/*<div className=" d-flex flex-column justify-content-center align-items-center">
              <MdLocalShipping className="fs-2" />
              {enabledMethods.price === "0" ? (
                <span className="free-shipping-text">شحن مجاني</span>
              ) : (
                ""
              )}
            </div> */}
            <div>
              <span className="ms-1">
                {product && product.price + product.price * 0.15}
              </span>
              <span>ر.س</span>
            </div>
          </div>
          {/*<div className={discount ? "old-price-hide" : "old-price"}>
            <div className="dis-v">
              <span>خصم {product && product.price + product.price * 0.15}</span>
            </div>
            <div>
              <span className="ms-1">
                {product && product.price + product.price * 0.15}
              </span>
              <span>ر.س</span>
            </div>
          </div> */}
        </div>
      </div>
    </Fragment>
  );
}

export default BottomOption;
