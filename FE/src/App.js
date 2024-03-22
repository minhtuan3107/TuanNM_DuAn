import logo from './logo.svg';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from "./component/Home";
import Cart from "./component/Cart";
import Payment from "./component/Payment";
import Detail from "./component/Detail";
import Register from "./component/LoginLogout/Register";
import Login from "./component/LoginLogout/Login";
import UserInfo from "./component/LoginLogout/UserInfo";
import HistoryBooking from "./component/LoginLogout/HistoryBooking";
import AllProduct from "./component/AllProduct";
import Accessary from "./component/admin/accessary/Accessary";

function App() {
  return (
    <>
      <Routes>
        <Route path={"/home"} element={<Home/>}></Route>
        <Route path={"/cart/:id"} element={<Cart/>}></Route>
        <Route path={"/pay/:id"} element={<Payment/>}></Route>
        <Route path={"/detail/:id"} element={<Detail/>}></Route>
        <Route path={"/register"} element={<Register/>}></Route>
        <Route path={"/login"} element={<Login/>}></Route>
        <Route path={"/info"} element={<UserInfo/>}></Route>
        <Route path={"/history"} element={<HistoryBooking/>}></Route>
        <Route path={"/all"} element={<AllProduct/>}></Route>
        <Route path={"/admin/accessary"} element={<Accessary/>}></Route>
        </Routes>
    </>
  );
}

export default App;
