import Home from "./components/Home";
import Order from "./components/Order";
import Error from "./components/Error";
import Admin from "./components/Admin/Admin";
import AdminLogin from "./components/Admin/AdminLogin";
import AdminSigninForm from "./components/Admin/AdminSignin";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import OrderHistory from "./components/OrderHistory";
import SearchResult from "./components/SearchResult";
import ProductDetails from "./components/ProductDetails";
import Login from "./components/Login";
import Signin from "./components/Signin";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/dangnhap" element={<Login />}></Route>
        <Route path="/dangkytaikhoan" element={<Signin />}></Route>
        <Route path="/details/:productId" element={<ProductDetails />}></Route>

        <Route path="/order" element={<Order />}></Route>
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<Navigate to="/error" />} />
        <Route path="/admin" element={<Admin />}></Route>

        <Route path="/admin/login" element={<AdminLogin />}></Route>
        <Route path="/admin/signin" element={<AdminSigninForm />}></Route>
        <Route path="/orderhistory" element={<OrderHistory />}></Route>
        <Route path="/searchresult" element={<SearchResult />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
