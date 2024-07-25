import React, { Fragment, useEffect, useRef, useState } from "react";
import "./fav.css";
import "swiper/css";
import { useDispatch, useSelector } from "react-redux";
import vid2 from "../../videos/Download.mp4";
import {
  delFavorite,
  fetchFavoriteProduct,
  getAllFavorites,
} from "../../store/favorite-slice";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";

function Favorite() {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.favorite);
  const favorites = useSelector(getAllFavorites);
  const viewedProducts = useSelector(
    (state) => state.sortedProducts.viewedProducts
  );

  const [currentVideo, setCurrentVideo] = useState(null);
  const videoRef = useRef(null);
  const { userInfo } = useSelector((state) => state.auth);
  const userData = userInfo && userInfo[`Client data`][0];
  const UserId = userData && userData._id;

  useEffect(() => {
    dispatch(fetchFavoriteProduct(UserId));
  }, [dispatch]);

  function handleDelFav({ productId, UserId }) {
    dispatch(delFavorite({ productId, UserId }));
    dispatch(fetchFavoriteProduct(UserId));
  }

  if (favorites.length === 0) {
    return (
      <div className="main-fav pt-5">
        <Col
          lg="12"
          className="d-flex justify-content-center align-items-center pt-5"
        >
          <h3>لا يوجد منتجات مفضلة</h3>
        </Col>
      </div>
    );
  }

  return (
    <div className="main-fav">
      <div className="container">
        <Col lg="12" className="mb-3">
          <Row className="">
            {status === "loading" ? (
              <Fragment>
                <div className="d-flex align-items-center justify-content-center">
                  <CircularProgress />
                </div>
              </Fragment>
            ) : (
              <Fragment>
                {status === "failed" ? (
                  <h1>Failed to load Products</h1>
                ) : (
                  <Fragment>
                    {favorites.map((product, index) => {
                      return (
                        <Fragment>
                          <Col
                            lg="4"
                            sm="12"
                            xs="12"
                            className="p-0 p-1 mb-3"
                            key={index}
                          >
                            <div className="vendor-products-item">
                              <Link
                                to={`/product/${product._id}`}
                                className="text-decoration-none"
                              >
                                <div className="image">
                                  <video
                                    id={index}
                                    // poster={product.img}
                                    onMouseEnter={() => setCurrentVideo(index)}
                                    onMouseLeave={() => setCurrentVideo(null)}
                                    className="react-player"
                                    src={vid2}
                                    muted={true}
                                    loop
                                    playsInline={true}
                                    autoPlay={
                                      currentVideo === index ? true : false
                                    }
                                  ></video>
                                </div>
                              </Link>
                              <div
                                className="del-fav"
                                onClick={() =>
                                  handleDelFav({
                                    productId: product._id,
                                    UserId,
                                  })
                                }
                              >
                                <span>ازالة من المفضلة</span>
                              </div>
                            </div>
                          </Col>
                        </Fragment>
                      );
                    })}
                  </Fragment>
                )}
              </Fragment>
            )}
          </Row>
        </Col>
      </div>
    </div>
  );
}

export default Favorite;
