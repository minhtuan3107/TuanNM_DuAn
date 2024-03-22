import Header from "../../Header";
import Footer from "../../Footer";
import {useEffect, useState} from "react";
import {getAllAdmin, getListAll} from "../../service/MotobikeAccessoryService";
import ReactPaginate from "react-paginate";
import {getAllAccount} from "../../service/AccountService";

export default function Accessary() {
    const [listAccessary, setListAccessary] = useState([]);
    const [listAccount, setListAccount] = useState([])
    const [listBooking, setListBooking] = useState([])
    const [nameSearch, setNameSearch] = useState("");
    const [page, setPage] = useState(0)
    const [showAdmin, setShowAdmin] = useState(0);
    useEffect(() => {
        const getListAccessary = async () => {
            const result = await getAllAdmin(nameSearch, page);
            setListAccessary(result.content);
        }
        const getListAccountPage = async () => {
            const result = await getAllAccount(nameSearch, page);
            setListAccount(result.content);
            console.log(listAccount)
        }
        const getListBookingPage = async () => {
            const result = await getAllAccount(nameSearch, page);
            setListBooking(result.content);
            console.log(listBooking)
        }
        getListBookingPage();
        getListAccountPage();
        getListAccessary();
        document.title = "admin"
    }, [showAdmin, page]);

    return (
        <>
            <div>
                <Header/>
            </div>
            <div>
                <main>
                    <div id="template-account" className="mg-top-50 pd-bottom-30">
                        <div className="cloud x1"/>
                        <div className="cloud x2"/>
                        <div className="cloud x3"/>
                        <div className="cloud x4"/>
                        <div className="cloud x5"/>
                        <div className="container" style={{width: "90%"}}>
                            <div className="row d-flex">
                                <div className="col-xs-12 col-sm-3 col-md-2 sidebar-account mg-bottom-15  item-left">
                                    <div className="AccountSidebar border-10-radius">
                                        <div className="account-left-header">
                                            <div className="user-account">
                                                <div className="user-acc-logo" data-color="T">
                                                </div>
                                                <div className="user-account">
                                                    <h4 className="user-account-name">Tuan</h4>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="AccountContent ">
                                            <ul>
                                                {showAdmin === 1 ?
                                                    <li className="d-flex d-flex-center mg-bottom-15 active">
                                                        <a className="d-flex d-flex-center" onClick={() => {
                                                            setShowAdmin(1)
                                                        }}>
                                                            <span>Quản lý phụ tùng</span>
                                                        </a>
                                                    </li> : <li className="d-flex d-flex-center mg-bottom-15  ">
                                                        <a className="d-flex d-flex-center" onClick={() => {
                                                            setShowAdmin(1)
                                                        }}>
                                                            <span>Quản lý phụ tùng</span>
                                                        </a>
                                                    </li>}
                                                {showAdmin === 0 ?
                                                    <li className="d-flex d-flex-center mg-bottom-15 active">
                                                        <a
                                                            className="d-flex d-flex-center"
                                                            onClick={() => {
                                                                setShowAdmin(0);
                                                            }}
                                                        >
                                                            <span>Quản lý hoá đơn </span>
                                                        </a>
                                                    </li> :
                                                    <li className="d-flex d-flex-center mg-bottom-15">
                                                        <a
                                                            className="d-flex d-flex-center"
                                                            onClick={() => {
                                                                setShowAdmin(0);
                                                            }}
                                                        >
                                                            <span>Quản lý hoá đơn </span>
                                                        </a>
                                                    </li>
                                                }
                                                {showAdmin === 2 ?
                                                    <li className="d-flex d-flex-center mg-bottom-15 active">
                                                        <a
                                                            className="d-flex d-flex-center"
                                                            onClick={() => {
                                                                setShowAdmin(2);
                                                            }}
                                                        >
                                                            <span>Quản lý khách hàng </span>
                                                        </a>
                                                    </li>
                                                    : <li className="d-flex d-flex-center mg-bottom-15">
                                                        <a
                                                            className="d-flex d-flex-center"
                                                            onClick={() => {
                                                                setShowAdmin(2);
                                                            }}
                                                        >
                                                            <span>Quản lý khách hàng </span>
                                                        </a>
                                                    </li>}
                                                {showAdmin === 3 ?
                                                    <li className="d-flex d-flex-center mg-bottom-15 active">
                                                        <a
                                                            className="d-flex d-flex-center"
                                                            onClick={() => {
                                                                setShowAdmin(3);
                                                            }}
                                                        >
                                                            <span>Thống kê </span>
                                                        </a>
                                                    </li> : <li className="d-flex d-flex-center mg-bottom-15">
                                                        <a
                                                            className="d-flex d-flex-center"
                                                            onClick={() => {
                                                                setShowAdmin(3);
                                                            }}
                                                        >
                                                            <span>Thống kê </span>
                                                        </a>
                                                    </li>}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                {showAdmin === 1 &&
                                    <div className="col-xs-12 col-sm-9 col-md-10 item-right mg-bottom-15">
                                        <div className="bg-while pd-15 border-10-radius">
                                            <div className="row">
                                                <div className="col-xs-12" id="customer_sidebar">
                                                    <div className="table-responsive">
                                                        <table className="table">
                                                            <thead>
                                                            <tr>
                                                                <th className="order_number text-center">
                                                                    Mã đơn hàng
                                                                </th>
                                                                <th className="date text-center">Ngày đặt</th>
                                                                <th className="total text-center">Thành tiền</th>
                                                                <th className="payment_status text-center">
                                                                    Trạng thái thanh toán
                                                                </th>
                                                                <th className="fulfillment_status text-center">
                                                                    Vận chuyển
                                                                </th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            {listAccessary.map((accessory) => (
                                                                <tr className="odd cancelled_order" key={accessory.id}>
                                                                    <td className="text-center">
                                                                        <a>
                                                                            {accessory.id}
                                                                        </a>
                                                                    </td>
                                                                    <td className="text-center">
                                                                        <span>{accessory.name}</span>
                                                                    </td>
                                                                    <td className="text-center">
                                                                    <span
                                                                        className="total money">{(accessory.price) || "Đang cập nhật"}</span>
                                                                    </td>
                                                                    <td className="text-center">
                                                                    <span
                                                                        className="status_pending"></span>
                                                                    </td>
                                                                    <td className="text-center">
                          <span className="status_not fulfilled" data-note="">

                          </span>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                                {showAdmin === 0 &&
                                <div className="col-xs-12 col-sm-9 col-md-10 item-right mg-bottom-15">
                                    <div className="bg-while pd-15 border-10-radius">
                                        <div className="row">
                                            <div className="col-xs-12" id="customer_sidebar">
                                                <div className="table-responsive">
                                                    <table className="table">
                                                        <thead>
                                                        <tr>
                                                            <th className="order_number text-center">Tên khách hàng
                                                            </th>
                                                            <th className="date text-center">Địa chỉ</th>
                                                            <th className="total text-center">Số điện thoại</th>
                                                            <th className="payment_status text-center">
                                                                Tên sản phẩm
                                                            </th>
                                                            <th className="fulfillment_status text-center">
                                                                Số lượng
                                                            </th>  <th className="fulfillment_status text-center">
                                                            Tổng tiền
                                                            </th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {listBooking.map((booking) => (
                                                            <tr className="odd cancelled_order" key={booking.id}>
                                                                <td className="text-center">
                                                                    <a>
                                                                        {booking.account}
                                                                    </a>
                                                                </td>
                                                                <td className="text-center">
                                                                    <span>{booking.date || "Đang cập nhật"}</span>
                                                                </td>
                                                                <td className="text-center">
                                                                    <span
                                                                        className="total money">{booking.name}</span>
                                                                </td>
                                                                <td className="text-center">
                                                                    <span
                                                                        className="status_pending">{(booking.price) || "Đang cập nhật"}</span>
                                                                </td>
                                                                <td className="text-center">{booking.quantity}
                                                                    <span className="status_not fulfilled" data-note="">

                          </span>
                                                                </td>
                                                            </tr>
                                                        ))}

                                                        </tbody>

                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                                {showAdmin === 2 &&
                                    <div className="col-xs-12 col-sm-9 col-md-10 item-right mg-bottom-15">
                                        <div className="bg-while pd-15 border-10-radius">
                                            <div className="row">
                                                <div className="col-xs-12" id="customer_sidebar">
                                                    <div className="table-responsive">
                                                        <table className="table">
                                                            <thead>
                                                            <tr>
                                                                <th className="order_number text-center">Mã khách hàng
                                                                </th>
                                                                <th className="date text-center">Tên khách hàng</th>
                                                                <th className="total text-center">Ngày sinh</th>
                                                                <th className="payment_status text-center">
                                                                    Số điện thoại
                                                                </th>
                                                                <th className="fulfillment_status text-center">
                                                                    Email
                                                                </th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            {listAccount.map((account) => (
                                                                <tr className="odd cancelled_order" key={account.id}>
                                                                    <td className="text-center">
                                                                        <a>
                                                                            {account.id}
                                                                        </a>
                                                                    </td>
                                                                    <td className="text-center">
                                                                        <span>{account.fullName || "Đang cập nhật"}</span>
                                                                    </td>
                                                                    <td className="text-center">
                                                                    <span
                                                                        className="total money">{account.birthday}</span>
                                                                    </td>
                                                                    <td className="text-center">
                                                                    <span
                                                                        className="status_pending">{(account.phone) || "Đang cập nhật"}</span>
                                                                    </td>
                                                                    <td className="text-center">{account.email}
                                                                        <span className="status_not fulfilled"
                                                                              data-note="">

                          </span>
                                                                    </td>
                                                                </tr>
                                                            ))}

                                                            </tbody>

                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <div style={{marginTop: "2.5%"}}>
                <Footer/>
            </div>
        </>
    )
}