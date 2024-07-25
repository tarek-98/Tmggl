import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { applyCoupon, getAllCarts } from "../../store/cartSlice";
import "../cart.css";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FaShippingFast } from "react-icons/fa";
import {
  DefaultAddress,
  fetchAddress,
  getAllAddress,
  getDefaultAddress,
} from "../../store/AddressSlice";
import { FaLocationDot } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import applePay from "../../assets/images/vat/Apple.png";
import visa from "../../assets/images/vat/visa.png";
import { fetchShippingMethods } from "../../store/shippingSlice";
import { fetchPaymentsMethods } from "../../store/tabbySlice";

function Checkout() {
  const dispatch = useDispatch();
  const carts = useSelector(getAllCarts);
  const address = useSelector(getAllAddress);
  const defaultAddr = useSelector(getDefaultAddress);
  const { discount, status, error, discountType } = useSelector(
    (state) => state.cart
  );
  const [couponCode, setCouponCode] = useState(0);
  const [shippingPrice, setShippingPrice] = useState(0);
  const [shippingName, setShippingName] = useState("");
  const [paymentName, setPaymentName] = useState("");

  /* shipping method*/
  const methods = useSelector((state) => state.shipping.methods);
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchShippingMethods());
    }
  }, [status, dispatch]);
  const enabledMethods = methods.filter((method) => method.enabled);
  /*payments */
  const payments = useSelector((state) => state.payments.methods);
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPaymentsMethods());
    }
  }, [status, dispatch]);
  const enabledPayment = payments.filter((method) => method.enabled);
  /* */

  const handleApplyCoupon = () => {
    dispatch(applyCoupon(couponCode));
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenShipping, setIsOpenShipping] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  const toggleModalShipping = () => {
    setIsOpenShipping(!isOpenShipping);
  };

  const [isExpanded, setIsExpanded] = useState(false);
  function toggleMenu() {
    setIsExpanded(!isExpanded);
  }

  useEffect(() => {
    document.title = "صفحة الدفع";
    getAddress();
  }, []);

  function getAddress() {
    dispatch(fetchAddress());
  }

  const groupByVendor = (items) => {
    return items.reduce((acc, item) => {
      if (!acc[item.vendorName]) {
        acc[item.vendorName] = { items: [], total: 0 };
      }
      acc[item.vendorName].items.push(item);
      acc[item.vendorName].total += item.quantity * item.discountedPrice;
      return acc;
    }, {});
  };

  const groupedItems = groupByVendor(carts);
  const groupedItemsLength = Object.keys(groupedItems).length;
  const CArtTotlaPrice = carts.reduce((acc, product) => {
    acc += product.discountedPrice * product.quantity;
    return acc;
  }, 0);
  const CartWeight = carts.reduce((acc, product) => {
    acc += product.productWeight * product.quantity;
    return acc;
  }, 0);

  function checkPayment() {
    if (paymentName === "") {
      alert("payment methode");
    }
  }

  const img_url =
    "https://gomla-wbs.el-programmer.com/storage/app/public/product";

  const VAT = CArtTotlaPrice * (15 / 100);
  const Total = CArtTotlaPrice + +shippingPrice + VAT;
  const Weight = CartWeight; //dynamic

  const handleDefaultAddress = (addr) => {
    dispatch(
      DefaultAddress({
        city: addr.city,
        street: addr.street,
        streetNumber: addr.streetNumber,
      })
    );
    toast.success("تم تغيير العنوان بنجاح", {
      position: "top-left",
    });
    setIsOpen(!isOpen);
  };
  const shippingMethod = (method) => {
    setShippingPrice(method.price);
    setShippingName(method.name);
    toast.success("تم اختيار شركة الشحن بنجاح", {
      position: "top-left",
    });
    setIsOpenShipping(!isOpenShipping);
    console.log(shippingPrice);
  };
  let newDiscount = 0;
  if (discountType === "percent") {
    newDiscount = (Total * discount) / 100;
  } else if (discountType === "flat") {
    newDiscount = discount;
  }
  const TotalAfter = CArtTotlaPrice + +shippingPrice + VAT - newDiscount;
  return (
    <div className="home-cart">
      <div className="cart" dir="rtl">
        <div className="cart-title">
          <span className="fw-bold fs-4 mb-2">الدفع</span>
        </div>
        <div className="cart-ctable ps-3 pe-3">
          <div className="row">
            <div className="col-lg-6 mb-3">
              <div className="checkout-location mb-4 d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="fs-4 mb-2">عنوان الشحن</span>
                  <span className="change-loc-bt" onClick={toggleModal}>
                    تغيير
                    <CiEdit className="me-1" />
                  </span>
                </div>
                <div className="df-location">
                  <span className="d-flex justify-content-between align-items-center">
                    <span className="bullet ms-2">
                      <span className=""></span>
                    </span>
                    <span>
                      {defaultAddr.city}-{defaultAddr.street}-
                      {defaultAddr.streetNumber}
                    </span>
                  </span>
                  <FaLocationDot className="fs-3" />
                </div>
              </div>
              <div className="num-order d-flex justify-content-around align-items-center ps-4 pe-4 mb-4">
                <span>عدد الشحنات</span>
                <span className="fs-5 fw-bold">{groupedItemsLength}</span>
              </div>
              <div className="cart-chead">
                {Object.keys(groupedItems).map((vendor) => (
                  <div key={vendor} className="group-ve rounded-3">
                    <div className="menu-button d-flex justify-content-between align-items-center">
                      <h6 onClick={() => toggleMenu()}>{vendor}</h6>
                      <span>
                        {groupedItems[vendor].total +
                          groupedItems[vendor].total * 0.15 -
                          newDiscount}
                        ر.س
                      </span>
                      <div
                        className="choose-shippong"
                        onClick={toggleModalShipping}
                      >
                        <FaShippingFast className="ms-1" />
                        <span className="d-pc">اختر طريقة الشحن</span>
                      </div>
                      <MdOutlineKeyboardArrowDown
                        className="fs-4"
                        onClick={() => toggleMenu()}
                      />
                    </div>
                    <div
                      className={`menu-content ${
                        isExpanded ? "expanded" : "collapsed"
                      }`}
                    >
                      {groupedItems[vendor].items.map((cart, idx) => (
                        <div className="cart-ctr fw-6" key={idx} id={cart.id}>
                          <div className="cart-content d-flex">
                            <Link
                              className="cart-product-img"
                              to={`/product/${cart.id}`}
                            >
                              <img
                                src={`${img_url}/${cart.productColor}`}
                                alt={cart.name}
                              />
                            </Link>
                            <div className="cart-product-info">
                              <div className="cart-product-name">
                                {cart.name}
                              </div>
                              <div className="cart-product-size d-flex">
                                <div className="size-text mb-1 ms-2">
                                  المقاس :
                                </div>
                                <span className="mb-0">{cart.size}</span>
                              </div>
                              <div className="cart-product-price mb-2">
                                <span className="cart-ctxt">
                                  {cart.discountedPrice +
                                    cart.discountedPrice * 0.15}
                                  ر.س
                                </span>
                              </div>
                              <div className="cart-product-qy">
                                <div className="cart-ctd">
                                  <div className="qty-change d-flex text-center">
                                    <div>الكمية : </div>
                                    <div className="flex align-center justify-center me-2">
                                      {cart.quantity}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="cart-product-total d-flex justify-content-end ps-2">
                                <span className="cart-ctxt ms-2">المجموع</span>
                                <span className="cart-ctxt text-orange">
                                  {cart.totalPrice + cart.totalPrice * 0.15} ر.س
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="coupon-conatiner">
                        <div className="coupon">
                          <input
                            type="text"
                            // value={couponCode}
                            onChange={(e) => {
                              e.target.value === ""
                                ? setCouponCode(0)
                                : setCouponCode(e.target.value);
                            }}
                            placeholder="ادخل الكوبون"
                          />
                          <button
                            disabled={status === "loading"}
                            onClick={() => {
                              handleApplyCoupon();
                            }}
                          >
                            تطبيق
                          </button>
                        </div>
                        {discount > 0 && <h4>تم خصم {newDiscount} ر.س</h4>}
                        {status === "loading" && <p>Applying coupon...</p>}
                        {status === "failed" && <p>{error}</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-6 total-box rounded-3 pt-3 mb-3">
              <div className="total-box-header d-flex justify-content-between align-items-center mb-3">
                <h5>الملخص</h5>
              </div>
              <div className="col mb-4">
                <div className="cart-total d-flex flex-column justify-content-center gap-3">
                  <div className="cart-total-item d-flex justify-content-between">
                    <span>المجموع الفرعي</span>
                    <span>{CArtTotlaPrice.toFixed(2)} ر.س</span>
                  </div>
                  <div className="cart-total-item d-flex justify-content-between">
                    <span>ضريبة القيمة المضافة ( 15% )</span>
                    <span>{VAT.toFixed(2)} ر.س</span>
                  </div>
                  <div
                    className={
                      shippingPrice === 0
                        ? "d-none"
                        : "cart-total-item d-flex justify-content-between"
                    }
                  >
                    <span>الشحن</span>
                    <span>{shippingPrice} ر.س</span>
                  </div>
                  <div
                    className={
                      discount === 0
                        ? "d-none"
                        : "cart-total-item d-flex justify-content-between"
                    }
                  >
                    <span>الخصم </span>
                    <span> - {newDiscount} ر.س</span>
                  </div>
                  <div className="cart-total-item d-flex justify-content-between">
                    <span>الاجمالي النهائي</span>
                    <span className="cart-total-price">
                      {TotalAfter.toFixed(2)} ر.س
                    </span>
                  </div>
                  <div className="coupon-conatiner">
                    <div className="coupon p-0">
                      <input
                        type="text"
                        // value={couponCode}
                        onChange={(e) => {
                          e.target.value === ""
                            ? setCouponCode(0)
                            : setCouponCode(e.target.value);
                        }}
                        placeholder="ادخل الكوبون"
                      />
                      <button
                        disabled={status === "loading"}
                        onClick={() => {
                          handleApplyCoupon();
                        }}
                      >
                        تطبيق
                      </button>
                    </div>
                    {discount > 0 && <h4>تم خصم {newDiscount} ر.س</h4>}
                    {status === "loading" && <p>Applying coupon...</p>}
                    {status === "failed" && <p>{error}</p>}
                  </div>
                  <div className="coupon-conatiner">
                    <div className="coupon p-0">
                      <input
                        type="text"
                        // value={couponCode}
                        onChange={(e) => {
                          e.target.value === ""
                            ? setCouponCode(0)
                            : setCouponCode(e.target.value);
                        }}
                        placeholder="ادخل قسيمة الهدايا"
                      />
                      <button
                        disabled={status === "loading"}
                        onClick={() => {
                          handleApplyCoupon();
                        }}
                      >
                        تطبيق
                      </button>
                    </div>
                    {discount > 0 && <h4>تم خصم {newDiscount} ر.س</h4>}
                    {status === "loading" && <p>Applying coupon...</p>}
                    {status === "failed" && <p>{error}</p>}
                  </div>
                </div>
              </div>
              <div className="pyment-method">
                <div className="payment-title">
                  <h5>طريقة الدفع</h5>
                </div>
                <div className="item-pay">
                  <div className="apple-pay-logo">
                    <img src={applePay} alt="" />
                  </div>
                  <div className="apple-but">
                    <input
                      type="radio"
                      name="payment"
                      id="apple-pay-input"
                      value="Apple Pay"
                      onChange={(e) => setPaymentName(e.target.value)}
                    />
                    <label htmlFor="apple-pay-input">Apple Pay</label>
                  </div>
                </div>
                <div className="item-pay">
                  <div className="visa-pay-logo">
                    <img src={visa} alt="" />
                  </div>
                  <div className="visa-but">
                    <input
                      type="radio"
                      name="payment"
                      id="visa-pay-input"
                      value="الدفع باستخدام البطاقة"
                      onChange={(e) => setPaymentName(e.target.value)}
                    />
                    <label htmlFor="visa-pay-input">
                      الدفع باستخدام البطاقة
                    </label>
                  </div>
                </div>
                {enabledPayment.map((pay) => {
                  return (
                    <div className="item-pay">
                      <div className="tappy-pay-logo">
                        <img src={pay.image} alt="" />
                      </div>
                      <div className="tappy-but">
                        <input
                          type="radio"
                          name="payment"
                          id="tappy-pay-input"
                          value="الدفع باستخدام تابي"
                          onChange={(e) => setPaymentName(e.target.value)}
                        />
                        <label htmlFor="tappy-pay-input">
                          الدفع باستخدام تابي
                        </label>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="cart-cfoot d-flex col-lg-12 me-auto ms-3">
                <div className="cart-cfoot-l mb-3 d-flex justify-content-between">
                  <Link
                    to="/checkout"
                    type="button"
                    className="checkout-bt me-2 fw-bolder rounded-4 ps-5 pe-5"
                    onClick={() => checkPayment()}
                  >
                    متابعة الدفع
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="change-adddres">
        <div className={`modal-overlay ${isOpen ? "open" : ""}`}>
          <div className={`modal-change ${isOpen ? "open" : ""}`}>
            <div className="close mb-3" onClick={toggleModal}>
              <IoMdCloseCircleOutline className="fs-3" />
            </div>
            <div className="ps-1 pe-1">
              <div className="d-flex justify-content-between align-items-center flex-row-reverse mb-3">
                <span className="fs-5">اختر عنوان التوصيل</span>
                <span className="add-address">اضف عنوان</span>
              </div>
              <div className="saved-address ms-auto">
                {address.map((addr) => {
                  return (
                    <div
                      id={`address-info${addr.id}`}
                      className="address-info mb-2"
                      key={addr.id}
                      onClick={() => handleDefaultAddress(addr)}
                    >
                      <span className="bullet ms-2">
                        <span className=""></span>
                      </span>
                      <div className="address-address">
                        <span>
                          {addr.city}-{addr.street}-{addr.streetNumber}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
      <div className="change-shipping-method">
        <div className={`modal-overlay ${isOpenShipping ? "open" : ""}`}>
          <div className={`modal-change  ${isOpenShipping ? "open" : ""}`}>
            <div className="close mb-3" onClick={toggleModalShipping}>
              <IoMdCloseCircleOutline className="fs-3" />
            </div>
            <div className="ps-1 pe-1">
              <div className="shipping-method-item ms-auto">
                {enabledMethods.map((method) => {
                  return (
                    <div
                      id={`shipping-info${method.id}`}
                      className="shipping-info mb-2"
                      key={method.id}
                      onClick={() => shippingMethod(method)}
                    >
                      <span className="bullet ms-2">
                        <span className=""></span>
                      </span>
                      <div className="shipping-shipping w-100 d-flex justify-content-between align-items-center flex-row-reverse">
                        <span>
                          {method.name}
                          <br />
                          <span className="text-black-50">
                            {method.shippingDuration}
                          </span>
                        </span>
                        <span className="d-flex">
                          <span className="me-1">ر.س</span>
                          <span>{method.price}</span>
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
