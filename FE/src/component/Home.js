import './style.css'
import Header from "./Header";
import Footer from "./Footer";
import {useEffect, useState} from "react";
import {getList, getListNew} from "./service/MotobikeAccessoryService";
import {Link} from "react-router-dom";

export default function Home() {
    const [listData, setListData] = useState([]);
    const [listDataNew, setListDataNew] = useState([]);
    useEffect(() => {
        const getListData = async () => {
            const list = await getListNew();
            const listNew = await getListNew()
            setListData(list);
            setListDataNew(listNew);
        }
        getListData()
        document.title = "Phụ tùng xe máy"
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
                    <section id="home-slider" className=" mg-0-mb">
                        <div className="container pd-0-mb">
                            <div className=" d-flex row-left-list">
                                <div
                                    className="col-md-3 hidden-sm hidden-xs pd-right-0 z-index-high nav-category-group">
                                    <nav className="nav-group">
                                        <ul className="navigation list-menu-nav scroll">
                                            <li className="mn-item active-nav has-child">
                                                <a
                                                    href="/collections/phu-tung-xe-may"
                                                    className="menu-item__link item-link"
                                                    title="Phụ tùng xe máy"
                                                >
                                                    <img
                                                        width={24}
                                                        height={24}
                                                        src="//file.hstatic.net/200000298594/file/phu_tung_9018ecfa8678422badcd7e11f134720c_icon.png"
                                                        alt="Phụ tùng xe máy"
                                                    />
                                                    <span>Phụ tùng xe máy</span>
                                                </a>

                                            </li>
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
                                                href="https://congtyminhphong.vn/products/may-doc-loi-mst100-pro-phien-ban-9-0"
                                                title="slider 1"
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
                                                                            <Link className="image-resize" to={`/detail/${datanew.id}`}>{datanew.name}</Link>

                                                                        </h3>
                                                                        <div
                                                                            className="d-flex js-between d-flex-center">
                                                                            <ul className="list-variants d-flex d-flex-wrap image"></ul>
                                                                        </div>
                                                                        <div className="box-pro-prices">
                                                                            <p className="pro-price">
                                                                                <span>300,000₫ </span>
                                                                                <del
                                                                                    className="compare-price">350,000₫
                                                                                </del>
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
                                                    <div className="d-flex-column item-owl pd-left--10">
                                                        <div className="product-block item">
                                                            <div
                                                                className="product-img  has-hover"
                                                                data-frame="bố 3 càng ba búa 3 càng fcc bố fcc 3 càng bố ba càng côn sau"
                                                            >
                                                                <a
                                                                    href="/products/combo-chuong-exedy-bo-3-cang-honda-dai-hong-tien-cnc"
                                                                    title="COMBO Chuông EXEDY + Bố 3 càng HONDA DÀI - HỒNG (TIỆN CNC)"
                                                                    className="image-resize "
                                                                >
                                                                    <img
                                                                        className="lazyload dt-width-100 img-first"
                                                                        width={260}
                                                                        height={260}
                                                                        src="https://file.hstatic.net/200000397757/file/lazyload_e95df2e69ca44092831654bec491fb77_large.jpg"
                                                                        data-src="//product.hstatic.net/200000298594/product/dai_hong-6_6ed79c8de9614e4d8f5b30ac33e5e776_large.jpg"
                                                                        data-mobile="//product.hstatic.net/200000298594/product/dai_hong-6_6ed79c8de9614e4d8f5b30ac33e5e776_medium.jpg"
                                                                        alt="COMBO Chuông EXEDY + Bố 3 càng HONDA DÀI - HỒNG (TIỆN CNC)"
                                                                    />
                                                                    <img
                                                                        className="lazyload dt-width-100 img-hover hidden-xs"
                                                                        width={260}
                                                                        height={260}
                                                                        src="https://file.hstatic.net/200000397757/file/lazyload_e95df2e69ca44092831654bec491fb77_large.jpg"
                                                                        data-src="//product.hstatic.net/200000298594/product/dai_hong-1_e9977e03224c4076a4a9bb8492d17b2f_large.jpg"
                                                                        data-mobile="//product.hstatic.net/200000298594/product/dai_hong-1_e9977e03224c4076a4a9bb8492d17b2f_large.jpg"
                                                                        alt="COMBO Chuông EXEDY + Bố 3 càng HONDA DÀI - HỒNG (TIỆN CNC)"
                                                                    />
                                                                </a>
                                                                <div className="button-loop-pro hidden-xs hidden-sm">
                                                                    <button
                                                                        className="btn-quickview"
                                                                        onClick="window.wd.scofield.quickview('/products/combo-chuong-exedy-bo-3-cang-honda-dai-hong-tien-cnc?view=quickview-nochoose')"
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
                                                                    <a
                                                                        href="/products/combo-chuong-exedy-bo-3-cang-honda-dai-hong-tien-cnc"
                                                                        title="COMBO Chuông EXEDY + Bố 3 càng HONDA DÀI - HỒNG (TIỆN CNC)"
                                                                    >
                                                                        COMBO Chuông EXEDY + Bố 3 càng HONDA DÀI - HỒNG
                                                                        (TIỆN CNC){" "}
                                                                    </a>
                                                                </h3>
                                                                <div className="d-flex js-between d-flex-center">
                                                                    <ul className="list-variants d-flex d-flex-wrap image"></ul>
                                                                </div>
                                                                <div className="box-pro-prices">
                                                                    <p className="pro-price">
                                                                        <span>120,000₫ </span>
                                                                    </p>
                                                                </div>
                                                                <ul className="hash-tag-loop"></ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex-column item-owl pd-left--10">
                                                        <div className="product-block item">
                                                            <div
                                                                className="product-img  has-hover"
                                                                data-frame="bố 3 càng ba búa 3 càng fcc bố fcc 3 càng bố ba càng côn sau"
                                                            >
                                                                <a
                                                                    href="/products/combo-chuong-exedy-bo-3-cang-honda-dai-hong-tien-cnc"
                                                                    title="COMBO Chuông EXEDY + Bố 3 càng HONDA DÀI - HỒNG (TIỆN CNC)"
                                                                    className="image-resize "
                                                                >
                                                                    <img
                                                                        className="lazyload dt-width-100 img-first"
                                                                        width={260}
                                                                        height={260}
                                                                        src="https://file.hstatic.net/200000397757/file/lazyload_e95df2e69ca44092831654bec491fb77_large.jpg"
                                                                        data-src="//product.hstatic.net/200000298594/product/dai_hong-6_6ed79c8de9614e4d8f5b30ac33e5e776_large.jpg"
                                                                        data-mobile="//product.hstatic.net/200000298594/product/dai_hong-6_6ed79c8de9614e4d8f5b30ac33e5e776_medium.jpg"
                                                                        alt="COMBO Chuông EXEDY + Bố 3 càng HONDA DÀI - HỒNG (TIỆN CNC)"
                                                                    />

                                                                </a>
                                                                <div className="button-loop-pro hidden-xs hidden-sm">
                                                                    <button
                                                                        className="btn-quickview"
                                                                        onClick="window.wd.scofield.quickview('/products/combo-chuong-exedy-bo-3-cang-honda-dai-hong-tien-cnc?view=quickview-nochoose')"
                                                                        type="button"
                                                                    >

                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <div className="product-detail">
                                                                <h3 className="pro-name">
                                                                    <a
                                                                        href="/products/combo-chuong-exedy-bo-3-cang-honda-dai-hong-tien-cnc"
                                                                        title="COMBO Chuông EXEDY + Bố 3 càng HONDA DÀI - HỒNG (TIỆN CNC)"
                                                                    >
                                                                        COMBO Chuông EXEDY + Bố 3 càng HONDA DÀI - HỒNG
                                                                        (TIỆN CNC){" "}
                                                                    </a>
                                                                </h3>
                                                                <div className="d-flex js-between d-flex-center">
                                                                    <ul className="list-variants d-flex d-flex-wrap image"></ul>
                                                                </div>
                                                                <div className="box-pro-prices">
                                                                    <p className="pro-price">
                                                                        <span>120,000₫ </span>
                                                                    </p>
                                                                </div>
                                                                <ul className="hash-tag-loop"></ul>
                                                            </div>
                                                        </div>
                                                    </div>

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
                                                            <Link className="image-resize" to={`/detail/${m.id}`}>{m.name}</Link>

                                                        </h3>
                                                        <div className="d-flex js-between d-flex-center">
                                                            <ul className="list-variants d-flex d-flex-wrap image"></ul>
                                                        </div>
                                                        <div className="box-pro-prices">
                                                            <p className="pro-price">
                                                                <span>{formatNumber(m.price)}đ </span>
                                                            </p>
                                                        </div>
                                                        <ul className="hash-tag-loop"></ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    ))}
                                </div>


                                <div className="text-center btn-view-all-tab">
                                    <a className="btn btn-all-tab" href="/collections/phu-tung-xe-may">
                                    </a>
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