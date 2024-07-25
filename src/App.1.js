import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import CartPage from "./pages/CartPage";
import Profile from "./pages/Profile";
import SearchPage from "./pages/SearchPage";
import ProductSingle from "./pages/ProductSingle";
import CheckoutPage from "./pages/CheckoutPage";
import EditInfo from "./components/user/EditInfo";
import EditAddress from "./components/user/EditAddress";
import UserAddress from "./components/user/UserAddress";
import AddAddress from "./components/user/AddAddress";
import Login from "./components/login/LogIn";
import HeadPc from "./components/head/HeadPc";
import VerifyOtp from "./components/login/VerifyOtp";
import Register from "./components/login/Register";

export function App() {
  return (
    <div id="App" className="">
      <div className="home-page">
        <div className="page-container">
          <BrowserRouter>
            <Footer />
            <div className="main-content">
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/login" element={<Login />} />
                <Route path="/verify-otp" element={VerifyOtp} />
                <Route path="/register" element={Register} />
                <Route path="/profile" element={Profile} />
                <Route path="/" element={Login} />
                <Route path="/product/:id" element={<ProductSingle />} />
                <Route path="/search" element={<SearchPage />}></Route>
                <Route path="/cart" element={<CartPage />}></Route>
                <Route path="/checkout" element={<CheckoutPage />}></Route>
                <Route path="/profile" element={<Profile />}></Route>
                <Route path="/profile/editInfo" element={<EditInfo />} />
                <Route path="/profile/address" element={<UserAddress />} />
                <Route path="/profile/address/add" element={<AddAddress />} />
                <Route
                  path="/profile/address/editAddress/:id"
                  element={<EditAddress />}
                />
              </Routes>
            </div>
            <HeadPc />
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
}
