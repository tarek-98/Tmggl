import React, { useEffect, useState } from "react";
import "./slideOverlay.css";
import { GoPlus } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import {
  FaCommentDots,
  FaFacebookMessenger,
  FaHeart,
  FaShare,
  FaSnapchat,
  FaSnapchatGhost,
  FaTelegram,
  FaTelegramPlane,
} from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { RiChatForwardLine } from "react-icons/ri";
import { HiMiniBars3 } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import { CiLink } from "react-icons/ci";
import {
  addToFavorite,
  delFavorite,
  fetchFavoriteProduct,
  getAllFavorites,
} from "../store/favorite-slice";
import {
  fetchFollowers,
  fetchSingleVendor,
  fetchVendors,
  followVendor,
  getAllFollowers,
  getSingleVendor,
  selectVendorById,
} from "../store/vendorsSlice";
import {
  fetchAsyncProductSingle,
  getSharedProduct,
  shareProduct,
} from "../store/productSlice";
import { toast, ToastContainer } from "react-toastify";
import logo1 from "../assets/images/logo1.png";

function SlideOverlay({
  product,
  comment,
  setComment,
  social,
  setSocial,
  info,
  setInfo,
  alertLogin,
  setLoginPopup,
  logInPopup,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);
  const sharedProduct = useSelector(getSharedProduct);
  const productId = product ? product._id : null;
  const userData = userInfo ? userInfo[`Client data`][0] : null;
  const UserId = userData ? userData._id : null;
  const VendorId = product ? product.idVendor : null;
  const vendorId = VendorId && VendorId;

  const vendordata = useSelector(getSingleVendor);
  const vendor = useSelector((state) => selectVendorById(state, vendorId));

  useEffect(() => {
    if (product) {
      dispatch(fetchAsyncProductSingle(product._id));
      dispatch(fetchSingleVendor(VendorId));
    }
    if (isAuthenticated) {
      dispatch(fetchFavoriteProduct(UserId));
    }
  }, []);

  // Function to convert likes count to a number
  const parseLikesCount = (count) => {
    if (typeof count === "string") {
      if (count.endsWith("K")) {
        return parseFloat(count) * 1000;
      }
      return parseInt(count);
    }
    return count;
  };

  // Function to format likes count
  const formatLikesCount = (count) => {
    if (count >= 10000) {
      return (count / 1000).toFixed(1) + "K";
    }
    return count;
  };

  // const isFavorite = favorites.some((fav) => fav.videoId === videoId); for favorite
  const favorites = useSelector(getAllFavorites);
  const followersdata = useSelector(getAllFollowers);
  const followers = followersdata && followersdata.result;
  const isFavorite = favorites.some((fav) => fav._id === product._id); //test fav
  const isFollower =
    followers && followers.some((follow) => follow._id === product.idVendor); //test follower

  useEffect(() => {
    dispatch(fetchFollowers(UserId));
  }, [followers]);

  const handIconClick = () => {
    if (isAuthenticated) {
      dispatch(followVendor({ VendorId, UserId }));
      dispatch(fetchVendors(UserId));
    }
  };
  const [isFavoriteIcon, setIsFavoriteIcon] = useState(false);

  function handleAddFavorite() {
    if (isFavorite && isAuthenticated) {
      setIsFavoriteIcon(false);
      dispatch(delFavorite({ productId, UserId }));
      dispatch(fetchFavoriteProduct(UserId));
    } else if (isAuthenticated) {
      setIsFavoriteIcon(true);
      dispatch(addToFavorite({ productId, UserId }));
      dispatch(fetchFavoriteProduct(UserId));
    }
    // else if (isAuthenticated === false) {
    //   toast.info("يجب عليك تسجيل الدخول اولا", {
    //     position: "top-left",
    //   });
    // }
    console.log({ productId, UserId });
  }

  const handleShare = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
      sharedProduct.link
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleShareMessenger = () => {
    const messengerUrl = `https://www.facebook.com/dialog/send?link=${encodeURIComponent(
      sharedProduct.link
    )}&app_id=YOUR_APP_ID`;
    window.open(messengerUrl, "_blank");
  };

  const handleShareTelegram = () => {
    const telegramUrl = `https://telegram.me/share/url?url=${encodeURIComponent(
      sharedProduct.link
    )}&text=${encodeURIComponent("Check out this product!")}`;
    window.open(telegramUrl, "_blank");
  };

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(sharedProduct.link)
      .then(() => {
        alert("Product link copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  function checkLogin() {
    if (!isAuthenticated) {
      // alertLogin();
      setLoginPopup(true);
    }
  }

  return (
    <div className="slide-overlay">
      <div className="container-wrapper">
        <div className="left-side">
          <div className="left-side-content">
            <div className="vendor-logo">
              <Link
                className="vend-in"
                to={product && `/vendorpage/${product.idVendor}`}
              >
                {vendor && vendor.logo ? (
                  <img src={vendor && vendor.logo} alt="vendorImage" />
                ) : (
                  <img src={logo1} alt="vendorImage" />
                )}
              </Link>
              <div className="wrapper">
                <div className="follow-plus" onClick={() => checkLogin()}>
                  <GoPlus
                    className={
                      isFollower && isAuthenticated
                        ? "icon-plus-hide"
                        : "icon-plus"
                    }
                    onClick={handIconClick}
                  />
                </div>
              </div>
            </div>
            <div className="smart-wrapper">
              <div className="item">
                <FaHeart
                  style={{
                    color:
                      (isFavorite && isAuthenticated) ||
                      (isFavoriteIcon && isAuthenticated)
                        ? "#FF0000"
                        : "white",
                  }}
                  onClick={() => {
                    handleAddFavorite();
                    checkLogin();
                  }}
                />
                <span>
                  {formatLikesCount(
                    parseLikesCount(0) +
                      ((isFavorite && isAuthenticated) ||
                      (isFavoriteIcon && isAuthenticated)
                        ? 1
                        : 0)
                  )}
                </span>
              </div>
            </div>
            <div className="smart-wrapper">
              <div
                className="item"
                id={product && product._id}
                onClick={() => {
                  setComment((comment) => !comment);
                  setSocial(false);
                  dispatch(fetchAsyncProductSingle(product._id));
                }}
              >
                <FaCommentDots />
                <span>{product && product.comments.length}</span>
              </div>
            </div>
            <div className="smart-wrapper">
              <Link
                to={isAuthenticated ? "/inbox/conversations/chat" : ""}
                onClick={() => checkLogin()}
              >
                <div className="item">
                  <RiChatForwardLine />
                  <span>مراسلة التاجر</span>
                </div>
              </Link>
            </div>
            <div className="smart-wrapper">
              <div
                className="item"
                onClick={() => {
                  setSocial(false);
                  setInfo(true);
                  dispatch(fetchAsyncProductSingle(product._id));
                }}
              >
                <HiMiniBars3 />
                <span>معلومات</span>
              </div>
            </div>
            <div className="smart-wrapper">
              <div
                className="item"
                onClick={() => {
                  setSocial((social) => !social);
                  dispatch(shareProduct(product._id));
                }}
              >
                <FaShare />
                <span>مشاركة</span>
              </div>
              <div className={social ? "social-home" : "social-home-hide"}>
                <div className="social-conatact-call" onClick={handleShare}>
                  <FaWhatsapp />
                </div>
                <div
                  className="social-conatact-messenger"
                  onClick={handleShareMessenger}
                >
                  <FaFacebookMessenger />
                </div>
                <div className="social-conatact-snap" onClick={handleCopyLink}>
                  <FaSnapchatGhost />
                </div>
                <div
                  className="social-conatact-telegram"
                  onClick={handleShareTelegram}
                >
                  <FaTelegramPlane />
                </div>
                <div className="social-conatact-link" onClick={handleCopyLink}>
                  <CiLink />
                </div>
              </div>
            </div>
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default SlideOverlay;
