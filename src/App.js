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
import ConversationsPage from "./components/chat/ConversationList";
import { useSelector } from "react-redux";
import VerifySingupOtp from "./components/login/VerifySingupOtp";

function App() {
  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);
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
                <Route
                  path="/following"
                  element={isAuthenticated ? <Following /> : <Login />}
                ></Route>
                <Route path="/login" element={<Login />} />
                <Route path="/verify-otp" element={<VerifyOtp />} />
                <Route path="/verifySingupOtp" element={<VerifySingupOtp />} />
                <Route path="/register" element={<Register />} />
                <Route path="/product/:id" element={<ProductSingle />} />
                <Route path="/vendorpage/:id" element={<Vendor />} />
                <Route path="/search" element={<SearchPage />}></Route>
                <Route
                  path="/cart"
                  element={isAuthenticated ? <CartPage /> : <Login />}
                ></Route>
                <Route
                  path="/checkout"
                  element={isAuthenticated ? <CheckoutPage /> : <Login />}
                ></Route>
                <Route
                  path="/inbox"
                  element={isAuthenticated ? <Inbox /> : <Login />}
                ></Route>
                <Route
                  path="/inbox/notifications"
                  element={isAuthenticated ? <Notifications /> : <Login />}
                ></Route>
                <Route
                  path="/inbox/conversations"
                  element={isAuthenticated ? <ConversationsPage /> : <Login />}
                ></Route>
                <Route
                  path="/inbox/conversations/chat"
                  element={isAuthenticated ? <Chat /> : <Login />}
                ></Route>
                <Route
                  path="/inbox/chat/:id"
                  element={isAuthenticated ? <Chat /> : <Login />}
                ></Route>
                <Route
                  path="/profile"
                  element={isAuthenticated ? <Profile /> : <Login />}
                ></Route>
                <Route
                  path="/profile/orders"
                  element={isAuthenticated ? <Orders /> : <Login />}
                ></Route>
                <Route
                  path="/profile/orders/:id"
                  element={isAuthenticated ? <OrderInfo /> : <Login />}
                />
                <Route
                  path="/profile/favorites"
                  element={isAuthenticated ? <Favorite /> : <Login />}
                ></Route>
                <Route
                  path="/profile/gifts"
                  element={isAuthenticated ? <Bocket /> : <Login />}
                ></Route>
                <Route
                  path="/profile/editInfo"
                  element={isAuthenticated ? <EditInfo /> : <Login />}
                />
                <Route
                  path="/profile/address"
                  element={isAuthenticated ? <UserAddress /> : <Login />}
                />
                <Route
                  path="/profile/address/add"
                  element={isAuthenticated ? <AddAddress /> : <Login />}
                />
                <Route
                  path="/profile/address/editAddress/:id"
                  element={isAuthenticated ? <EditAddress /> : <Login />}
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
