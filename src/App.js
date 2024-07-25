import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes, Switch } from "react-router-dom";
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
import NewestProducts from "./pages/NewestProducts";
import Following from "./components/products/Following";
import Bocket from "./components/bocket/Bocket";
import Vendor from "./components/vendor/Vendor";
import Inbox from "./components/chat/Inbox";
import Notifications from "./components/chat/Notifications";
import Orders from "./components/Orders/Orders";
import Favorite from "./components/favorite/Favorite";
import OrderInfo from "./components/Orders/OrderInfo";
import ProductsTrend from "./pages/ProductsTrend";
import Chat from "./components/chat/Chat";

function App() {
  return (
    <div id="App" className="">
      <div className="home-page">
        <div className="page-container">
          <BrowserRouter>
            <Footer />
            <div className="main-content">
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/newest" element={<NewestProducts />}></Route>
                <Route path="/trend" element={<ProductsTrend />}></Route>
                <Route path="/following" element={<Following />}></Route>
                <Route path="/login" element={<Login />} />
                <Route path="/verify-otp" element={<VerifyOtp />} />
                <Route path="/register" element={<Register />} />
                <Route path="/product/:id" element={<ProductSingle />} />
                <Route path="/vendorpage/:id" element={<Vendor />} />
                <Route path="/search" element={<SearchPage />}></Route>
                <Route path="/cart" element={<CartPage />}></Route>
                <Route path="/checkout" element={<CheckoutPage />}></Route>
                <Route path="/inbox" element={<Inbox />}></Route>
                <Route
                  path="/inbox/notifications"
                  element={<Notifications />}
                ></Route>
                <Route path="/inbox/chat" element={<Chat />}></Route>
                <Route path="/profile" element={<Profile />}></Route>
                <Route path="/profile/orders" element={<Orders />}></Route>
                <Route path="/profile/orders/:id" element={<OrderInfo />} />
                <Route path="/profile/favorites" element={<Favorite />}></Route>
                <Route path="/profile/gifts" element={<Bocket />}></Route>
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

export default App;
