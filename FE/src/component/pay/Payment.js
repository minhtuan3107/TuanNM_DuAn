import Header from "../header_footer/Header";
import Footer from "../header_footer/Footer";
import {useEffect, useState} from "react";
import {getListCart, getTotalAmount} from "../../service/CartService";
import {useParams} from "react-router-dom";
import axios from "axios";
import '../css/Payment.css'

export default function Payment() {
    const [listCart, setListCart] = useState([]);
    const {id} = useParams();
    const [totalAmount, setTotalAmount] = useState(0)
    useEffect(() => {
        const list = async () => {
            const data = await getListCart(id);
            setListCart(data);
            const price = await getTotalAmount(id);
            setTotalAmount(price);
        }
        list();
        console.log(listCart)
        console.log(totalAmount)
    }, []);

    function formatNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    return (
        <>
            <div>
                <Header/>
            </div>
            <div>
                <main>
                    <div id="template-account" className="mg-top-50">
                        <div className="cloud x1"/>
                        <div className="cloud x2"/>
                        <div className="cloud x3"/>
                        <div className="cloud x4"/>
                        <div className="cloud x5"/>
                        <div className="container">
                            <div className="row d-flex">
                                <div className="col-xs-12 col-sm-3 col-md-3 sidebar-account mg-bottom-15  item-left">
                                    <div className="AccountSidebar border-10-radius">
                                        <div className="account-left-header">
                                            <div className="user-account">
                                                <div className="user-acc-logo" data-color="T">
                                                    T
                                                </div>
                                                <div className="user-account">
                                                    <h4 className="user-account-name">Tuan</h4>
                                                    <div className="user-account-email">tn989993@gmail.com</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="AccountContent ">
                                            <h4>Địa chỉ:</h4>
                                            <h4>Số điện thoại:</h4>
                                            <input style={{width: "100%"}} type={"text"} placeholder={"Ghi chú"}/>
                                            <button class="button-5" role="button">
                                                Đặt hàng ngay
                                            </button>  <button class="button-5" role="button">
                                                Thanh toán qua paypal
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-9 col-md-9 item-right mg-bottom-15">
                                    <div className="bg-while pd-15 border-10-radius">
                                        <div className="row">
                                            <div className="col-xs-12" id="customer_sidebar">
                                                <h1 className="title-detail h3">Thông tin đơn hàng</h1>
                                                {listCart.map((cart) => (
                                                    <div className="item-wrap" id="cart-page-result">
                                                        <ul className="cart-wrap" data-line={1}>
                                                            <li className="item-info">
                                                                <div className="item-img">
                                                                    <a href="/products/bugi-ngk-chinh-hang-nhap-khau-thai-lan-hop-10-cai">
                                                                        <img
                                                                            src={cart.motobikeAccessory.img}
                                                                        />
                                                                    </a>
                                                                </div>
                                                                <div className="item-title">
                                                                    <a>
                                                                        {cart.motobikeAccessory.name}
                                                                    </a>
                                                                    <h4>Số lượng: {cart.quantity}</h4>
                                                                    <div className="d-flex group-item-option">
                                                                        <span className="item-option">
                          <span className="item-price">
                          </span>
                        </span>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li className="item-qty">
                                                                <div className="quantity-area">

                                                                </div>
                                                                <div className="item-remove">
                                                                </div>
                                                            </li>
                                                            <li className="item-price">
                    <span className="amount full-price">
                      <span className="money">{formatNumber(cart.motobikeAccessory.price)} đ</span>
                    </span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                ))}
                                                <div className="item-wrap" id="cart-page-result">
                                                    <ul className="cart-wrap" data-line={1}>
                                                        <li className="item-info">
                                                            <div className="item-img">
                                                                <a href="/products/bugi-ngk-chinh-hang-nhap-khau-thai-lan-hop-10-cai">

                                                                </a>
                                                            </div>
                                                            <div className="item-title">
                                                                <h3>
                                                                    Tổng tiền
                                                                </h3>
                                                                <div className="d-flex group-item-option">
                                                                        <span className="item-option">
                          <span className="item-price">
                          </span>
                        </span>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li className="item-qty">


                                                        </li>
                                                        <li className="item-price">
                    <span className="amount full-price">
                      <h3 className="money">{formatNumber(totalAmount)} đ</h3>
                    </span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

            </div>
            <div style={{marginTop: "10%"}}>
                <Footer/>
            </div>
        </>
    )
}