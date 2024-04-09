import Header from "../header_footer/Header";
import Footer from "../header_footer/Footer";
import {useEffect, useState} from "react";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import {deleteCart, getListCart, getTotalAmount, updateQuantity} from "../../service/CartService";
import '../css/modal.css'
import Swal from "sweetalert2";
import 'jspdf-autotable';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import {
    paymentBooking,
    shipCod, waitPayment
} from "../../service/BookingService";
import HeaderIsLogin from "../header_footer/HeaderIsLogin";

export default function Cart() {
    const [listCart, setListCart] = useState([]);
    const [isLogin, setIsLogin] = useState(true);
    const location = useLocation();
    const [totalAmount, setTotalAmount] = useState(0);
    const [flag, setFlag] = useState(false);
    const [flag1, setFlag1] = useState(false);
    const back = useNavigate();
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [des, setDes] = useState("");
    const [useAccountAddress, setUseAccountAddress] = useState(true);
    const [printPDF, setPrintPDF] = useState(false);
    const idAccount = location.state?.idAccount || 0;
    const [nameProduct, setNameProduct] = useState("")
    const [qualityProduct, setQualityProduct] = useState(0);


    useEffect(() => {
        if (idAccount === 0) {
            back("/zxc")
        }
        const token = localStorage.getItem("authToken");
        const idUser = localStorage.getItem("idAccount");
        try {
            const getListData = async () => {
                const list = await getListCart(idAccount, token);
                setListCart(list);
                const total = await getTotalAmount(idAccount);
                setTotalAmount(total);
            }
            getListData()
        } catch (e) {
            back("/zxc")
        }
        window.scrollTo(0, 0);
        setFlag(false)
        document.title = "Giỏ hàng của bạn"
        const isLogin = localStorage.getItem("isLogin");
        if (isLogin) {
            setIsLogin(true)
        }
    }, [totalAmount, flag, flag1]);

    const alert = (cart) => {
        Swal.fire({
            title: "Bạn có muốn xoá sản phẩm này ?",
            text: "Bạn chắc chắn muốn xoá sản phẩm " + cart.motobikeAccessory.name + " chứ ?",
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
                onDelete(cart.id)
            }
        });
    }
    const onDelete = async (id) => {
        await deleteCart(id)
        console.log(totalAmount)
        setAmount()
        setFlag(true)
    }
    const setAmount = async () => {
        const total = await getTotalAmount(idAccount);
        setTotalAmount(total);
    }


    const backToPayment = async () => {
        setFlag(!flag)
        waitPayment(idAccount, des, address, phone).then(flag => {
                console.log(flag)
                if (flag === true) {
                    paymentBooking(totalAmount, idAccount, des, address, phone).then(url => {
                        window.location.href = url;
                        console.log(url)
                    })
                }
                if (flag === false) {
                    Swal.fire({
                        title: "Số lượng hiện tại không đủ !",
                        text: "Số lượng sản phẩm bạn đặt không đủ với sản phẩm trong kho.",
                        icon: "error"
                    });
                }
            }
        )
    }

    const cod = async () => {
        Swal.fire({
            title: "Bạn chắc là muốn nhận hàng rồi thanh toán?",
            text: "Bạn sẽ phải thanh toán " + formatNumber(totalAmount) + " cho shipper ?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Đồng ý",
            cancelButtonText: "Huỷ"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const checkStatus = await waitPayment(idAccount, des, address, phone)
                console.log(checkStatus)
                if (checkStatus === true) {
                    shipCod(totalAmount, idAccount).then(
                        back(`/history`)
                    )
                    Swal.fire({
                        title: "Đặt hàng thành công !",
                        text: "Vui lòng thanh toán " + formatNumber(totalAmount) + " cho shipper khi nhận hàng.",
                        icon: "success"
                    });
                    setFlag(!flag);
                }
                if (checkStatus === false) {
                    Swal.fire({
                        title: "Số lượng hiện tại không đủ !",
                        text: "Số lượng sản phẩm bạn đặt không đủ với sản phẩm trong kho.",
                        icon: "error"
                    });
                }
            }
        });
    }
    const confirmShipCod = () => {
        waitPayment(idAccount, des, address, phone).then(() => {

        })
    }
    const exportPDF = () => {

        const doc = new jsPDF();

        // Tạo một mảng chứa các tên trường dữ liệu
        const columns = Object.keys(listCart[0]);

        // Tạo một mảng chứa dữ liệu của từng hàng trong bảng
        const rows = listCart.map(item => Object.values(item));

        doc.autoTable({
            head: [columns],
            body: rows,
        });

        doc.save('table.pdf');
    };

    function formatNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    const changeDes = (event) => {
        setDes(event);
    }
    const changeAddress = (event) => {
        setAddress(event);
    }
    const changePhone = (event) => {
        setPhone(event);
    }
    const handleCheckboxChange = () => {
        setUseAccountAddress(!useAccountAddress);
        setAddress("")
        setDes("")
        setPhone("")
    };
    const handleCheckboxChangePDF = () => {
        setPrintPDF(!printPDF);
    };


    function formatNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    return (
        <>

            {isLogin ? (
                <>
                    <HeaderIsLogin props={flag}/>
                </>
            ) : <Header props={flag}/>
            }
            <div>
                <div
                    id="wd-shoes-scofiled"
                    className="template-cart  position-cart-loop-right"
                    data-template="cart"
                >
                    <section id="cart-template" className="cart-page">
                        <div className="container">
                            <div className="d-flex row-left-list">
                                <div className="col-xs-12 col-lg-9 col-md-8 col-sm-7 mg-top-15  pd-right-0">
                                    <div className="bg-while">
                                        <div className="cart-title">
                                            <h2>Giỏ hàng:</h2>
                                            <span className="cart-count">
                  <span className="cart-counter">{listCart.length} </span>
                  <span className="cart-item-title">Sản phẩm</span>
                </span>
                                        </div>
                                        {listCart.length !== 0 ? <div>
                                            {listCart.map((cart) => (
                                                <>
                                                    <div className="item-wrap" id="cart-page-result">
                                                        <ul className="cart-wrap" data-line={1}>
                                                            <li className="item-info">
                                                                <div className="item-img">
                                                                    <img
                                                                        src={cart.motobikeAccessory.img}
                                                                    />
                                                                </div>
                                                                <div className="item-title">
                                                                    {/*<a>*/}
                                                                    {/*    {cart.motobikeAccessory.name}*/}
                                                                    {/*</a>*/}
                                                                    <Link
                                                                        to={`/detail/${cart.motobikeAccessory.id}`}>    {cart.motobikeAccessory.name}</Link>
                                                                    <h5>Số lượng
                                                                        : {cart.motobikeAccessory.quantity}</h5>
                                                                    {/*<a onClick={() => {*/}
                                                                    {/*    back(`//1`)*/}
                                                                    {/*}}>*/}
                                                                    {/*    Giỏ hàng*/}
                                                                    {/*</a>*/}
                                                                </div>
                                                            </li>
                                                            <li className="item-qty">
                                                                <div className="quantity-area">
                                                                    {cart.quantity >= 2 &&
                                                                        <button
                                                                            onClick={() => {
                                                                                updateQuantity(cart.quantity - 1, cart.id);
                                                                                setAmount();
                                                                                setFlag(true);
                                                                                // eslint-disable-next-line no-restricted-globals

                                                                            }}
                                                                            className="qty-btn btn-left-quantity"
                                                                        >-
                                                                        </button>
                                                                    }
                                                                    <input
                                                                        placeholder={cart.quantity}
                                                                        className="quantity-selector quantity-mini"
                                                                    />
                                                                    <button
                                                                        onClick={() => {
                                                                            if (cart.motobikeAccessory.quantity >= cart.quantity + 1) {
                                                                                updateQuantity(cart.quantity + 1, cart.id);
                                                                                setAmount();
                                                                                setFlag(true);
                                                                                // eslint-disable-next-line no-restricted-globals
                                                                            } else {
                                                                                Swal.fire({
                                                                                    title: "Số lượng hiện tại không đủ !",
                                                                                    icon: "error"
                                                                                });
                                                                            }
                                                                        }
                                                                        }

                                                                        className="qty-btn btn-left-quantity"
                                                                    >+
                                                                    </button>
                                                                </div>
                                                                <div className="item-remove">
                                                                <span className="remove-wrap">
                                                                <a onClick={() => {
                                                                    alert(cart)
                                                                }}>Xoá
                                                        </a>
                                                    </span>
                                                                </div>
                                                            </li>
                                                            <li className="item-price">
                                        <span className="amount full-price">
                                        <span className="money">{formatNumber(cart.motobikeAccessory.price)} đ
                                </span>
                            </span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </>
                                            ))}
                                        </div> : <div>
                                            <div className="bg-while">
                                                <div className="item-wrap" id="cart-page-result">
                                                    <p className="no-item-cart">
                                                        Giỏ hàng của bạn đang trống. Mời bạn mua thêm sản phẩm{" "}
                                                        <a href="/all">tại đây.</a>
                                                    </p>
                                                </div>
                                            </div>

                                        </div>
                                        }

                                    </div>
                                </div>
                                <div className="col-xs-12 col-lg-3 col-md-4 col-sm-5 mg-top-15  pd-right-0">
                                    <div className="bg-while sidebar-checkout">
                                        <div className="sidebar-order-wrap">
                                            <div className="order_title">
                                                <h4>Thông tin đơn hàng</h4>
                                            </div>
                                            <div className="order_total">
                                                <p>
                                                    Tổng tiền:
                                                    <span
                                                        className="total-price">{formatNumber(totalAmount)} đ</span>
                                                </p>
                                            </div>
                                            <div className="order_text">
                                                <p></p>
                                            </div>
                                            <div className="check-bill">
                                                <div className="checkbox d-flex d-flex-center">
                                                    <input
                                                        type="checkbox"
                                                        id="checkbox-bill"
                                                        defaultValue="yes"
                                                        className="regular-checkbox"
                                                        checked={printPDF}
                                                        onChange={handleCheckboxChangePDF}
                                                    />
                                                    <label htmlFor="checkbox-bill" className="title">
                                                        Xuất hoá đơn
                                                    </label>
                                                </div>
                                                <div className="checkbox d-flex d-flex-center">
                                                    <input
                                                        type="checkbox"
                                                        id="checkbox-bill1"
                                                        defaultValue="yes"
                                                        className="regular-checkbox"
                                                        checked={useAccountAddress}
                                                        onChange={handleCheckboxChange}
                                                    />
                                                    <label htmlFor="checkbox-bill1" className="title">
                                                        Sử dụng địa chỉ trên tài khoản
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="checkout-buttons clearfix">
                                                {!useAccountAddress && (
                                                    <div>
                                                        <label className="note-label">
                                                            Thông tin nhận hàng
                                                        </label>
                                                        <textarea
                                                            className="form-control"
                                                            rows={1}
                                                            placeholder="Địa chỉ"
                                                            defaultValue={""}
                                                            onChange={(event) => {
                                                                changeAddress(event.target.value);
                                                            }
                                                            }
                                                        /> <textarea
                                                        className="form-control"
                                                        rows={1}
                                                        placeholder="Số điện thoại"
                                                        defaultValue={""}
                                                        onChange={(event) => {
                                                            changePhone(event.target.value);
                                                        }
                                                        }
                                                    />
                                                    </div>
                                                )}
                                                <label htmlFor="note" className="note-label">
                                                    Ghi chú đơn hàng
                                                </label>
                                                <textarea
                                                    className="form-control"
                                                    id="note"
                                                    name="note"
                                                    rows={4}
                                                    placeholder="Ghi chú"
                                                    defaultValue={""}
                                                    onChange={(event) => {
                                                        changeDes(event.target.value);
                                                    }
                                                    }
                                                />
                                            </div>
                                            <div className="order_action">
                                                {listCart.length > 0 &&
                                                    <>
                                                        <a onClick={() => {
                                                            backToPayment()
                                                        }}
                                                           className="btncart-checkout text-center"
                                                        >
                                                            THANH TOÁN NGAY
                                                        </a>
                                                        <a style={{marginLeft: "30%"}}>Hoặc bạn có thể</a>
                                                        <a onClick={() => {
                                                            cod()
                                                        }}
                                                           className="btncart-checkout text-center"
                                                        >
                                                            NHẬN HÀNG RỒI THANH TOÁN
                                                        </a>
                                                    </>}
                                                <p className="link-continue text-center">
                                                    <a href="/showAccessary/Home">
                                                        <i className="fa fa-reply"/> Tiếp tục mua hàng
                                                    </a>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <div style={{marginTop: "6%"}}>
                <Footer/>
            </div>
        </>
    )
}