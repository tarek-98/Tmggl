import React, { Fragment, useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { FaVolumeXmark } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import {
  IoIosCloseCircleOutline,
  IoMdCloseCircleOutline,
} from "react-icons/io";
import Comments from "../components/comments/CommentList";
import NewestProduct from "../components/products/NewestProduct";
import {
  fetchAsyncNewestProducts,
  getAllNewestProducts,
  getProductSingle,
} from "../store/productSlice";
import Swal from "sweetalert2";
import "../components/login.css";
import logo from "../assets/images/logo.jpeg";
import { useNavigate } from "react-router";
import { loginAsync } from "../store/authSlice";
import { ToastContainer } from "react-toastify";
import {
  fetchFollowers,
  fetchSingleVendor,
  getAllFollowers,
  getSingleVendor,
} from "../store/vendorsSlice";
import { addToCart } from "../store/cartSlice";

function NewestProducts() {
  const [volume, setVolume] = useState(false);
  const [sound, setSound] = useState(true);
  const [comment, setComment] = useState(false);
  const [info, setInfo] = useState(false);
  const [addProduct, setAddProduct] = useState(false);
  const products = useSelector(getAllNewestProducts);
  const productData = useSelector(getProductSingle);
  const product = productData.product;
  const comments = product ? product.comments : null;
  const [screen, setScreen] = useState(false);

  const [quantity, setQuantity] = useState(1);
  const [livePrice, setLivePrice] = useState(null);
  const [liveImg, setLiveImg] = useState(null);
  const { userInfo } = useSelector((state) => state.auth);
  const userData = userInfo ? userInfo[`Client data`][0] : null;
  const [discount, setdiscount] = useState(false);
  const dispatch = useDispatch();

  const vendordata = useSelector(getSingleVendor);
  const vendor = vendordata && vendordata.result;

  useEffect(() => {
    setLiveImg(null);
    dispatch(fetchSingleVendor(product && product.idVendor));
  }, [product]);

  useEffect(() => {
    dispatch(fetchAsyncNewestProducts());
  }, []);

  const increaseQty = () => {
    setQuantity((prevQty) => {
      let tempQty = prevQty + 1;
      if (tempQty > product.stock) tempQty = product.stock;
      return tempQty;
    });
  };

  const decreaseQty = () => {
    setQuantity((prevQty) => {
      let tempQty = prevQty - 1;
      if (tempQty < 1) tempQty = 1;
      return tempQty;
    });
  };

  const [activeItems, setActiveItems] = useState({});

  const handleItemClick = (namechoose, _id) => {
    setActiveItems((prevState) => ({
      ...prevState,
      [namechoose]: _id,
    }));
  };

  function sweetAlertAdd() {
    Swal.fire({
      title: "تم اضافة المنتج بنجاح",
      icon: "success",
      confirmButtonText: "فهمت",
    });
  }
  function sweetAlertOption() {
    Swal.fire({
      title: "قم بتحديد خيارات المنتج أولا",
      icon: "warning",
      confirmButtonText: "فهمت",
    });
  }

  useEffect(() => {
    document.title = "تمقل - احدث المنتجات";
  }, []);

  const addToCartHandler = (product) => {
    let productLocation = "الرياض";
    let vendorName = "احمد";

    dispatch(
      addToCart({
        ...product,
        quantity: quantity,
        productLocation,
        vendorName,
      })
    );
  };

  // Grouping by namechoose
  const groupedChooses =
    product &&
    product.chooses.reduce((acc, choose) => {
      const { namechoose } = choose;
      if (!acc[namechoose]) {
        acc[namechoose] = [];
      }
      acc[namechoose].push(choose);
      return acc;
    }, {});

  function alertLogin() {
    Swal.fire({
      title: "تسجيل الدخول اولا",
      icon: "info",
      confirmButtonText: "فهمت",
    });
  }

  /*log in popup */
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();
  const { status } = useSelector((state) => state.auth);

  const saudiPhoneNumberRegex = /^0[0-9]{9}$/;

  useEffect(() => {
    if (status === "logging in succeeded") {
      setLoginPopup(false);
    }
  }, [status]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(status);
    dispatch(loginAsync({ email, pass }));
  };

  const [logInPopup, setLoginPopup] = useState(false);
  const toggleModal = () => {
    setLoginPopup(!logInPopup);
  };

  /* */

  return (
    <Fragment>
      <Navbar />
      <NewestProduct
        sound={sound}
        setSound={setSound}
        comment={comment}
        info={info}
        setInfo={setInfo}
        addProduct={addProduct}
        setAddProduct={setAddProduct}
        setComment={setComment}
        products={products}
        alertLogin={alertLogin}
        logInPopup={logInPopup}
        setLoginPopup={setLoginPopup}
      />

      {product && (
        <div className={comment ? "comment-wrapper" : "comment-wrapper-hide"}>
          <div className="comment-wrapper-overlay"></div>
          <div className="comment-wrapper-container">
            <div
              className="close"
              onClick={() => setComment((comment) => !comment)}
            >
              <IoIosCloseCircleOutline />
              <h2 className="text-comment fs-4">
                {comments.length > 0 && (
                  <span className="fs-4 me-2">{comments.length}</span>
                )}
                {comments.length > 0 ? "Comments" : "No Comments"}
              </h2>
            </div>
            <Comments
              product={product}
              alertLogin={alertLogin}
              logInPopup={logInPopup}
              setLoginPopup={setLoginPopup}
            />
          </div>
        </div>
      )}

      {product && (
        <div className={info ? "info-home" : "info-home-hide"}>
          <div className="info-overlay"></div>
          <div className="info-container p-3">
            <div className="close" onClick={() => setInfo((info) => !info)}>
              <IoIosCloseCircleOutline />
            </div>
            <div className="product-details">{product.description}</div>
          </div>
        </div>
      )}

      {product && (
        <div className={addProduct ? "add-product" : "add-product-hide"}>
          <div className="addProduct-overlay"></div>
          <div className="addProduct-container">
            <div
              className="close"
              onClick={() => setAddProduct((addProduct) => !addProduct)}
            >
              <IoIosCloseCircleOutline />
            </div>
            <div className="product-option">
              <div>
                <div className="product-img">
                  <div className="product-img-zoom w-100 mb-2">
                    {liveImg ? (
                      <img
                        src={liveImg}
                        alt=""
                        className="img-cover w-100 h-100"
                      />
                    ) : (
                      <img
                        src={product.img}
                        alt=""
                        className="img-cover w-100 h-100"
                      />
                    )}
                  </div>
                  <div className="product-img-thumbs d-flex align-center">
                    {product &&
                      product.chooses.map((item) => {
                        return (
                          <div className="thumb-item">
                            <img
                              src={item.img}
                              alt=""
                              className="img-cover w-100"
                              onClick={() => {
                                setLivePrice(item.pricechoose);
                                setLiveImg(item.img);
                              }}
                            />
                          </div>
                        );
                      })}
                  </div>
                </div>
                <div className="product-single-r mt-1" dir="rtl">
                  <div className="product-details font-manrope">
                    <div className="title mb-3">{product.name}</div>
                    <div className="product loc">
                      <span>يشحن من </span>
                      <span className=" text-danger">
                        {vendor && vendor.vendorLocation}
                      </span>
                    </div>
                    <div className="price mb-2">
                      <div className="d-flex align-center">
                        <div className="new-price ms-3">
                          <span>السعر : </span>
                          {livePrice ? (
                            <span>
                              {(livePrice + livePrice * 0.15) * quantity}
                              ر.س
                            </span>
                          ) : (
                            <span>
                              {(product.price + product.price * 0.15) *
                                quantity}
                              ر.س
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="qty align-center m-1 mb-2">
                      <div className="qty-text mb-2 ms-2">الكمية :</div>
                      <div className="qty-change d-flex">
                        <button
                          type="button"
                          className="qty-decrease d-flex justify-content-center"
                          onClick={() => decreaseQty()}
                        >
                          -
                        </button>
                        <div className="qty-value d-flex justify-content-center">
                          {quantity}
                        </div>
                        <button
                          type="button"
                          className="qty-increase d-flex justify-content-center"
                          onClick={() => increaseQty()}
                        >
                          +
                        </button>
                      </div>
                      {product.current_stock === 0 ? (
                        <div className="qty-error text-uppercase bg-danger text-white">
                          out of stock
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="size-opt d-flex flex-column">
                      {Object.entries(groupedChooses).map(
                        ([namechoose, items]) => (
                          <div key={namechoose}>
                            <div className="size-change d-flex">
                              <h5>{namechoose}</h5>
                              {items.map(
                                ({
                                  _id,
                                  pricetypechoose,
                                  pricechoose,
                                  img,
                                  typeOfChoose,
                                }) => (
                                  <ul className="size-list" key={_id}>
                                    <li
                                      className="list-item"
                                      onClick={() => {
                                        handleItemClick(namechoose, _id);
                                        setLivePrice(pricechoose);
                                      }}
                                    >
                                      <span
                                        className={
                                          activeItems[namechoose] === _id
                                            ? "list-item-opt active"
                                            : "list-item-opt"
                                        }
                                      >
                                        {typeOfChoose}
                                      </span>
                                    </li>
                                  </ul>
                                )
                              )}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
                <div
                  className="send-cart text-center mt-1 text-white"
                  onClick={() => {
                    if (activeItems === null) {
                      sweetAlertOption();
                    } else {
                      setAddProduct((addProduct) => !addProduct);
                      addToCartHandler(product);
                      sweetAlertAdd();
                    }
                  }}
                >
                  اضف الي السلة
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="change-adddres">
        <div className={`modal-overlay ${logInPopup ? "open" : ""}`}>
          <div className={`modal-change ${logInPopup ? "open" : ""}`}>
            <div className="close mb-3" onClick={toggleModal}>
              <IoMdCloseCircleOutline className="fs-3" />
            </div>
            <div className="ps-1 pe-1">
              <div className="saved-address ms-auto me-auto align-items-center justify-content-center pt-1 pb-1">
                <div className="logIn-main">
                  <div className="conatiner">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="logo mb-3">
                          <img src={logo} alt="" className="w-100" />
                        </div>
                        <h2 className="mb-3">اهلا عزيزي مستخدم تمقل</h2>
                        <div className="form">
                          <form
                            onSubmit={handleSubmit}
                            className=" d-flex flex-column"
                          >
                            <input
                              className="mb-2"
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="مثال 0512345678"
                              required
                              // maxLength="10"
                              // minLength="10"
                              name="phone"
                            />
                            <input
                              className="mb-2"
                              type="password"
                              value={pass}
                              onChange={(e) => setPass(e.target.value)}
                              // placeholder="مثال 0512345678"
                              required
                              // maxLength="10"
                              // minLength="10"
                              name="pass"
                            />
                            <button type="submit" className="mb-2" value="">
                              تسجيل الدخول
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  <ToastContainer />
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </Fragment>
  );
}

export default NewestProducts;
