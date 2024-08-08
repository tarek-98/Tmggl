import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import shopping_cart from "../assets/images/shopping_cart.png";
import { Link } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { getAllCarts, removeFromCart, toggleCartQty } from "../store/cartSlice";
import "../components/cart.css";

const CartPage = () => {
  const dispatch = useDispatch();
  const carts = useSelector(getAllCarts);

  useEffect(() => {
    document.title = "تمقل - سلة مشترياتي";
  }, []);

  const CArtTotlaPrice = carts.reduce((acc, product) => {
    acc += product.price * product.quantity;
    return acc;
  }, 0);

  const groupByVendor = (items) => {
    return items.reduce((acc, item) => {
      if (!acc[item.vendorName]) {
        acc[item.vendorName] = { items: [], total: 0 };
      }
      acc[item.vendorName].items.push(item);
      acc[item.vendorName].total += item.quantity * item.price;
      return acc;
    }, {});
  };
  const groupedItems = groupByVendor(carts);

  const VAT = CArtTotlaPrice * (15 / 100);
  const Total = CArtTotlaPrice + VAT;

  if (carts.length === 0) {
    return (
      <div className="home-cart">
        <div className="">
          <div className="empty-cart">
            <img src={shopping_cart} alt="" />
            <span className="fw-6 fs-15 text-gray">
              .سلة التسوق الخاصة بك فارغة
            </span>
            <Link to="/" className="shopping-btn">
              اذهب للتسوق الان
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="home-cart">
      <div className="cart" dir="rtl">
        <div className="cart-title">
          <span className="fw-bold fs-4 mb-2">عربتي</span>
        </div>
        <div className="cart-ctable">
          <div className="row">
            <div className="col-lg-6">
              <div className="cart-chead">
                {Object.keys(groupedItems).map((vendor) => (
                  <div key={vendor}>
                    <div className="d-flex justify-content-between">
                      <h2>{vendor}</h2>
                      <h4>
                        {groupedItems[vendor].total +
                          groupedItems[vendor].total * 0.15}
                        ر.س
                      </h4>
                    </div>
                    {groupedItems[vendor].items.map((cart, idx) => (
                      <div
                        className="cart-ctr fw-6"
                        key={idx}
                        id={cart.productId}
                      >
                        <div
                          className="del-product mb-2"
                          onClick={() => dispatch(removeFromCart(cart.id))}
                        >
                          <MdDeleteForever />
                        </div>
                        <div className="cart-content d-flex">
                          <Link
                            className="cart-product-img"
                            to={`/product/${cart.productId}`}
                          >
                            <img src={cart.image} alt={cart.name} />
                          </Link>
                          <div className="cart-product-info">
                            <div className="cart-product-name">{cart.name}</div>
                            <div className="cart-product-location">
                              <span>تشحن من </span>
                              <span className="seller-loc">
                                {cart.productLocation}
                              </span>
                            </div>
                            <div className="cart-product-size d-flex">
                              <div className="size-text mb-1 ms-2">
                                {cart.nameOfChoice}
                              </div>
                              <span className="mb-0">{cart.typeOfChoice}</span>
                            </div>
                            <div className="cart-product-price mb-2">
                              <span className="cart-ctxt">
                                {cart.price + cart.price * 0.15}
                                ر.س
                              </span>
                            </div>
                            <div className="cart-product-qy">
                              <div className="cart-ctd">
                                <div className="qty-change d-flex text-center">
                                  <button
                                    type="button"
                                    className="qty-decrease flex align-center justify-center"
                                    onClick={() =>
                                      dispatch(
                                        toggleCartQty({
                                          id: cart.id,
                                          type: "DEC",
                                        })
                                      )
                                    }
                                  >
                                    -
                                  </button>
                                  <div className="qty-value flex align-center justify-center">
                                    {cart.quantity}
                                  </div>
                                  <button
                                    type="button"
                                    className="qty-increase flex align-center justify-center"
                                    onClick={() =>
                                      dispatch(
                                        toggleCartQty({
                                          id: cart.id,
                                          type: "INC",
                                        })
                                      )
                                    }
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="cart-product-total d-flex justify-content-end ps-2">
                              <span className="cart-ctxt ms-2">المجموع</span>
                              <span className="cart-ctxt text-orange">
                                {Total} ر.س
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-6 total-box rounded-3 p-3">
              <div className="total-box-header d-flex justify-content-between align-items-center mb-3">
                <h5>الملخص</h5>
              </div>
              <div className="col ps-2 pe-2">
                <div className="cart-total d-flex flex-column justify-content-center gap-3">
                  <div className="cart-total-item d-flex justify-content-between">
                    <span>المجموع الفرعي</span>
                    <span>{CArtTotlaPrice.toFixed(2)} ر.س</span>
                  </div>
                  <div className="cart-total-item d-flex justify-content-between">
                    <span>ضريبة القيمة المضافة ( 15% )</span>
                    <span>{VAT.toFixed(2)} ر.س</span>
                  </div>
                  <div className="cart-total-item d-flex justify-content-between">
                    <span>الاجمالي النهائي</span>
                    <span className="cart-total-price">
                      {Total.toFixed(2)} ر.س
                    </span>
                  </div>
                </div>
              </div>
              <div className="cart-cfoot d-flex col-lg-12 me-auto ms-3">
                <div className="cart-cfoot-l mb-3 d-flex justify-content-between">
                  <Link
                    to="/checkout"
                    type="button"
                    className="checkout-bt me-2 fw-bolder rounded-4 ps-5 pe-5"
                  >
                    متابعة الشراء
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
