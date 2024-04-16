import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from "./component/showAccessary/Home";
import Cart from "./component/showAccessary/Cart";
import Payment from "./component/pay/Payment";
import Detail from "./component/showAccessary/Detail";
import Register from "./component/LoginLogout/Register";
import Login from "./component/LoginLogout/Login";
import HistoryBooking from "./component/LoginLogout/HistoryBooking";
import AllProduct from "./component/showAccessary/AllProduct";
import AdminPage from "./component/admin/AdminPage";
import PaymentOk from "./component/pay/PaymentOk";
import Errors from "./component/Errors";
import ConfirmAccount from "./component/LoginLogout/ConfirmAccount";
import BarChart from "./component/admin/BarChart";
import MovieStatisticChart from "./component/admin/StatisticsChart";

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
                <Route path={"/history"} element={<HistoryBooking/>}></Route>
                <Route path={"/all"} element={<AllProduct/>}></Route>
                <Route path={"/admin"} element={<AdminPage/>}></Route>
                <Route path={"/payOk/:id"} element={<PaymentOk/>}></Route>
                <Route path={"*"} element={<Errors/>}></Route>
                <Route path={"/confirm/:id"} element={<ConfirmAccount/>}></Route>
                <Route path={"/1"} element={<BarChart/>}></Route>
                <Route path={"/2"} element={<MovieStatisticChart/>}></Route>
            </Routes>
        </>
    );
}

export default App;
