import Footer from "../header_footer/Footer";
import {useEffect, useState} from "react";
import MySwal from "sweetalert2";
import Swal from "sweetalert2";
import {formatNumber} from "chart.js/helpers";
import {
    deleteAccessory,
    detailBooking,
    getAllAccessary,
    getAllAccount,
    getAllBooking, getAllTypeAccessary, getBookingTop,
} from "../../service/AdminService";
import HeaderIsLogin from "../header_footer/HeaderIsLogin";
import {useNavigate} from "react-router-dom";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from 'yup';
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage'
import {v4} from "uuid";
import {storage} from '../firebase';
import {addTypeAccessary, getAll} from "../../service/TypeAccessoryService";
import {addAccessary} from "../../service/MotobikeAccessoryService";
import {getListBookingByIdAccount} from "../../service/BookingService";
import ReactPaginate from "react-paginate";
import {Chart} from "chart.js";
import StatisticsChart from "./StatisticsChart";
import MovieStatisticChart from "./StatisticsChart";
import StatisticsChartUser from "./StatisticsChartUser";

export default function AdminPage() {
    const [listAccessary, setListAccessary] = useState([]);
    const [listAccount, setListAccount] = useState([]);
    const [listTypeAccessary, setListTypeAccessary] = useState([]);
    const [listBooking, setListBooking] = useState([]);
    const [nameSearch, setNameSearch] = useState("");
    const [showAdmin, setShowAdmin] = useState(1);
    const [refesh, setRefesh] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const back = useNavigate();
    const [imageUpload, setImageUpload] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [action, setAction] = useState(0); // 1: Them loai phu tung 2 la phu tung 3 la sua phu tung
    const [selectedValue, setSelectedValue] = useState('');
    const [accessary, setAccessary] = useState({});
    const [pageCount, setPageCount] = useState(0);
    const [totalPages, settotalPages] = useState(0);
    const [totalPagesBooking, settotalPagesBooking] = useState(0);
    useEffect(() => {
        try {
            const idUser = localStorage.getItem("idAccount");
            window.scrollTo(0, 0);
            const isLogin = localStorage.getItem("isLogin");
            if (isLogin) {
                setIsLogin(true)
            }
            const getListAccessary = async () => {
                const result = await getAllAccessary(nameSearch, 0);
                setListAccessary(result?.content || back("/zxc"));
                settotalPages(result.totalPages);
            }
            const getListAccountPage = async () => {
                const result = await getAllAccount(nameSearch, 0);
                setListAccount(result);
                console.log(result)
            }
            const getListBookingPage = async () => {
                const result = await getAllBooking(0);
                setListBooking(result.content);
                settotalPages(result.totalPages);
            }
            const getTypeAccessary = async () => {
                const result = await getAllTypeAccessary();
                setListTypeAccessary(result)
            }

            getListBookingPage();
            getListAccountPage();
            getListAccessary();
            getTypeAccessary();
            document.title = "admin"

        } catch (e) {
            console.log(e)
        }
        uploadImage()
    }, [showAdmin, refesh, imageUpload]);

    const [currentPageBooking, setCurrentPageBooking] = useState(0);
    const handlePageBooking = async (event) => {
        console.log("OK")
        try {
            const result = await getAllBooking(event.selected);
            setListBooking(result.content);
            settotalPages(result.totalPages);
        } catch (error) {
            console.log(error);
        }
    };

    const [currentPage, setCurrentPage] = useState(0);

    const handlePageClick = async (event) => {
        try {
            const resultAccessary = await getAllAccessary(nameSearch, event.selected);
            setListAccessary(resultAccessary.content);
            settotalPages(resultAccessary.totalPages);
        } catch (error) {
            console.log(error);
        }
    };


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

    const uploadImage = () => {
        if (imageUpload === "") return;
        const imageRef = ref(storage, `productImage/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload).then(() => {
            getDownloadURL(imageRef).then((url) => {
                setImageUrl(url)
            })
        })
    }
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
    const handleChange = (event) => {
        setSelectedValue(event.target.value); // Lưu giá trị được chọn vào state
        console.log(selectedValue)
    };

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
                                                    <span className="box-icon"><img width="24" height="24"
                                                                                    src="//theme.hstatic.net/200000298594/1001166168/14/user-account.svg?v=256"
                                                                                    alt="Tài khoản"/></span>
                                                </div>
                                                <div className="user-account">
                                                    <h4 className="user-account-name">zxc</h4>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="AccountContent ">
                                            <ul>
                                                {showAdmin === 1 ?
                                                    <li className="d-flex d-flex-center mg-bottom-15 active">
                                                        <a className="d-flex d-flex-center" onClick={() => {
                                                            setShowAdmin(1)
                                                            setAction(0)
                                                        }}>
                                                            <span>Quản lý phụ tùng</span>
                                                        </a>
                                                    </li> : <li className="d-flex d-flex-center mg-bottom-15  ">
                                                        <a className="d-flex d-flex-center" onClick={() => {
                                                            setShowAdmin(1)
                                                            setAction(0)
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
                                                                setAction(0)

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
                                                                setAction(0)

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
                                                                setAction(0)

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
                                                                setAction(0)

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
                                                                setAction(0)

                                                            }}
                                                        >
                                                            <span>Thống kê </span>
                                                        </a>
                                                    </li> : <li className="d-flex d-flex-center mg-bottom-15">
                                                        <a
                                                            className="d-flex d-flex-center"
                                                            onClick={() => {
                                                                setShowAdmin(3);
                                                                setAction(0)

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
                                                                <td>
                                                                    <button style={{minWidth: "190px"}}
                                                                            className="btn-update-customer"
                                                                            onClick={() => {
                                                                                setAction(1);
                                                                                setShowAdmin(null)
                                                                            }}
                                                                    >Thêm loại phụ tùng
                                                                    </button>
                                                                    <button style={{minWidth: "190px"}}
                                                                            className="btn-update-customer"
                                                                            onClick={() => {
                                                                                setAction(2);
                                                                                setShowAdmin(null)
                                                                            }}
                                                                    >Thêm phụ tùng
                                                                    </button>
                                                                </td>
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
                                                                                onClick={() => {
                                                                                    setAction(3);
                                                                                    setShowAdmin(null)
                                                                                    setAccessary(accessory)
                                                                                }}
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
                                            <div className="page">
                                                <ReactPaginate
                                                    previousLabel={"Trang sau"}
                                                    nextLabel={"Trang trước"}
                                                    breakLabel={"..."}
                                                    breakClassName={"break-me"}
                                                    pageCount={totalPages}
                                                    marginPagesDisplayed={2}
                                                    pageRangeDisplayed={5}
                                                    onPageChange={handlePageClick}
                                                    containerClassName={"pagination"}
                                                    subContainerClassName={"pages pagination"}
                                                    activeClassName={"active"}
                                                />
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
                                                                <tr className="odd cancelled_order" key={booking.id}>
                                                                    <td className="text-center">
                                                                        {formatDate(booking.dateBooking)}
                                                                    </td>
                                                                    <td className="text-center">
                                                                        <span>{formatNumber(booking.price)} đ</span>
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
                                            <div className="page">
                                                <ReactPaginate
                                                    previousLabel={"Trang sau"}
                                                    nextLabel={"Trang trước"}
                                                    breakLabel={"..."}
                                                    breakClassName={"break-me"}
                                                    pageCount={totalPages}
                                                    marginPagesDisplayed={2}
                                                    pageRangeDisplayed={5}
                                                    onPageChange={handlePageBooking}
                                                    containerClassName={"pagination"}
                                                    subContainerClassName={"pages pagination"}
                                                    activeClassName={"active"}
                                                />
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
                                } {showAdmin === 3 &&
                                <div className="col-xs-12 col-sm-9 col-md-10 item-right mg-bottom-15">
                                    <div className="bg-while pd-15 border-10-radius">
                                        <div className="row">
                                            <div className="col-xs-12" id="customer_sidebar">
                                                <div className="table-responsive">
                                                    <div >
                                                        <table>
                                                            <tr>
                                                                <td style={{width: "45%"}}>
                                                                    <StatisticsChart style={{display: "none"}}/>
                                                                </td>
                                                                <td style={{width: "50%"}}>
                                                                    <StatisticsChartUser style={{display: "none"}}/>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                                {action === 1 &&
                                    <div className="col-xs-12 col-sm-9 col-md-9 item-right mg-bottom-15">
                                        <div className="bg-while pd-15 border-10-radius">
                                            <div className="row">
                                                <div className="col-xs-12" id="customer_sidebar">
                                                    <h1 className="title-detail h3">Thêm loại phụ tùng</h1>
                                                    <div className="form-update-content">
                                                        <div className="success-update-info hidden">
                                                            <img
                                                                width={20}
                                                                height={20}
                                                                src="https://file.hstatic.net/200000525917/file/check_fed1ae0ce277470eb827c4d6f3ac8ddf.png"
                                                            />
                                                            <div className="btn-close">
                                                                <span className="bar animate"/>
                                                            </div>
                                                        </div>
                                                        <Formik initialValues={{
                                                            name: "",
                                                            img: imageUrl
                                                        }} validationSchema={Yup.object({
                                                            name: Yup.string().required("Vui lòng không để trống")
                                                        })}
                                                                onSubmit={values => {
                                                                    const data = {
                                                                        name: values.name,
                                                                        img: imageUrl
                                                                    }
                                                                    console.log(data)
                                                                    addTypeAccessary(data).then(() => {
                                                                        Swal.fire({
                                                                            title: "Thêm thành công !",
                                                                            // text: "Your file has been deleted.",
                                                                            icon: "success"
                                                                        });
                                                                    })
                                                                    setShowAdmin(1);
                                                                    setAction(0);
                                                                    console.log(data)
                                                                }}>
                                                            <Form>
                                                                <div className="form-group-edit d-flex align-center">
                                                                    <label>Tên loại phụ tùng</label>
                                                                    <p>
                                                                        <Field
                                                                            placeholder={"Nhập tên loại phụ tùng"}
                                                                            name="name"
                                                                            className="text"
                                                                        />

                                                                        <ErrorMessage name="name" component={"div"}
                                                                                      className={"errors"}/>
                                                                    </p>
                                                                </div>
                                                                <div className="form-group-edit d-flex align-center">
                                                                    <label>Chọn ảnh </label>
                                                                    <p>
                                                                        <label
                                                                            htmlFor="file-upload">{imageUpload.name === undefined ?
                                                                            <h5>Bấm vào đây để tải ảnh
                                                                                lên</h5> : imageUpload.name}</label>
                                                                        <input id="file-upload" type='file'
                                                                               style={{display: "none"}}
                                                                               onChange={(event) => {
                                                                                   const selectedFile = event.target.files[0];
                                                                                   if (selectedFile) {
                                                                                       setImageUpload(selectedFile);
                                                                                   }
                                                                               }}/>
                                                                    </p>
                                                                    {imageUrl !== "" &&
                                                                        <img style={{width: '100px', height: '100px'}}
                                                                             src={imageUrl}/>
                                                                    }
                                                                </div>
                                                                <div
                                                                    className="form-group-edit d-flex align-center js-center-mb">
                                                                    <label/>
                                                                    {imageUrl !== "" &&
                                                                        <button
                                                                            className="btn-update-customer"
                                                                            type="submit"
                                                                        >
                                                                            Thêm
                                                                        </button>}
                                                                </div>
                                                            </Form>
                                                        </Formik>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                }{action === 2 &&
                                <div className="col-xs-12 col-sm-9 col-md-9 item-right mg-bottom-15">
                                    <div className="bg-while pd-15 border-10-radius">
                                        <div className="row">
                                            <div className="col-xs-12" id="customer_sidebar">
                                                <h1 className="title-detail h3">Thêm phụ tùng</h1>
                                                <div className="form-update-content">
                                                    <div className="success-update-info hidden">
                                                        <img
                                                            width={20}
                                                            height={20}
                                                            src="https://file.hstatic.net/200000525917/file/check_fed1ae0ce277470eb827c4d6f3ac8ddf.png"
                                                        />
                                                        <div className="btn-close">
                                                            <span className="bar animate"/>
                                                        </div>
                                                    </div>
                                                    <Formik initialValues={{
                                                        date: "",
                                                        description: "",
                                                        img: imageUrl,
                                                        name: "",
                                                        price: 0,
                                                        quantity: 0,
                                                        typeAccessory: selectedValue
                                                    }} validationSchema={Yup.object({
                                                        name: Yup.string().required("Vui lòng không để trống"),
                                                        price: Yup.number().required("Vui lòng không để trống").positive("Vui lòng nhập số dương")
                                                            .integer("Vui lòng nhập số nguyên"),
                                                        quantity: Yup.number().required("Vui lòng không để trống").positive("Vui lòng nhập số dương")
                                                            .integer("Vui lòng nhập số nguyên")
                                                    })}
                                                            onSubmit={values => {
                                                                const data = {
                                                                    date: "",
                                                                    description: values.description,
                                                                    img: imageUrl,
                                                                    name: values.name,
                                                                    price: values.price,
                                                                    quantity: values.quantity,
                                                                    typeAccessory: JSON.parse(selectedValue)
                                                                }
                                                                addAccessary(data).then(() => {
                                                                    Swal.fire({
                                                                        title: "Thêm phụ tùng thành công !",
                                                                        // text: "Your file has been deleted.",
                                                                        icon: "success"
                                                                    });
                                                                    setShowAdmin(1);
                                                                    setAction(0);
                                                                })
                                                                console.log(data)
                                                            }}>
                                                        <Form>
                                                            <div className="form-group-edit d-flex align-center">
                                                                <label>Tên phụ tùng</label>
                                                                <p>
                                                                    <Field
                                                                        name="name"
                                                                        className="text"
                                                                        placeholder={"Nhập tên phụ tùng"}
                                                                    />
                                                                    <ErrorMessage name="name" component={"div"}
                                                                                  className={"errors"}/>
                                                                </p>
                                                            </div>
                                                            <div className="form-group-edit d-flex align-center">
                                                                <label>Loại sản phẩm</label>
                                                                <p>
                                                                    <select value={selectedValue}
                                                                            onChange={handleChange}
                                                                            className="form-control textbox"
                                                                            name="typeAccessory">
                                                                        {listTypeAccessary.map((type) => (
                                                                            <option key={type.id}
                                                                                    value={JSON.stringify(type)}>{type.name}</option>
                                                                        ))}
                                                                    </select>
                                                                </p>
                                                            </div>
                                                            <div className="form-group-edit d-flex align-center">
                                                                <label>Nhập mô tả</label>
                                                                <p>
                                                                    <p>
                                                                        <Field style={{width: "100%"}} as="textarea"
                                                                               name="description"
                                                                               className="text"
                                                                               placeholder={"Nhập mô tả"}
                                                                        />

                                                                    </p>
                                                                </p>
                                                            </div>
                                                            <div className="form-group-edit d-flex align-center">
                                                                <label>Nhập giá tiền</label>
                                                                <p>
                                                                    <p>
                                                                        <Field
                                                                            name="price"
                                                                            className="text"
                                                                            placeholder={"Nhập giá tiền"}
                                                                        />
                                                                        <ErrorMessage name="price" component={"div"}
                                                                                      className={"errors"}/>
                                                                    </p>
                                                                </p>
                                                            </div>
                                                            <div className="form-group-edit d-flex align-center">
                                                                <label>Nhập số lượng</label>
                                                                <p>
                                                                    <p>
                                                                        <Field
                                                                            name="quantity"
                                                                            className="text"
                                                                            placeholder={"Nhập số lượng"}
                                                                        />
                                                                        <ErrorMessage name="quantiry" component={"div"}
                                                                                      className={"errors"}/>
                                                                    </p>
                                                                </p>
                                                            </div>
                                                            <div className="form-group-edit d-flex align-center">
                                                                <label>Chọn ảnh </label>
                                                                <p>
                                                                    <label
                                                                        htmlFor="file-upload-img">{imageUpload.name === undefined ?
                                                                        <h5>Bấm vào đây để tải ảnh
                                                                            lên</h5> : imageUpload.name}</label>
                                                                    <input id="file-upload-img" type='file'
                                                                           style={{display: "none"}}
                                                                           onChange={(event) => {
                                                                               const selectedFile = event.target.files[0];
                                                                               if (selectedFile) {
                                                                                   setImageUpload(selectedFile);
                                                                               }
                                                                           }}/>
                                                                </p>
                                                                {imageUrl !== "" &&
                                                                    <img style={{width: '100px', height: '100px'}}
                                                                         src={imageUrl}/>}
                                                            </div>
                                                            <div
                                                                className="form-group-edit d-flex align-center js-center-mb">
                                                                <label/>
                                                                {imageUrl !== "" &&
                                                                    <button
                                                                        className="btn-update-customer"
                                                                        type="submit"
                                                                    >
                                                                        Thêm
                                                                    </button>}
                                                            </div>
                                                        </Form>
                                                    </Formik>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }{action === 3 &&
                                <div className="col-xs-12 col-sm-9 col-md-9 item-right mg-bottom-15">
                                    <div className="bg-while pd-15 border-10-radius">
                                        <div className="row">
                                            <div className="col-xs-12" id="customer_sidebar">
                                                <h1 className="title-detail h3">Sửa phụ tùng</h1>
                                                <div className="form-update-content">
                                                    <div className="success-update-info hidden">
                                                        <img
                                                            width={20}
                                                            height={20}
                                                            src="https://file.hstatic.net/200000525917/file/check_fed1ae0ce277470eb827c4d6f3ac8ddf.png"
                                                        />
                                                        <div className="btn-close">
                                                            <span className="bar animate"/>
                                                        </div>
                                                    </div>
                                                    <Formik initialValues={{
                                                        id: accessary.id,
                                                        date: accessary.date,
                                                        description: accessary.description,
                                                        img: accessary.img,
                                                        name: accessary.name,
                                                        price: accessary.price,
                                                        quantity: accessary.quantity,
                                                        typeAccessory: accessary.typeAccessory
                                                    }} validationSchema={Yup.object({
                                                        name: Yup.string().required("Vui lòng không để trống"),
                                                        price: Yup.number().required("Vui lòng không để trống"),
                                                        quantity: Yup.number().required("Vui lòng không để trống")
                                                    })}
                                                            onSubmit={values => {
                                                                addAccessary(values).then(() => {
                                                                    Swal.fire({
                                                                        title: "Sửa phụ tùng thành công !",
                                                                        // text: "Your file has been deleted.",
                                                                        icon: "success"
                                                                    });
                                                                    setShowAdmin(1);
                                                                    setAction(0);
                                                                })
                                                            }}>
                                                        <Form>
                                                            <div className="form-group-edit d-flex align-center">
                                                                <label>Tên phụ tùng</label>
                                                                <p>
                                                                    <Field
                                                                        name="name"
                                                                        className="text"
                                                                        placeholder={"Nhập tên phụ tùng"}
                                                                    />
                                                                    <ErrorMessage name="name" component={"div"}
                                                                                  className={"errors"}/>
                                                                </p>
                                                            </div>
                                                            <div className="form-group-edit d-flex align-center">
                                                                <label>Loại sản phẩm</label>
                                                                <p>
                                                                    <select value={selectedValue}
                                                                            onChange={handleChange}
                                                                            className="form-control textbox"
                                                                            name="typeAccessory">
                                                                        {listTypeAccessary.map((type) => (
                                                                            <option key={type.id}
                                                                                    value={JSON.stringify(type)}>{type.name}</option>
                                                                        ))}
                                                                    </select>
                                                                </p>
                                                            </div>
                                                            <div className="form-group-edit d-flex align-center">
                                                                <label>Nhập mô tả</label>
                                                                <p>
                                                                    <p>
                                                                        <Field
                                                                            name="description"
                                                                            className="text"
                                                                            placeholder={"Nhập mô tả"}
                                                                        />

                                                                    </p>
                                                                </p>
                                                            </div>
                                                            <div className="form-group-edit d-flex align-center">
                                                                <label>Nhập giá tiền</label>
                                                                <p>
                                                                    <p>
                                                                        <Field
                                                                            name="price"
                                                                            className="text"
                                                                            placeholder={"Nhập giá tiền"}
                                                                        />
                                                                        <ErrorMessage name="price" component={"div"}
                                                                                      className={"errors"}/>
                                                                    </p>
                                                                </p>
                                                            </div>
                                                            <div className="form-group-edit d-flex align-center">
                                                                <label>Nhập số lượng</label>
                                                                <p>
                                                                    <p>
                                                                        <Field
                                                                            name="quantity"
                                                                            className="text"
                                                                            placeholder={"Nhập số lượng"}
                                                                        />
                                                                        <ErrorMessage name="quantiry" component={"div"}
                                                                                      className={"errors"}/>
                                                                    </p>
                                                                </p>
                                                            </div>
                                                            <div
                                                                className="form-group-edit d-flex align-center js-center-mb">
                                                                <label/>

                                                                <button
                                                                    className="btn-update-customer"
                                                                    type="submit"
                                                                >
                                                                    Thêm
                                                                </button>
                                                            </div>
                                                        </Form>
                                                    </Formik>

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
            <div style={{marginTop: "8%"}}>
                <Footer/>
            </div>
        </>
    )
}