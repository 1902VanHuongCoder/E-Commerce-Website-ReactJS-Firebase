import { Route, Routes, Navigate } from "react-router-dom";
import {
  Dashboard,
  Error,
  Home,
  Login,
  Order,
  OrderHistory,
  ProductDetails,
  SearchResult,
  Signin,
} from "./helpers";

function App() {
  return (
    <Routes>
      <Route path="/dangnhap" element={<Login />}></Route>
      <Route path="/dangkytaikhoan" element={<Signin />}></Route>

      {/* User routes */}
      <Route path="/" element={<Home />}></Route>
      <Route
        path="/chitietsanpham/:productId"
        element={<ProductDetails />}
      ></Route>
      <Route path="/dathang/:productId" element={<Order />}></Route>
      <Route path="/lichsumuahang" element={<OrderHistory />}></Route>
      <Route path="/ketquatimkiem" element={<SearchResult />}></Route>

      {/* Admin routes */}
      <Route path="/quantrivien" element={<Dashboard />}></Route>

      {/* Error route */}
      <Route path="/error" element={<Error />} />
      <Route path="*" element={<Navigate to="/error" />} />
    </Routes>
  );
}

export default App;
