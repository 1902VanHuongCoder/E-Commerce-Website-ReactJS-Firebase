import Home from "./components/Home";
import Order from "./components/Order";
import Error from "./components/Error";
import AdminLogin from "./components/Admin/AdminLogin";
import AdminSigninForm from "./components/Admin/AdminSignin";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import OrderHistory from "./components/OrderHistory";
import SearchResult from "./components/SearchResult";
import ProductDetails from "./components/ProductDetails";
import Login from "./components/Login";
import Signin from "./components/Signin";
import Dashboard from "./components/Admin/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/dangnhap" element={<Login />}></Route>
        <Route path="/dangkytaikhoan" element={<Signin />}></Route>
        <Route
          path="/chitietsanpham/:productId"
          element={<ProductDetails />}
        ></Route>
        <Route path="/lichsumuahang" element={<Order />}></Route>
        <Route path="/dathang/:productId" element={<OrderHistory />}></Route>
        <Route path="/ketquatimkiem" element={<SearchResult />}></Route>
        {/* <Route path="/giohang" element={<ShoppingCart />}></Route> */}

        <Route path="/admin" element={<Dashboard />}></Route>
        <Route path="/admin/login" element={<AdminLogin />}></Route>
        <Route path="/admin/signin" element={<AdminSigninForm />}></Route>

        <Route path="/error" element={<Error />} />
        <Route path="*" element={<Navigate to="/error" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
