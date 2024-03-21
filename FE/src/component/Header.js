import './style.css'
import {useEffect, useState} from "react";
import {getList, getListNew} from "./service/MotobikeAccessoryService";
import {Link, useNavigate} from "react-router-dom";
import {getListCart} from "./service/CartService";

export default function Header() {
    const [account, setAccount] = useState({})
    const back = useNavigate();
    const [cart, setCart] = useState([])
    useEffect(() => {
        const getListData = async () => {
            const list = await getListCart(1);
            setCart(list);
        }
        console.log(cart)
        getListData()
    }, []);
    return (
        <>
            <header id="header" className="site-header">
                <div id="site-header-center" className="header-top">
                    <div className="container">
                        <div className="row-left-list d-flex d-flex-center row-mb">
                            <div className="logo col-md-3 col-xs-3 col-sm-3 pd-right-0">
                                <a href="/">
                                    <img
                                        className="dt-width-auto logo-shop"
                                        height={50}
                                        width={200}
                                    />
                                </a>
                            </div>
                            <div className="col-md-4 col-xs-7 col-sm-6 pd-right-0">
                                <div className="site_search search-desktop">
                                    <form action="/search" className="wanda-mxm-search">
                                        <div className="search-inner">
                                            <input
                                                name="q"
                                                autoComplete="off"
                                                className="searchinput input-search search-input"
                                                type="text"
                                                size={20}
                                                placeholder="Tất cả sản phẩ"
                                                aria-label="Search"
                                            />
                                        </div>
                                        <button type="submit" className="btn-search" aria-label="Tìm kiếm">
                                            <img
                                                width={24}
                                                height={24}
                                                src="//theme.hstatic.net/200000298594/1001166168/14/search-icon.svg?v=256"
                                                alt="Tìm kiếm"
                                            />
                                        </button>
                                    </form>
                                    <div className="smart-search-wrapper ajaxSearchResults">
                                        <div className="results-seach">
                                            <div className="title-search text-center">Kết quả tìm kiếm</div>
                                            <div className="group-head-smart d-flex">
                                                <span className="title-search-item-parent">Sản phẩm</span>
                                                <a
                                                    className="total-product-result result-total-smart"
                                                    href="/"
                                                />
                                            </div>
                                            <div className="product-result-data padding-15"/>
                                            <div className="group-head-smart  d-flex">
                                                <span className="title-search-item-parent">Bài viết</span>
                                                <a className="total-article-result result-total-smart" href="/">
                                                    Xem tất cả 10 bài viết
                                                </a>
                                            </div>
                                            <div className="article-result-data padding-15"/>
                                        </div>
                                    </div>
                                </div>
                                {" "}
                            </div>
                            <div className="col-md-5 group-icon-header col-xs-2 col-sm-3 pd-right-0 pd-0-mb">
                                <div className="cart-login-search align-items-center">
                                    <ul className="list-inline list-unstyled mb-0 d-flex header-group-icon d-flex-center">
                                        <li className="list-inline-item mr-0 hidden-xs hidden-sm header-hotline">
                                            <a
                                                className="group-icon-item d-flex d-flex-center"
                                                href="tel:1900232434"
                                            >
                <span className="box-icon">
                  <img
                      width={24}
                      height={24}
                      src="https://file.hstatic.net/200000713019/file/phone-call_e079526c31434e4bb169132325cc2600.png"
                      alt="Hotline"
                  />
                </span>
                                                <span className="box-text">
                  Hotline
                  <span className="small-text">1900232434</span>
                </span>
                                            </a>
                                        </li>
                                        <li className="list-inline-item mr-0 hidden-xs hidden-sm header-store">
                                            <div className="list-inline-item-text">
                                                <button className="group-icon-item d-flex d-flex-center">
                                                    <span className="box-arrow">
                    <svg viewBox="0 0 20 9" role="presentation">
                      <path
                          d="M.47108938 9c.2694725-.26871321.57077721-.56867841.90388257-.89986354C3.12384116 6.36134886 5.74788116 3.76338565 9.2467995.30653888c.4145057-.4095171 1.0844277-.40860098 1.4977971.00205122L19.4935156 9H.47108938z"
                          fill="#ffffff"
                      />
                    </svg>
                  </span>
                                                </button>
                                            </div>
                                        </li>
                                        <li className="list-inline-item mr-0 header-account">
                                            <div className="list-inline-item-text">
                                                <button className="group-icon-item d-flex d-flex-center">
                  <span className="box-icon">
                    <img
                        width={24}
                        height={24}
                        src="//theme.hstatic.net/200000298594/1001166168/14/user-account.svg?v=256"
                        alt="Tài khoản"
                    />
                  </span>
                                                    <span className="box-text hidden-xs">
                                                                            <span className="small-text"  onClick={() => {
                                                                                back("/login")
                                                                            }}>
                                                                                Đăng nhập/Đăng ký
                    </span>
                  </span>
                                                    <span className="box-arrow">
                    <svg viewBox="0 0 20 9" role="presentation">
                      <path
                          d="M.47108938 9c.2694725-.26871321.57077721-.56867841.90388257-.89986354C3.12384116 6.36134886 5.74788116 3.76338565 9.2467995.30653888c.4145057-.4095171 1.0844277-.40860098 1.4977971.00205122L19.4935156 9H.47108938z"
                          fill="#ffffff"
                      />
                    </svg>
                  </span>
                                                </button>
                                            </div>
                                        </li>
                                        <li className="list-inline-item mr-0 header-cart">
                                            <div className="list-inline-item-text">
                                                <button className="group-icon-item d-flex d-flex-center">
                  <span className="box-icon">
                    <img
                        width={24}
                        height={24}
                        src="//theme.hstatic.net/200000298594/1001166168/14/shopping-cart.svg?v=256"
                    />
                    <span className="js-number-cart number-cart">{cart.length}</span>
                  </span>
                                                    <span onClick={() => {
                                                        back(`/cart/1`)
                                                    }}>
                                                        Giỏ hàng
                                                    </span>
                                                    <span className="box-arrow">
                    <svg viewBox="0 0 20 9" role="presentation">
                      <path
                          d="M.47108938 9c.2694725-.26871321.57077721-.56867841.90388257-.89986354C3.12384116 6.36134886 5.74788116 3.76338565 9.2467995.30653888c.4145057-.4095171 1.0844277-.40860098 1.4977971.00205122L19.4935156 9H.47108938z"
                          fill="#ffffff"
                      />
                    </svg>
                  </span>
                                                </button>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="header-bottom hidden-sm hidden-xs">
                    <div className="container">
                        <div className="d-flex  d-flex-center row-left-list">
                            <div className="navigation-category col-md-3 pd-right-0 index-tp">
                                <div className="head-title">
                                    <div className="icon">
                                        <img width="24" height="24" alt="Danh mục sản phẩm"
                                             src="https://file.hstatic.net/200000713019/file/category_cc0fade29df84dbdbce905c303557980.png"/>
                                    </div>
                                    <span>Danh mục sản phẩm</span>
                                </div>
                                <div className="group-fixed-nav">
                                    <nav className="nav-group">
                                        <ul className="navigation list-menu-nav scroll">
                                            <li className="mn-item active-nav has-child">
                                                <a href="/collections/phu-tung-xe-may"
                                                   className="menu-item__link item-link" title="Phụ tùng xe máy">
                                                    <img width="24" height="24"
                                                         src="//file.hstatic.net/200000298594/file/phu_tung_9018ecfa8678422badcd7e11f134720c_icon.png"
                                                         alt="Phụ tùng xe máy"/>
                                                    <span>Phụ tùng xe máy</span>
                                                    <i className="float-right arrow-right"></i> </a>
                                                <div className="submenu scroll">
                                                    <div className="view-all visible-xs visible-sm">
                                                        <a href="/collections/phu-tung-xe-may">Xem tất cả »</a>
                                                    </div>
                                                    <ul className="submenu__list">
                                                        <li className="item-lv1 no-bold">
                                                            <a href="/collections/bom-xang-kim-phun"
                                                               className=" item-link">Hệ thống bơm xăng</a>
                                                        </li>
                                                        <li className="item-lv1 no-bold">
                                                            <a href="/collections/kim-phun" className=" item-link">Kim
                                                                phun</a>
                                                        </li>
                                                        <li className="item-lv1 no-bold">
                                                            <a href="/collections/danh-lua-1" className=" item-link">Đánh
                                                                lửa</a>
                                                        </li>
                                                        <li className="item-lv1 no-bold">
                                                            <a href="/collections/phuoc-sau-xe-may"
                                                               className=" item-link">Giảm xóc</a>
                                                        </li>
                                                        <li className="item-lv1 no-bold">
                                                            <a href="/collections/truyen-dong" className=" item-link">Truyền
                                                                động</a>
                                                        </li>
                                                        <li className="item-lv1 no-bold">
                                                            <a href="/" className=" item-link">Phanh - Thắng</a>
                                                        </li>
                                                        <li className="item-lv1 no-bold">
                                                            <a href="/collections/cam-bien-ecu" className=" item-link">Cảm
                                                                biến - ECU</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </li>
                                            <li className="mn-item  has-child">
                                                <a href="/collections/noi-tay-ga" className="menu-item__link item-link"
                                                   title="Nồi xe tay ga">
                                                    <img width="24" height="24"
                                                         src="//file.hstatic.net/200000298594/file/bxc_cc30820d9a8143fabe8ac5b1a71b3f84_icon.png"
                                                         alt="Nồi xe tay ga"/>
                                                    <span>Nồi xe tay ga</span>
                                                    <i className="float-right arrow-right"></i> </a>
                                                <div className="submenu scroll">
                                                    <div className="view-all visible-xs visible-sm">
                                                        <a href="/collections/noi-tay-ga">Xem tất cả »</a>
                                                    </div>
                                                    <ul className="submenu__list">
                                                        <li className="item-lv1 no-bold">
                                                            <a href="/collections/bo-3-cang-1" className=" item-link">Bố
                                                                3 càng</a>
                                                        </li>
                                                        <li className="item-lv1 no-bold">
                                                            <a href="/collections/chen-bi-canh-quat"
                                                               className=" item-link">Chén bi - Cánh quạt</a>
                                                        </li>
                                                        <li className="item-lv1 no-bold">
                                                            <a href="/collections/chuong-noi-1" className=" item-link">Chuông
                                                                nồi</a>
                                                        </li>
                                                        <li className="item-lv1 no-bold">
                                                            <a href="/collections/day-curoa" className=" item-link">Dây
                                                                curoa</a>
                                                        </li>
                                                        <li className="item-lv1 no-bold">
                                                            <a href="/collections/cum-pully" className=" item-link">Cụm
                                                                pulley</a>
                                                        </li>
                                                        <li className="item-lv1 no-bold">
                                                            <a href="/collections/phu-tung-noi-khac"
                                                               className=" item-link">Phụ tùng nồi khác</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </li>
                                            <li className="mn-item  ">
                                                <a href="/collections/phu-tung-binh-xang-con"
                                                   className="menu-item__link item-link" title="Bình xăng con">
                                                    <img width="24" height="24"
                                                         src="//file.hstatic.net/200000298594/file/dung_cu_06cae33c273247b4b3e80fc448487995_icon.png"
                                                         alt="Bình xăng con"/>
                                                    <span>Bình xăng con</span>
                                                </a>
                                            </li>
                                            <li className="mn-item  ">
                                                <a href="/collections/thiet-bi-chuyen-dung"
                                                   className="menu-item__link item-link" title="Thiết bị chuyên dụng">
                                                    <img width="24" height="24"
                                                         src="//file.hstatic.net/200000298594/file/thiet_bi_ffa65a98841549e7940961a9d5e12a3b_icon.png"
                                                         alt="Thiết bị chuyên dụng"/>
                                                    <span>Thiết bị chuyên dụng</span>
                                                </a>
                                            </li>
                                            <li className="mn-item  ">
                                                <a href="/collections/dung-cu-sua-chua"
                                                   className="menu-item__link item-link" title="Dụng cụ sửa chữa">
                                                    <img width="24" height="24"
                                                         src="//file.hstatic.net/200000298594/file/phu_gia_f07fd397766941a79c3c0309ec0baf66_icon.png"
                                                         alt="Dụng cụ sửa chữa"/>
                                                    <span>Dụng cụ sửa chữa</span>
                                                </a>
                                            </li>
                                            <li className="mn-item  ">
                                                <a href="/collections/phu-kien" className="menu-item__link item-link"
                                                   title="Phụ kiện xe máy">
                                                    <img width="24" height="24"
                                                         src="//file.hstatic.net/200000298594/file/cap_giac_4b15ff58864d489195af3d561f9ed551_icon.png"
                                                         alt="Phụ kiện xe máy"/>
                                                    <span>Phụ kiện xe máy</span>
                                                </a>
                                            </li>
                                            <li className="mn-item  ">
                                                <a href="/collections/all-cac-loai-day-cap"
                                                   className="menu-item__link item-link" title="Dây - Giắc - Cáp">
                                                    <img width="24" height="24"
                                                         src="//file.hstatic.net/1000379792/file/menu_icon_7_a02858a8641a46369f111c440e4c275f_icon.png"
                                                         alt="Dây - Giắc - Cáp"/>
                                                    <span>Dây - Giắc - Cáp</span>
                                                </a>
                                            </li>
                                            <li className="mn-item  ">
                                                <a href="/collections/phu-gia-tay-rua"
                                                   className="menu-item__link item-link" title="Phụ gia - Tẩy rửa">
                                                    <img width="24" height="24"
                                                         src="//file.hstatic.net/200000713019/file/phone_d1c9c71a288d46adaa57da8bee5320f1_icon.png"
                                                         alt="Phụ gia - Tẩy rửa"/>
                                                    <span>Phụ gia - Tẩy rửa</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                            <div className="sticky-overlay"></div>
                            <nav className="site-nav-menu col-md-9 pd-right-0">
                                <ul className="d-flex">
                                    <li className="active">
                                        <a href="/home"><span className="icon"><img width="25" height="25"
                                                                                src="//file.hstatic.net/200000298594/file/icon_89044cfa750547c583fec2ab4a4bbf81_icon.png"/></span>Trang chủ</a>
                                    </li>
                                    <li className="">
                                        <a href="/collections/all"><span className="icon"><img width="25" height="25"
                                                                                               src="//file.hstatic.net/200000298594/file/icon_2_f022897d2c6e4c6e9d20d4e5938783f2_icon.png"
                                                                                              /></span>Tất
                                            cả sản phẩm</a>
                                    </li>

                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>

        </>
    )
}