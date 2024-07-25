import React, { Fragment, useEffect, useState } from "react";
import "./search.css";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { fetchAsyncProducts, getAllProducts } from "../../store/productSlice";
import vid from "../../videos/video1.mp4";
import { MdArrowOutward, MdLocalShipping } from "react-icons/md";
import { fetchVendors, getAllVendors } from "../../store/vendorsSlice";
import { IoSearch } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

function SearchFiltre() {
  const products = useSelector(getAllProducts);
  const vendors = useSelector(getAllVendors);
  const [filterItem, setFilterItem] = useState("المنتجات");
  const [search, setSearch] = useState("");
  const [searchMenu, setSearchMenu] = useState(false);
  const [searchSuggest, setSearchSuggest] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAsyncProducts());
    dispatch(fetchVendors());
    setProductCards([
      ...productCards.sort((a, b) => {
        return a.unit_price - b.unit_price;
      }),
    ]);
  }, []);

  useEffect(() => {
    document.title = "تمقل -  صفحة البحث";
  }, []);

  const filterItems = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const filterVendors = vendors.filter((vendor) =>
    vendor.name.toLowerCase().includes(search.toLowerCase())
  );

  const [productCards, setProductCards] = useState(filterItems);

  // Sort Product by price
  function sortProductsByPrice(e) {
    e.stopPropagation();
    if (e.target.value === "LowToHigh") {
      // Sorting Test by price -  Low To High
      setProductCards([
        ...productCards.sort((a, b) => {
          return a.unit_price - b.unit_price;
        }),
      ]);
    }

    if (e.target.value === "HighToLow") {
      // Sorting Test by price -  High To Low
      setProductCards([
        ...productCards.sort((a, b) => {
          return b.unit_price - a.unit_price;
        }),
      ]);
    }
  }

  const data = ["المنتجات", "التجار", "هشتاج"];

  return (
    <div className="search-home">
      <div className="search-container">
        <div className="flex-60">
          <div className=" d-flex">
            <Link
              to="/"
              className="d-flex justify-content-center align-items-center"
            >
              <IoIosArrowBack className="text-dark fs-2" />
            </Link>
            <div className="input-container ms-3">
              <svg
                width="20"
                data-e2e=""
                height="20"
                viewBox="0 0 48 48"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M22 10C15.3726 10 10 15.3726 10 22C10 28.6274 15.3726 34 22 34C28.6274 34 34 28.6274 34 22C34 15.3726 28.6274 10 22 10ZM6 22C6 13.1634 13.1634 6 22 6C30.8366 6 38 13.1634 38 22C38 25.6974 36.7458 29.1019 34.6397 31.8113L43.3809 40.5565C43.7712 40.947 43.7712 41.5801 43.3807 41.9705L41.9665 43.3847C41.5759 43.7753 40.9426 43.7752 40.5521 43.3846L31.8113 34.6397C29.1019 36.7458 25.6974 38 22 38C13.1634 38 6 30.8366 6 22Z"
                ></path>
              </svg>
              <input
                type="search"
                placeholder="Search"
                className=""
                aria-label="Search"
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSearchSuggest(true);
                  setSearchMenu(false);
                  if (e.target.value === "") {
                    setSearchMenu(false);
                    setSearchSuggest(false);
                  }
                }}
              />
            </div>
          </div>
        </div>
        <span
          className="text-search"
          onClick={() => {
            setSearchMenu(true);
            setSearchSuggest(false);
            if (search === "") {
              setSearchMenu(false);
              setSearchSuggest(false);
            }
          }}
        >
          Search
        </span>
      </div>
      <div className="result-container">
        <div className="search-filter-item-container ps-3 pe-3 pt-1 pb-1">
          <select
            class="select-menu border-0"
            data-bs-theme="light"
            aria-label=".form-select-sm"
            name="price"
            id="test-price"
            onChange={(e) => sortProductsByPrice(e)}
          >
            <option value="">فلتر</option>
            <option value="LowToHigh">الاقل سعرا</option>
            <option value="HighToLow">الاعلي سعرا</option>
          </select>
          {data.map((item, idx) => {
            return (
              <div
                key={idx}
                onClick={() => {
                  setFilterItem(item);
                }}
                className={
                  filterItem === item
                    ? "search-filter-item-active"
                    : "search-filter-item"
                }
              >
                <Link className="">{item}</Link>
              </div>
            );
          })}
        </div>
        {searchMenu && filterItem === "المنتجات" ? (
          <div className="search-result-container">
            {productCards
              .filter((product) =>
                product.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((product, index) => (
                <div key={index} className="link text-center mb-3">
                  <Link
                    to={`/product/${product.id}`}
                    className="text-decoration-none"
                  >
                    <div className="video-container position-relative">
                      <div className="position-relative">
                        <video
                          id="VideoPlayer"
                          src={vid}
                          className="video-player"
                          autoPlay={false}
                          muted={true}
                          loop
                          playsInline={true}
                        ></video>
                        <div className="filterItem-price position-absolute">
                          <div className="free-shopping">
                            <MdLocalShipping className="text-white fs-6" />
                            <span className="free-shipping">شحن مجاني</span>
                          </div>
                          <span className="price-dir">
                            <span className="ms-1">{product.unit_price}</span>
                            <span>ر.س</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        ) : (
          <Fragment>
            {searchMenu && filterItem === "التجار" ? (
              <div className="search-vendor-container">
                {filterVendors.map((vendor, index) => (
                  <div key={index} className="link mb-3">
                    <Link
                      to={`/vendorpage/${vendor.id}`}
                      className="text-decoration-none"
                    >
                      <div className="ps-3">
                        <FaRegUser className="me-2" />
                        <span>{vendor.name}</span>
                      </div>
                      <MdArrowOutward className="trans-270" />
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              searchMenu && (
                <div className="search-result-container">
                  <h1>هشتاج</h1>
                </div>
              )
            )}
          </Fragment>
        )}

        <div
          className={searchSuggest ? "search-suggest" : "search-suggest-hide"}
        >
          {searchSuggest && filterItem === "المنتجات" ? (
            <div className="search-suggest-container">
              {productCards
                .filter((product) =>
                  product.name.toLowerCase().includes(search.toLowerCase())
                )
                .map((product, index) => (
                  <div
                    key={index}
                    className="search-suggest-item text-center mb-3"
                    onClick={(e) => {
                      setSearchMenu(true);
                      setSearchSuggest(false);
                      setSearch(e.target.textContent);
                      // console.log(e.target.textContent);
                    }}
                  >
                    <div className="ps-3">
                      <IoSearch className="me-2" />
                      <span>{product.name}</span>
                    </div>
                    <MdArrowOutward className="trans-270" />
                  </div>
                ))}
            </div>
          ) : (
            <Fragment>
              {searchSuggest && filterItem === "التجار" ? (
                <div className="search-suggest-container">
                  {filterVendors.map((vendor, index) => (
                    <div
                      key={index}
                      className="search-suggest-item text-center mb-3"
                      onClick={(e) => {
                        setSearchMenu(true);
                        setSearchSuggest(false);
                        setSearch(e.target.textContent);
                        // console.log(e.target.textContent);
                      }}
                    >
                      <div className="ps-3">
                        <FaRegUser className="me-2" />
                        <span>{vendor.name}</span>
                      </div>
                      <MdArrowOutward className="trans-270" />
                    </div>
                  ))}
                </div>
              ) : (
                searchSuggest && (
                  <div className="search-suggest-container">
                    <div
                      // key={}
                      className="search-suggest-item text-center mb-3"
                      onClick={(e) => {
                        setSearchMenu(true);
                        setSearchSuggest(false);
                        setSearch(e.target.textContent);
                        // console.log(e.target.textContent);
                      }}
                    >
                      <div className="ps-3">
                        <IoSearch className="me-2" />
                        <span>هشتاج</span>
                      </div>
                      <MdArrowOutward className="trans-270" />
                    </div>
                  </div>
                )
              )}
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchFiltre;
