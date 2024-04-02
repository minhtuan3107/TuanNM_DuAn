import '../css/style.css'
import Header from "../header_footer/Header";
import Footer from "../header_footer/Footer";
import {useEffect, useState} from "react";
import {getListHot, getListNew} from "../../service/MotobikeAccessoryService";
import {Link, useNavigate} from "react-router-dom";
import {getAll} from "../../service/TypeAccessoryService";
import SweetAlert from "sweetalert";
import axios from "axios";
import HeaderIsLogin from "../header_footer/HeaderIsLogin";

export default function Home() {
    const [listData, setListData] = useState([]);
    const [listDataNew, setListDataNew] = useState([]);
    const navigate = useNavigate();
    const [type, setType] = useState([]);
    const [listHot, setListHot] = useState([]);
    const [isLogin, setIsLogin] = useState(false);
    const [qualityProduct, setQualityProduct] = useState(0);
    const [nameProduct, setNameProduct] = useState("");
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        const getListData = async () => {
            const list = await getListNew();
            const listNew = await getListNew()
            const listType = await getAll();
            const listHot = await getListHot();
            setType(listType);
            setListHot(listHot);
            setListData(list);
            setListDataNew(listNew);
        }
        getListData()
        window.scrollTo(0, 0);
        document.title = "Phụ tùng xe máy"
        const qualityCart = async () => {
            try {
                const idUser = localStorage.getItem("idAccount");
                const qualityProductCart = await axios.get("http://localhost:8080/booking/quantityCart", {
                    params: {
                        idUser: idUser
                    }, headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setQualityProduct(qualityProductCart.data)
            } catch (e) {
                console.log(e)
            }
        }
        const isLogin = localStorage.getItem("isLogin");
        if (isLogin) {
            setIsLogin(true)
            qualityCart();
        }
        ;
    }, []);
    const handleNameSearch = (value) => {
        setNameProduct(value)
    }
    const sendData = (e) => {
        e.preventDefault()
        navigate("/all", {state: {data: nameProduct}})

    }
    const logoutSever = async () => {
        localStorage.clear();

        setIsLogin(false)
        await SweetAlert(
            "Đăng xuất thành công",
            `Cám ơn bạn đã có những trải nghiệm với hệ thống của chúng tôi!`,
            "success"
        );
        navigate("/home")
    }
    const handleViewCart = async () => {
        const idAccount = localStorage.getItem("idAccount")

        navigate("/cart", {
            state: {
                idAccount: idAccount
            }
        })

    }

    function formatNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    const logout = async () => {
        localStorage.clear();

        setIsLogin(false)
        await SweetAlert(
            "Đăng xuất thành công",
            `Cám ơn bạn đã có những trải nghiệm với hệ thống của chúng tôi!`,
            "success"
        );
        navigate("/")
    }
    return (
        <>
            {isLogin ? (
                <HeaderIsLogin/>
            ) : <Header/>}

            <div>
                <main>
                    <section id="home-slider" className=" mg-0-mb">
                        <div className="container pd-0-mb">
                            <div className=" d-flex row-left-list">
                                <div
                                    className="col-md-3 hidden-sm hidden-xs pd-right-0 z-index-high nav-category-group">
                                    <nav className="nav-group">
                                        <ul className="navigation list-menu-nav scroll">
                                            {type.map((t) => (
                                                <li className="mn-item active-nav has-child">
                                                    <a
                                                        onClick={(e) => {
                                                            e.preventDefault()
                                                            navigate("/all", {state: {data: t.name}})

                                                        }}
                                                        className="menu-item__link item-link"
                                                    >
                                                        <img
                                                            width={24}
                                                            height={24}
                                                            src={t.img}
                                                            alt={t.name}
                                                        />
                                                        <span>{t.name}</span>
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </nav>
                                </div>
                                <div className="col-md-9 col-xs-12 col-sm-12 mg-top-15 pd-right-0 mg-top-5-mb">
                                    <div
                                        id="slick-slider-home"
                                        className="slick-callback d-flex-slick"
                                        data-allin={1}
                                        data-slides-md={1}
                                        data-slides-tablet={1}
                                        data-slides-xs={1}
                                        data-slides-md-scroll={1}
                                        data-slides-tablet-scroll={1}
                                        data-slides-xs-scroll={1}
                                        data-dots="true"
                                        data-autoplay="true"
                                        data-infinite="true"
                                        data-custom-arrows="true"
                                        data-fade="true"
                                    >
                                        <div className="item item-owl">
                                            <a
                                            >
                                                <img
                                                    className="dt-width-100 lazyload"
                                                    width={1920}
                                                    height={550}
                                                    src="https://file.hstatic.net/200000298594/file/mst-100pro_4266_x_1600_f213fe615a4f4bdcac726aacbef28bf0_1024x1024.jpg"
                                                />
                                            </a>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section
                        className="section_collection_new pd-top-30"
                        data-include="home-collection-new"
                    >
                        <div className="container">
                            <div className="group-collection-new d-flex row-10">
                                <div className="item-block col-xs-12 col-md-6 col-sm-6">
                                    <div className="bg-color">
                                        <div className="top-head d-flex">
                                            <h2>SẢN PHẨM MỚI</h2>
                                        </div>
                                        <div className="body-col d-flex">
                                            <div className="right-content">
                                                <div
                                                    className="d-flex-slick slick-callback left-dot-15 mg-left--10"
                                                    data-sm={3}
                                                    data-xs={2}
                                                    data-md={3}
                                                    data-slides-md={3}
                                                    data-slides-tablet={2}
                                                    data-slides-xs={2}
                                                    data-slides-md-scroll={1}
                                                    data-slides-tablet-scroll={1}
                                                    data-slides-xs-scroll={1}
                                                    data-dots="true"
                                                    data-autoplay="false"
                                                    data-infinite="false"
                                                    data-custom-arrows="true"
                                                >


                                                    {listDataNew.map((datanew) => (
                                                        <>
                                                            <div className="d-flex-column item-owl pd-left--10">
                                                                <div className="product-block item">
                                                                    <div
                                                                        className="product-img  has-hover"
                                                                    >
                                                                        <img
                                                                            className="lazyload dt-width-100 img-hover hidden-xs"
                                                                            width={260}
                                                                            height={260}
                                                                            src={datanew.img}
                                                                            data-src={datanew.img}
                                                                            data-mobile={datanew.img}
                                                                        />
                                                                        <div
                                                                            className="button-loop-pro hidden-xs hidden-sm">
                                                                            <button
                                                                                className="btn-quickview"
                                                                                type="button"
                                                                            >
                                                                                <img
                                                                                    src="https://file.hstatic.net/200000525917/file/search-icon_61351aaf4f2a4ba0b163434492c75c0d.svg"
                                                                                    width={16}
                                                                                    height={16}
                                                                                    alt="Xem nhanh"
                                                                                />
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                    <div className="product-detail">
                                                                        <h3 className="pro-name">
                                                                            <Link className="image-resize"
                                                                                  to={`/detail/${datanew.id}`}>{datanew.name}</Link>

                                                                        </h3>
                                                                        <div className="box-pro-prices">
                                                                            <p className="pro-price">
                                                                                <span>{formatNumber(datanew.price)}đ </span>

                                                                            </p>
                                                                        </div>
                                                                        <ul className="hash-tag-loop"></ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="item-block col-xs-12 col-md-6 col-sm-6">
                                    <div className="bg-color">
                                        <div className="top-head d-flex">
                                            <h2>SẢN PHẨM BÁN CHẠY</h2>
                                        </div>
                                        <div className="body-col d-flex">
                                            <div className="right-content">
                                                <div
                                                    className="d-flex-slick slick-callback left-dot-15 mg-left--10"
                                                    data-sm={3}
                                                    data-xs={2}
                                                    data-md={3}
                                                    data-slides-md={3}
                                                    data-slides-tablet={2}
                                                    data-slides-xs={2}
                                                    data-slides-md-scroll={1}
                                                    data-slides-tablet-scroll={1}
                                                    data-slides-xs-scroll={1}
                                                    data-dots="true"
                                                    data-autoplay="false"
                                                    data-infinite="false"
                                                    data-custom-arrows="true"
                                                >
                                                    {listHot.map((datanew) => (
                                                        <>
                                                            <div className="d-flex-column item-owl pd-left--10">
                                                                <div className="product-block item">
                                                                    <div
                                                                        className="product-img  has-hover"
                                                                    >
                                                                        <img
                                                                            className="lazyload dt-width-100 img-hover hidden-xs"
                                                                            width={260}
                                                                            height={260}
                                                                            src={datanew.img}
                                                                            data-src={datanew.img}
                                                                            data-mobile={datanew.img}
                                                                        />
                                                                        <div
                                                                            className="button-loop-pro hidden-xs hidden-sm">
                                                                            <button
                                                                                className="btn-quickview"
                                                                                type="button"
                                                                            >
                                                                                <img
                                                                                    src="https://file.hstatic.net/200000525917/file/search-icon_61351aaf4f2a4ba0b163434492c75c0d.svg"
                                                                                    width={16}
                                                                                    height={16}
                                                                                    alt="Xem nhanh"
                                                                                />
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                    <div className="product-detail">
                                                                        <h3 className="pro-name">
                                                                            <Link className="image-resize"
                                                                                  to={`/detail/${datanew.id}`}>{datanew.name}</Link>

                                                                        </h3>
                                                                        <div className="box-pro-prices">
                                                                            <p className="pro-price">
                                                                                <span>{formatNumber(datanew.price)}đ </span>

                                                                            </p>
                                                                        </div>
                                                                        <ul className="hash-tag-loop"></ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </>
                                                    ))}

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section
                        className="section_collection_group pd-top-30"
                        data-include="section-collection-group-1"
                    >
                        <div className="container">
                            <div className="bg-color-while">
                                <div className="wd-top-title d-flex d-flex-center js-between">
                                    <h2 className="title-section">PHỤ TÙNG XE MÁY</h2>

                                </div>
                                <div className="d-flex d-flex-wrap row-left-list">
                                    {listData.map((m) => (
                                        <>
                                            <div
                                                className="d-flex-column mg-bottom-15 mg-bottom-10-mb col-lg-1 col-md-3 col-sm-4 col-xs-6 pd-right-0">
                                                <div className="product-block item loop-border">
                                                    <div
                                                        className="product-img  has-hover"
                                                    >
                                                        <img
                                                            className="lazyload dt-width-100 "
                                                            width={260}
                                                            height={260}
                                                            src={m.img}
                                                        />
                                                    </div>
                                                    <div className="product-detail">
                                                        <h3 className="pro-name">
                                                            <Link className="image-resize"
                                                                  to={`/detail/${m.id}`}>{m.name}</Link>
                                                        </h3>
                                                        <div className="box-pro-prices">
                                                            <p className="pro-price">
                                                                <span>{formatNumber(m.price)}đ </span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
            <div>
                <Footer/>
            </div>
        </>
    )
}