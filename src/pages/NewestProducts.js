import React, { Fragment, useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { FaVolumeXmark } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Comments from "../components/comments/CommentList";
import NewestProduct from "../components/products/NewestProduct";
import {
  fetchAsyncNewestProducts,
  getAllNewestProducts,
  getProductSingle,
} from "../store/productSlice";
import Swal from "sweetalert2";
import { addToCart } from "../store/cartSlice";
import { fetchShippingMethods } from "../store/shippingSlice";

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

  const [quantity, setQuantity] = useState(1);
  const [livePrice, setLivePrice] = useState(null);
  const [liveImg, setLiveImg] = useState(null);
  const { userInfo } = useSelector((state) => state.auth);
  const userData = userInfo ? userInfo[`Client data`][0] : null;
  const [discount, setdiscount] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(productData);
    console.log(product);
  }, []);
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
            <Comments product={product} />
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
                      <span className=" text-danger">الرياض</span>
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
                                  color,
                                }) => (
                                  <ul className="size-list" key={_id}>
                                    <li
                                      className="list-item"
                                      onClick={() =>
                                        handleItemClick(namechoose, _id)
                                      }
                                    >
                                      <span
                                        className={
                                          activeItems[namechoose] === _id
                                            ? "list-item-opt active"
                                            : "list-item-opt"
                                        }
                                      >
                                        {color}
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
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default NewestProducts;
