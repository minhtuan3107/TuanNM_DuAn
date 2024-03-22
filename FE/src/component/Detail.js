import Header from "./Header";
import Footer from "./Footer";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {findById} from "./service/MotobikeAccessoryService";
import {addToCard, getListCart} from "./service/CartService";
import {ToastContainer, toast, Bounce} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Detail() {
    const {id} = useParams();
    const [data, setData] = useState({});
    const back = useNavigate();
    const [flag, setFlag] = useState(false);
    useEffect(() => {
        const run = async () => {
            const list = await findById(id);
            setData(list);
        }
        run()
    }, [flag]);
    const notify = () => toast.success('Thêm vào giỏ hàng thành công!', {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        // closeOnClick: true,
        // pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    });


    function formatNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    return (
        <>
            <div>
                <Header props={flag}/>
            </div>
            <div>
                <main>
                    <section id="product-template" className="product-page">
                        <div className="container">
                            <div className="row-left-list d-flex">
                                <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12 order-mb-3 pd-right-0">
                                    <div className="bg-while height-100">
                                        <div className="d-flex row-left-list">
                                            <div
                                                className="col-lg-6 col-md-6 col-sm-6 col-xs-12 order-mb-1 gallery-product-template pd-right-0">
                                                <div className="d-flex-wrap d-flex sticky-gallery">
                                                    <div
                                                        id="sl-product-thumb"
                                                        className="product-thumb hidden-xs"
                                                        data-widththumb="false"
                                                    >
                                                        <div
                                                            id="slider-thumb"
                                                            className="slider-mobile d-flex-slick"
                                                            data-lg={6}
                                                            data-md={6}
                                                            data-sm={5}
                                                            data-vertical="false"
                                                        >
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="product-gallery d-flex-slick"
                                                        data-allin={1}
                                                        data-widthgallery="false"
                                                    >
                                                        <div
                                                            className="item item-owl"
                                                            data-pos={0}>
                                                            <img
                                                                className="product-image-feature dt-width-100 lazyload"
                                                                src={data.img}
                                                                data-src={data.img}
                                                                width={600}
                                                                height={600}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 order-mb-2 pd-right-0">
                                                <div className="product-content">
                                                    <div className="pro-content-head clearfix">
                                                        <div className="head-product-title">
                                                            <h1 data-available="Còn hàng" className="green">
                                                                {data.name}
                                                            </h1>
                                                        </div>
                                                        <div className="d-flex product-info">
                                                            <div className="pro-type">
                                                                <h3>Giá: {data.price > 1 ? formatNumber(data.price) : "Đang cập nhật"} đ</h3>

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="bg-countdown-product"
                                                        data-id={1031533755}
                                                        data-stock-max={40}
                                                        data-available="true"
                                                        data-sold-quantity=""
                                                    >
                                                    </div>
                                                </div>
                                                <form
                                                    id="add-item-form"
                                                    action="/cart/add"
                                                    method="post"
                                                    className="variants clearfix"
                                                >
                                                    <div className="select hidden">
                                                        <select id="product-select" name="id">
                                                            <option
                                                                value={1069077992}
                                                                data-available="true"
                                                                data-variant="Default Title"
                                                            >
                                                                Số lượng
                                                            </option>
                                                        </select>
                                                    </div>
                                                    <div className="row">
                                                        <div
                                                            className="select-swatch clearfix col-xs-12 col-md-12 col-sm-12">
                                                            <div
                                                                id="variant-swatch-0"
                                                                className="swatch clearfix type-image"
                                                                data-option="option1"
                                                                data-option-index={0}
                                                            >

                                                                <div className="select-swap">
                                                                    <div
                                                                        data-value="Default Title"
                                                                        className="n-sd swatch-element default-title  "
                                                                    >
                                                                        <input
                                                                            className="variant-0 "
                                                                            id="swatch-0-default-title"
                                                                            type="radio"
                                                                            name="option1"
                                                                            defaultValue="Default Title"
                                                                            data-vhandle="default-title"
                                                                            defaultChecked=""
                                                                        />
                                                                        <label htmlFor="swatch-0-default-title">
                                                                            <span>Số lượng: {data.quantity}</span>
                                                                            <img
                                                                                className="img-check"
                                                                                width={12}
                                                                                height={12}
                                                                                src="https://file.hstatic.net/200000525917/file/select-pro_e3e51c75e13340c1805618324bab59f0.png"
                                                                            />
                                                                        </label>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div
                                                            className="col-xs-12 selector-actions d-flex d-flex-center">
                                                            <div className="quantity-area">
                                                                <input
                                                                    type="button"
                                                                    defaultValue="–"
                                                                    onClick="window.wd.scofield.minusQuantity($(this))"
                                                                    className="qty-btn qtyminus"
                                                                />
                                                                <input
                                                                    type="text"
                                                                    id="quantity"
                                                                    name="quantity"
                                                                    defaultValue={1}
                                                                    min={1}
                                                                    className="quantity-selector"
                                                                />
                                                                <input
                                                                    type="button"
                                                                    defaultValue="+"
                                                                    onClick="window.wd.scofield.plusQuantity($(this))"
                                                                    className="qty-btn qtyplus"
                                                                />
                                                            </div>
                                                        </div>

                                                        <div
                                                            className="col-xs-12 selector-actions d-flex d-flex-center pd-top-10">
                                                            <div className="wrap-addcart">
                                                                <button
                                                                    type="button"
                                                                    id="add-to-cart"
                                                                    className="flex-addcart-mb  add-to-cart-style"
                                                                    name="add"
                                                                    onClick={() => {
                                                                        addToCard(1, data.id)
                                                                        notify()
                                                                        setFlag(true)
                                                                    }}
                                                                >
                                                                    <strong> Thêm vào giỏ </strong>
                                                                    <span>Giao Tận Nơi </span>
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    id="buynow-combo"
                                                                    className="flex-addcart-mb mg-top-10  add-to-combo-style hidden"
                                                                    name="add"
                                                                >
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="col-lg-3 col-md-3 col-sm-12 col-xs-12 order-mb-3 pd-right-0 mg-top-15-sm-xs">
                                    <div className="bg-while height-100">
                                        <div className="service-product">
                                            <div className="head-title">CHÍNH SÁCH CỬA HÀNG</div>
                                            <ul>
                                                <li className="item">
                                                    <img
                                                        width={25}
                                                        height={25}
                                                        src="https://file.hstatic.net/200000298594/file/icon_89044cfa750547c583fec2ab4a4bbf81.png"
                                                        alt="Nhận hàng, kiểm hàng và thanh toán"
                                                    />
                                                    <span className="content">
                    Nhận hàng, kiểm hàng và thanh toán
                  </span>
                                                </li>
                                                <li className="item">
                                                    <img
                                                        width={25}
                                                        height={25}
                                                        src="https://file.hstatic.net/200000298594/file/icon_2_f022897d2c6e4c6e9d20d4e5938783f2.png"
                                                        alt="Sản phẩm bảo đảm chất lượng."
                                                    />
                                                    <span className="content">Sản phẩm bảo đảm chất lượng.</span>
                                                </li>
                                                <li className="item">
                                                    <img
                                                        width={25}
                                                        height={25}
                                                        src="https://file.hstatic.net/200000298594/file/icon3_2e61acc2061444f5bcd95acfefb95f89.png"
                                                        alt=" Hỗ trợ 24/7"
                                                    />
                                                    <span className="content"> Hỗ trợ 24/7</span>
                                                </li>
                                                <li className="item">
                                                    <img
                                                        width={25}
                                                        height={25}
                                                        src="https://file.hstatic.net/200000298594/file/icon4_63e44c737ef04b11803bc948bcdcfd0b.png"
                                                        alt="Bao đổi trả 1:1 nếu có lỗi sản phẩm"
                                                    />
                                                    <span className="content">
                    Bao đổi trả 1:1 nếu có lỗi sản phẩm
                  </span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="col-md-9 col-sm-9 col-xs-12 order-mb-3 mg-top-30 mg-top-15-mb pd-right-0">
                                    <div className="bg-while">
                                        <div className="title-head-tab">Mô tả sản phẩm</div>
                                        <div className="product-description-tab">
                                            <div
                                                className="content-entry add-height-img max-height-ct lazyload-addclass">
                                                <div className="more-description">
                                                    <h2 style={{marginTop: 3}}>
                    <span style={{fontSize: "13pt"}}>
                      <span style={{color: "#2e74b5"}}>
                        {data.name}
                      </span>
                    </span>
                                                    </h2>
                                                    <p style={{marginBottom: 11}}>
                    <span style={{fontSize: "11pt"}}>
                     {data.description}
                    </span>
                                                    </p>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>

            </div>
            <div>
                <Footer/>
            </div>
            <ToastContainer/>

        </>
    )
}