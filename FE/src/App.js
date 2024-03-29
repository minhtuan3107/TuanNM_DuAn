import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from "./component/Home";
import Cart from "./component/Cart";
import Payment from "./component/Payment";
import Detail from "./component/Detail";
import Register from "./component/LoginLogout/Register";
import Login from "./component/LoginLogout/Login";
import HistoryBooking from "./component/LoginLogout/HistoryBooking";
import AllProduct from "./component/AllProduct";
import AdminPage from "./component/admin/accessary/AdminPage";
import PaymentOk from "./component/PaymentOk";

function App() {
    return (
        <>
            <Routes>
                <Route path={"/home"} element={<Home/>}></Route>
                <Route path={"/cart"} element={<Cart/>}></Route>
                <Route path={"/pay/:id"} element={<Payment/>}></Route>
                <Route path={"/detail/:id"} element={<Detail/>}></Route>
                <Route path={"/register"} element={<Register/>}></Route>
                <Route path={"/login"} element={<Login/>}></Route>
                <Route path={"/history/:id"} element={<HistoryBooking/>}></Route>
                <Route path={"/all"} element={<AllProduct/>}></Route>
                <Route path={"/admin"} element={<AdminPage/>}></Route>
                <Route path={"/payOk/:id"} element={<PaymentOk/>}></Route>
            </Routes>
        </>
    );
}

export default App;
