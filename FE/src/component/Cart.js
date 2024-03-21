import Header from "./Header";
import Footer from "./Footer";
import {useEffect, useState} from "react";
import {getList, getListNew} from "./service/MotobikeAccessoryService";
import {Link, useNavigate, useParams} from "react-router-dom";
import {getListCart, getTotalAmount} from "./service/CartService";

export default function Cart() {
    const [listCart, setListCart] = useState([]);
    const {id} = useParams();
    const [totalAmount, setTotalAmount] = useState(0);
    const [listProduct, setListProduct] = useState([]);
    const back = useNavigate();
    useEffect(() => {
        const getListData = async () => {
            const list = await getListCart(id);
            setListCart(list);
            const total = await getTotalAmount(id);
            setTotalAmount(total);
            const listNew = await getListNew()
            setListProduct(listNew);
        }
        console.log(totalAmount)
        getListData()
    }, [totalAmount]);

    function formatNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    return (
        <>
            <div>
                <Header/>
            </div>
            <div>
                <div
                    id="wd-shoes-scofiled"
                    className="template-cart  position-cart-loop-right"
                    data-template="cart"
                >
                    <section id="cart-template" className="cart-page">
                        <div className="container">
                            <form action="/cart" method="post" encType="multipart/form-data">
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
                                                                    <a>
                                                                        <img
                                                                            src={cart.motobikeAccessory.img}
                                                                        />
                                                                    </a>
                                                                </div>
                                                                <div className="item-title">
                                                                    {/*<a>*/}
                                                                    {/*    {cart.motobikeAccessory.name}*/}
                                                                    {/*</a>*/}
                                                                    <Link
                                                                        to={`/detail/${cart.motobikeAccessory.id}`}>    {cart.motobikeAccessory.name}</Link>
                                                                    {/*<a onClick={() => {*/}
                                                                    {/*    back(`//1`)*/}
                                                                    {/*}}>*/}
                                                                    {/*    Giỏ hàng*/}
                                                                    {/*</a>*/}
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
                                                                {" "}
                                                                    <input
                                                                        type="button"
                                                                        defaultValue="–"
                                                                        onClick="Wandacart.minusqt_cart($(this))"
                                                                        className="qty-btn btn-left-quantity"
                                                                    />
                                                                    <input
                                                                        type="text"
                                                                        id="updates_1119676455"
                                                                        name="updates[]"
                                                                        defaultValue={1}
                                                                        min={1}
                                                                        data-price={27300000}
                                                                        className="quantity-selector quantity-mini"
                                                                        data-combo=""
                                                                    />
                                                                    <input
                                                                        type="button"
                                                                        defaultValue="+"
                                                                        onClick="Wandacart.plusqt_cart($(this))"
                                                                        className="qty-btn btn-right-quantity"
                                                                    />
                                                                </div>
                                                                <div className="item-remove">
                      <span className="remove-wrap">
                        <a
                        >
                          Xóa
                        </a>
                      </span>
                                                                </div>
                                                            </li>
                                                            <li className="item-price">
                    <span className="amount full-price">
                      <span className="money">{formatNumber(cart.motobikeAccessory.price)} đ</span>
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
                                                        />
                                                        <label htmlFor="checkbox-bill" className="title">
                                                            Xuất hoá đơn
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="checkout-buttons clearfix">
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
                                                    />
                                                </div>
                                                <div className="order_action">
                                                    <button
                                                        className="btncart-checkout text-center"
                                                        name="checkout"
                                                        type="submit"
                                                    >
                                                        THANH TOÁN NGAY
                                                    </button>
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
                            </form>
                        </div>
                    </section>
                </div>
            </div>
            <div>
                <Footer/>
            </div>
        </>
    )
}