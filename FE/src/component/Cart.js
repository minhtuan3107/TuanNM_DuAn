import Header from "./Header";
import Footer from "./Footer";
import {useEffect, useState} from "react";
import {getListNew} from "./service/MotobikeAccessoryService";
import {Link, useNavigate, useParams} from "react-router-dom";
import {deleteCart, getListCart, getTotalAmount, updateQuantity} from "./service/CartService";
import './modal.css'
import Swal from "sweetalert2";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

import {
    checkQuantityPayment,
    paymentBooking,
    shipCod
} from "./service/BookingService";

export default function Cart() {
    const [listCart, setListCart] = useState([]);
    const {id} = useParams();
    const [quantity, setQuantity] = useState(null);
    const [totalAmount, setTotalAmount] = useState(0);
    const [listProduct, setListProduct] = useState([]);
    const [flag, setFlag] = useState(false);
    const [flag1, setFlag1] = useState(false);
    const back = useNavigate();
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [des, setDes] = useState("");
    const [useAccountAddress, setUseAccountAddress] = useState(true);
    const [printPDF, setPrintPDF] = useState(false);
    useEffect(() => {
        const getListData = async () => {
            const list = await getListCart(id);
            setListCart(list);
            const total = await getTotalAmount(id);
            setTotalAmount(total);
            const listNew = await getListNew()
            setListProduct(listNew);
            console.log(listCart)
        }
        getListData()
        setFlag(false)
        document.title = "Giỏ hàng của bạn"
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
        setAmount()
        setFlag(true)
    }
    const setAmount = async () => {
        const total = await getTotalAmount(id);
        setTotalAmount(total);
    }


    function formatNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    const backToPayment = async () => {
        const paymentBooking1 = paymentBooking(totalAmount, id, des, address, phone).then(url => {
            window.location.href = url;

            console.log(url)
        })
    }

    const cod = async () => {
        if (printPDF) {
            const doc = new jsPDF();
            const tableData = listCart.map(c => [c.id, c.motobikeAccessory.name, c.motobikeAccessory.price]);
            const totalRow = ['Tổng tiền', '', totalAmount];
            tableData.push(totalRow);

            // Tạo bảng
            doc.autoTable({
                head: [['Mã sản phẩm', 'Tên sản phẩm', 'Giá tiền']], // Tiêu đề cột
                body: tableData, // Dữ liệu cho các hàng
                startY: 10, // Vị trí bắt đầu vẽ bảng
            });

            // Lưu file PDF
            doc.save('example.pdf');
        }
        shipCod(totalAmount, id, des, address, phone).then(
            back(`/history/${id}`, {state: {data: "COD"}})
        )
    }
    const confirmShipCod = async () => {
        const data = await checkQuantityPayment(id);
        if (data === "YES") {
            Swal.fire({
                title: "Bạn muốn nhận hàng rồi thanh toán  ?",
                text: "Bạn chắc chắn muốn hàng rồi thanh toán chứ ?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Đồng ý",
                cancelButtonText: "Huỷ"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    checkQuantityPart2();
                }
            });
        } else {
            Swal.fire({
                title: "Số lượng sản phẩm trong kho không đủ  !",
                text: "Số lượng sản phẩm trong kho không đủ vui lòng đặt lại sau",
                icon: "error"
            });
        }
    }
    const checkQuantityPart2 = async () => {
        const data = await checkQuantityPayment(id);
        console.log(data)
        if (data === "YES") {
            Swal.fire({
                title: "Đặt hàng thành công !",
                text: "Vui lòng thanh toán " + totalAmount + " cho shipper",
                icon: "success"
            });
            cod()
        } else {
            Swal.fire({
                title: "Số lượng sản phẩm trong kho không đủ  !",
                text: "Số lượng sản phẩm trong kho không đủ vui lòng đặt lại sau",
                icon: "error"
            });
        }
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
    return (
        <>
            <div>
                <Header props={flag}/>
            </div>
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
                                                                <h5>Số lượng : {cart.motobikeAccessory.quantity}</h5>
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
                                                        </a> <a onClick={() => {
                                                        confirmShipCod()
                                                    }}
                                                                className="btncart-checkout text-center"
                                                    >
                                                        COD
                                                    </a>
                                                    </>}
                                                <p className="link-continue text-center">
                                                    <a href="/home">
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
            <div style={{marginTop: "1%"}}>
                <Footer/>
            </div>

        </>
    )
}