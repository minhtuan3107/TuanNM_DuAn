import Header from "../../Header";
import Footer from "../../Footer";
import {useEffect, useState} from "react";
import MySwal from "sweetalert2";
import Swal from "sweetalert2";
import {formatNumber} from "chart.js/helpers";
import {
    deleteAccessory,
    detailBooking,
    getAllAccessary,
    getAllAccount,
    getAllBooking,
    getRole
} from "../../service/AdminService";
import HeaderIsLogin from "../../HeaderIsLogin";
import findById from "../../service/AccountService";
import {useNavigate} from "react-router-dom";

export default function AdminPage() {
    const [listAccessary, setListAccessary] = useState([]);
    const [listAccount, setListAccount] = useState([])
    const [listBooking, setListBooking] = useState([])
    const [nameSearch, setNameSearch] = useState("");
    const [page, setPage] = useState(0)
    const [showAdmin, setShowAdmin] = useState(1);
    const [refesh, setRefesh] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const back = useNavigate();
    useEffect(() => {
        const idUser = localStorage.getItem("idAccount");
        window.scrollTo(0, 0);
        const isLogin = localStorage.getItem("isLogin");
        if (isLogin) {
            setIsLogin(true)
        }
        const getListAccessary = async () => {
            const result = await getAllAccessary(nameSearch, page);
            setListAccessary(result.content);
        }
        const getListAccountPage = async () => {
            const result = await getAllAccount(nameSearch, page);
            setListAccount(result);
            console.log(listAccount)
        }
        const getListBookingPage = async () => {
            const result = await getAllBooking(nameSearch, page);
            setListBooking(result.content);
            console.log(listBooking)
        }
        getListBookingPage();
        getListAccountPage();
        getListAccessary();
        document.title = "admin"
    }, [showAdmin, page, refesh]);
    const showDetailBooking = async (date) => {
        const booking = await detailBooking(date);

        MySwal.fire({
            title: 'Chi tiết đơn hàng',
            html: `
    <div style="font-weight: bold; text-align: left">
      <p>Địa chỉ nhận hàng: ${booking[0].address}</p>
      <p>Số điện thoại: ${booking[0].phone}</p>
    </div>
    ${booking.map((booking, index) => (
                `<div class="item-wrap" id="cart-page-result-${index}">
         <ul class="cart-wrap" data-line={1}>
           <li class="item-info">
             <div class="item-img">
               <img src="${booking.motobikeAccessory.img}" />
             </div>
             <div class="item-title">
               <h5>Số lượng : ${booking.quantity}</h5>
             </div>
           </li>
           <li class="item-price" style="flex: 0 0 40%">
             <span class="amount full-price">
               <span>${formatNumber(booking.motobikeAccessory.price)}đ</span>
             </span>
           </li>
         </ul>
       </div>`
            )).join('')}
  `
        });
    };

    const formatDate = (dateString) => {
        const timestamp = new Date(dateString);
        const formattedDate = `${timestamp.getHours()}:${timestamp.getMinutes()} - ${timestamp.getFullYear()}-${(timestamp.getMonth() + 1).toString().padStart(2, '0')}-${timestamp.getDate().toString().padStart(2, '0')}`;

        console.log(formattedDate);
        return formattedDate;
    };
    const deleteAccessary = async (id, name) => {
        Swal.fire({
            title: "Bạn có muốn xoá sản phẩm này ?",
            text: "Bạn chắc chắn muốn xoá sản phẩm " + name + " chứ ?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Xoá",
            cancelButtonText: "Huỷ"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Xoá thành công !",
                    // text: "Your file has been deleted.",
                    icon: "success"
                });
                deleteAccessory(id)
                setRefesh(!refesh)
            }
        });
    }
    return (
        <>
            <div>
                <HeaderIsLogin/>
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
                                                                    Mã phụ tùng
                                                                </th>
                                                                <th className="date text-center">Tên phụ tùng</th>
                                                                <th className="total text-center">Giá tiền</th>
                                                                <th className="payment_status text-center">
                                                                    Số lượng còn lại
                                                                </th>
                                                                <th className="fulfillment_status text-center">
                                                                    Loại
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
                                                                        className="status_pending">{accessory.quantity == 0 ? "Đã hết" : accessory.quantity}</span>
                                                                    </td>
                                                                    <td className="text-center">
                          <span className="status_not fulfilled" data-note="">
                            {accessory.typeAccessory.name}
                          </span>
                                                                    </td>
                                                                    <td>
                                                                        <button style={{minWidth: "190px"}}
                                                                                className="btn-update-customer"
                                                                                onClick={() => {
                                                                                    deleteAccessary(accessory.id, accessory.name)
                                                                                }}
                                                                        >Xoá
                                                                        </button>
                                                                        <button style={{minWidth: "190px"}}
                                                                                className="btn-update-customer"
                                                                        >Sửa
                                                                        </button>
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
                                                                <th className="order_number text-center">Ngày đặt
                                                                </th>
                                                                <th className="total text-center">Tổng tiền</th>
                                                                <th className="payment_status text-center">
                                                                    Trạng thái
                                                                </th>

                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            {listBooking.map((booking) => (
                                                                <tr className="odd cancelled_order">
                                                                    <td className="text-center">
                                                                        {formatDate(booking.dateBooking)}
                                                                    </td>
                                                                    <td className="text-center">
                                                                        <span>{formatNumber(booking.totalPrice)} đ</span>
                                                                    </td>
                                                                    <td className="text-center">
                                                                    <span
                                                                        className="total money">
                                                                        {booking.statusPayment == 1 ? "Nhận hàng rồi thanh toán" : "Đã thanh toán"}
                                                                    </span>
                                                                    </td>
                                                                    <td>
                                                                        <button className="btn-update-customer"
                                                                                onClick={() => {
                                                                                    showDetailBooking(booking.dateBooking)
                                                                                }}
                                                                        >Chi
                                                                            tiết đơn hàng
                                                                        </button>
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
                                                                        className="status_pending">{(account.phoneNumber) || "Đang cập nhật"}</span>
                                                                    </td>
                                                                    <td className="text-center">{account.email}
                                                                        <span className="status_not fulfilled"
                                                                              data-note="">
                          </span>
                                                                    </td>
                                                                    <td>

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