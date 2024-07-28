import React, { Fragment, useEffect, useRef, useState } from "react";
import "../product.css";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch, useSelector } from "react-redux";
import SlideOverlay from "../SlideOverlay";
import vid2 from "../../videos/Download.mp4";
import BottomOption from "../BottomOption";
import { Mousewheel } from "swiper/modules";
import {
  fetchAsyncNewestProducts,
  fetchAsyncProductSingle,
  getNewestProductsStatus,
  shareProduct,
} from "../../store/productSlice";
import { increaseProductViews, addViewedProduct } from "../../store/sortSlice";
import Slider from "../control/slider/Slider";
import ControlPanel from "../control/controls/ControlPanel";
import { AiOutlineSound } from "react-icons/ai";
import { CiVolumeMute } from "react-icons/ci";

function NewestProduct({
  sound,
  setSound,
  comment,
  setComment,
  products,
  info,
  setInfo,
  addProduct,
  setAddProduct,
  alertLogin,
  setLoginPopup,
  logInPopup,
}) {
  const [social, setSocial] = useState(false);
  const dispatch = useDispatch();
  const videoRef = useRef(null);

  const [currentVideo, setCurrentVideo] = useState(null);
  const productsStatus = useSelector(getNewestProductsStatus);

  useEffect(() => {
    dispatch(fetchAsyncNewestProducts());
  }, []);

  const [autoPlay, setAutoPlay] = useState(false);
  const handleSlideChange = (swiper) => {
    const activeSlideIndex = swiper.activeIndex;
    const activeProduct = products[activeSlideIndex];
    //  if (activeProduct && !viewedProducts[activeProduct.id]) to once view for product
    if (activeProduct) {
      dispatch(increaseProductViews(activeProduct._id));
      dispatch(addViewedProduct(activeProduct._id));
      localStorage.setItem("receiverId", activeProduct.idVendor);
    }
    dispatch(fetchAsyncProductSingle(activeProduct._id));
    dispatch(shareProduct(activeProduct._id));
    setAutoPlay(true);
  };

  const togglePlay = (index) => {
    if (currentVideo === index) {
      const video = document.getElementById(index);
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    } else {
      if (currentVideo) {
        const previousVideo = document.getElementById(currentVideo);
        previousVideo.pause();
      }
      setCurrentVideo(index);
      const video = document.getElementById(index);
      video.play();
    }
  };

  /*control*/
  const [percentage, setPercentage] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [index, setIndex] = useState(0);
  const videoRefs = useRef([]);
  const [videoState, setVideoState] = useState(
    products &&
      products.map(() => ({
        percentage: 0,
        currentTime: 0,
        duration: 0,
      }))
  );
  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, products && products.length);
  }, [products && products.length]);

  const handleSliderChange = (index, event) => {
    const video = videoRefs.current[index];
    if (video) {
      const newPercentage = event.target.value;
      const newTime = (video.duration / 100) * newPercentage;
      video.currentTime = newTime;

      setVideoState((prevState) => {
        const newState = prevState && [...prevState];
        newState[index] = {
          ...newState[index],
          percentage: newPercentage,
          currentTime: newTime,
        };
        return newState;
      });
    }
  };

  const getCurrDuration = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    if (duration > 0) {
      const percent = ((current / duration) * 100).toFixed(2);
      setPercentage(+percent);
      setCurrentTime(current.toFixed(2));
    }
  };
  /* */

  return (
    <div className="video-card">
      <Swiper
        direction={"vertical"}
        modules={[Mousewheel]}
        mousewheel={{ forceToAxis: true }}
        className="mySwiper"
        onSlideChange={handleSlideChange}
        allowSlideNext={addProduct || comment || info ? false : true}
        allowSlidePrev={addProduct || comment || info ? false : true}
        onSlideChangeTransitionStart={function () {
          var videos = document.querySelectorAll("video");
          Array.prototype.forEach.call(videos, function (video) {
            video.pause();
          });
          setAddProduct(false);
          setComment(false);
          setSocial(false);
          setInfo(false);
        }}
        onSlideChangeTransitionEnd={function () {
          var activeIndex = this.activeIndex;
          var activeSlide =
            document.getElementsByClassName("swiper-slide")[activeIndex];
          var activeSlideVideo = activeSlide.getElementsByTagName("video")[0];
          activeSlideVideo.play();
          activeSlideVideo.load();
          setAddProduct(false);
          setComment(false);
          setInfo(false);
        }}
      >
        {productsStatus === "loading" ? (
          <div className="bg-white text-white w-100 h-100">
            Loading products...
          </div>
        ) : productsStatus === "failed" ? (
          <div className="bg-white text-white w-100 h-100">
            Error: {products.error}
          </div>
        ) : (
          <Fragment>
            {products.map((product, index) => {
              return (
                <Fragment>
                  <SwiperSlide key={product.id}>
                    <div className="video-slide-container">
                      <div className="plyer-container">
                        <div>
                          <video
                            poster={product.img}
                            id={index}
                            src={vid2}
                            // src={product.video}
                            className="react-player"
                            autoPlay={index === 0 ? true : autoPlay}
                            muted={sound}
                            loop
                            playsInline={true}
                            ref={(el) => (videoRefs.current[index] = el)}
                            controls={false} // Disable default controls to use custom controls
                            onTimeUpdate={getCurrDuration}
                            onLoadedData={(e) => {
                              const duration = e.target.duration;
                              setVideoState((prevState) => {
                                const newState = prevState && [...prevState];
                                if (newState[index]) {
                                  newState[index].duration = duration;
                                }
                                return newState;
                              });
                            }}
                            onPlay={() => {
                              setIndex(index);
                              setCurrentVideo(index);
                              dispatch(fetchAsyncProductSingle(product._id));
                              dispatch(shareProduct(product._id));
                              localStorage.setItem(
                                "receiverId",
                                product.idVendor
                              );
                            }}
                            onClick={() => togglePlay(index)}
                          ></video>
                          <div className="controls">
                            <Slider
                              percentage={percentage}
                              onChange={(e) => handleSliderChange(index, e)}
                            />
                            <ControlPanel
                              duration={duration}
                              currentTime={currentTime}
                            />
                            <div className="sound-icon ms-1">
                              {sound ? (
                                <CiVolumeMute
                                  className="fs-4"
                                  onClick={() => setSound(false)}
                                />
                              ) : (
                                <AiOutlineSound
                                  className="fs-4"
                                  onClick={() => setSound(true)}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <SlideOverlay
                      product={product}
                      comment={comment}
                      setComment={setComment}
                      social={social}
                      setSocial={setSocial}
                      info={info}
                      setInfo={setInfo}
                      alertLogin={alertLogin}
                      logInPopup={logInPopup}
                      setLoginPopup={setLoginPopup}
                    />
                    <BottomOption
                      product={product}
                      addProduct={addProduct}
                      setAddProduct={setAddProduct}
                      setSocial={setSocial}
                    />
                  </SwiperSlide>
                </Fragment>
              );
            })}
          </Fragment>
        )}
      </Swiper>
    </div>
  );
}

export default NewestProduct;
