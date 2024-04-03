import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import SweetAlert from "sweetalert";
import axios from "axios";
import findById from "../../service/AccountService";
import {getListCart, getTotalAmount} from "../../service/CartService";

export default function HeaderIsLogin(props) {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(false);
    const [qualityProduct, setQualityProduct] = useState(0);
    const [nameProduct, setNameProduct] = useState("");
    const [flag, setFlag] = useState(0);
    const [account, setAccount] = useState({});
    const [showButton, setShowButton] = useState(false);
    const [listCart, setListCart] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        window.scrollTo(0, 0);
        document.title = "Phụ tùng xe máy"
        const qualityCart = async () => {
            try {
                const idUser = localStorage.getItem("idAccount");
                const getAccount = await findById(idUser);
                if (getAccount.role.name === "ADMIN") {
                    setShowButton(true);
                }
                const qualityProductCart = await axios.get("http://localhost:8080/booking/quantityCart", {
                    params: {
                        idUser: idUser
                    }, headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setQualityProduct(qualityProductCart.data)
                setAccount(getAccount);
            } catch (e) {
                console.log(e)
            }
        }
        const isLogin = localStorage.getItem("isLogin");

        try {
            const getListData = async () => {
                const list = await getListCart(account.id, token);
                setListCart(list);
                const total = await getTotalAmount(account.id);
                setTotalAmount(total);
            }
            getListData();
        } catch (e) {
            navigate("/zxc")
        }
        if (isLogin) {
            setIsLogin(true)
            qualityCart();

        }

    }, [flag, props]);
    useEffect(() => {
        window.scrollTo(0, 0);
        const qualityCart = async () => {
            const token = localStorage.getItem("authToken");
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
        if (isLogin) {
            setIsLogin(true)
            qualityCart();
        }
    }, [props]);
    const backToDetails = () => {
        navigate(`/history/${account.id}`)
    }
    const handleNameSearch = (value) => {
        setNameProduct(value)
    }
    const sendData = (e) => {
        e.preventDefault()
        navigate("/all", {state: {data: nameProduct}})

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
        navigate("/zxc")
    }

    return (
        <>
            <div id="header" className="site-header">
                <div id="site-header-center" className="header-top">
                    <div className="container">
                        <div className="row-left-list d-flex d-flex-center row-mb">
                            <div className="logo col-md-3 col-xs-3 col-sm-3 pd-right-0">
                                <a href="/public">
                                    <img
                                        className="dt-width-auto logo-shop"
                                        height={50}
                                        width={200}

                                    />
                                </a>
                            </div>
                            <div className="col-md-4 col-xs-7 col-sm-6 pd-right-0">
                                <div className="site_search search-desktop">
                                    <form>
                                        <div className="search-inner">
                                            <input
                                                autoComplete="off"
                                                className="searchinput input-search search-input"
                                                type="text"
                                                size={20}
                                                placeholder="Tất cả sản phẩm"
                                                aria-label="Search"
                                                name="name"
                                                id="name"
                                                onChange={(event) => handleNameSearch(event.target.value)}
                                            />
                                        </div>
                                        <button type="submit" onClick={(e) => {
                                            sendData(e)
                                        }} className="btn-search" aria-label="Tìm kiếm">
                                            <img
                                                width={24}
                                                height={24}
                                                src="//theme.hstatic.net/200000298594/1001166168/14/search-icon.svg?v=256"
                                                alt="Tìm kiếm"
                                            />
                                        </button>
                                    </form>

                                </div>
                            </div>
                            <div className="col-md-5 group-icon-header col-xs-2 col-sm-3 pd-right-0 pd-0-mb">
                                <div className="cart-login-search align-items-center">
                                    <ul className="list-inline list-unstyled mb-0 d-flex header-group-icon d-flex-center">
                                        <li className="list-inline-item mr-0 hidden-xs hidden-sm header-hotline">
                                            <a
                                                className="group-icon-item d-flex d-flex-center"
                                                href="tel:0876543332"
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
                  <span className="small-text">0876543332</span>
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
                                                    <span className="small-text"
                                                          onClick={() => {
                                                              setFlag(1)
                                                          }}>
                                                                                Tài khoản của bạn
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
                                          <span className="js-number-cart number-cart">{qualityProduct}</span>
                                        </span>
                                                    <span onClick={() => {
                                                        handleViewCart();
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
                                                {flag === 2 &&
                                                    <div className="header-action_dropdown">
                                                        <div className="header-dropdown_content">
                                                            <div className="overflow-hidden relative-position">
                                                                <div className="account_header text-center">
                                                                    <div className="account_title  h2 heading">Giỏ
                                                                        hàng
                                                                    </div>
                                                                </div>
                                                                <div className="cart-content" id="cart-mini-wanda">
                                                                    <div className="cart-view clearfix">
                                                                        <div className="cart-scroll">
                                                                            <table id="cart-view">
                                                                                <tbody>
                                                                                <tr className="list-item" data-line={1}>
                                                                                    <td className="img">
                                                                                        <a
                                                                                            href="/products/bugi-ngk-chinh-hang-nhap-khau-thai-lan-hop-10-cai"
                                                                                            title="Bugi NGK Chính hãng Nhập khẩu Thái Lan (Hộp 10 cái)"
                                                                                        >
                                                                                            <img
                                                                                                src="//product.hstatic.net/200000298594/product/bugi_ngk-1_30057967d4024ab9a4998fe35a183723_medium.jpg"
                                                                                                alt="Bugi NGK Chính hãng Nhập khẩu Thái Lan (Hộp 10 cái)"
                                                                                            />
                                                                                        </a>
                                                                                    </td>
                                                                                    <td className="item">
                                                                                        <a
                                                                                            className="pro-title-view"
                                                                                            href="/products/bugi-ngk-chinh-hang-nhap-khau-thai-lan-hop-10-cai"
                                                                                            title="Bugi NGK Chính hãng Nhập khẩu Thái Lan (Hộp 10 cái)"
                                                                                        >
                                                                                            Bugi NGK Chính hãng Nhập
                                                                                            khẩu Thái Lan (Hộp 10 cái)
                                                                                        </a>
                                                                                        <span className="variant">
                      Bugi Chân ngắn không điện trở
                    </span>
                                                                                        <div
                                                                                            className="quantity-area-cartmini d-flex d-flex-center">
                                                                                            <input
                                                                                                type="text"
                                                                                                name="quantity_minicart"
                                                                                                defaultValue={1}
                                                                                                min={1}
                                                                                                className="quantity-mini"
                                                                                            />
                                                                                            <span
                                                                                                className="pro-price-view">273,000₫</span>
                                                                                        </div>
                                                                                        <span
                                                                                            className="remove_link remove-cart">
                      <a
                          href="javascript:void(0);"
                          onClick="window.wd.scofield.deletecart(1)"
                      >
                        <i className="fa fa-times"/>
                      </a>
                    </span>
                                                                                    </td>
                                                                                </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                        <span className="line"/>
                                                                        <table className="table-total">
                                                                            <tbody>
                                                                            <tr>
                                                                                <td className="text-left title-total">TỔNG
                                                                                    TIỀN:
                                                                                </td>
                                                                                <td className="text-right"
                                                                                    id="total-view-cart">
                                                                                    273,000₫
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>
                                                                                    <a href="/cart"
                                                                                       className="wanda-cart-url btn">
                                                                                        Xem giỏ hàng
                                                                                    </a>
                                                                                </td>
                                                                                <td>
                                                                                    <a href="/checkout"
                                                                                       className="wanda-checkout-url btn">
                                                                                        Thanh toán
                                                                                    </a>
                                                                                </td>
                                                                            </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {flag === 1 &&
                    <div style={{
                        width: "30%",
                        marginLeft: "55%",
                        position: "absolute",
                        backgroundColor: "white",
                        opacity: "30",
                        visibility: "visible"
                    }}>
                        <div className="header-dropdown_content">
                            <div className="overflow-hidden relative-position">
                                <div id="header-login-toggle" className="site_account_modal translate-left active">
                                    <div className="account_header text-center">
                                        <div className="account_title heading h2">Thông tin tài khoản</div>
                                        <p className="account_legend mg-0">
                                            <label>Tên: </label><strong>{account.fullName}</strong></p>
                                        <p className="account_legend mg-0">
                                            <label>Email: </label><strong>{account.email}</strong></p>
                                        <p className="account_legend mg-0"><label>Số điện
                                            thoại: </label><strong>{account.phoneNumber}</strong></p>
                                        <p
                                            className="account_legend mg-0">
                                        </p>
                                        <div className="account-bottom d-flex">
                                            <div className="item">
                                                <a onClick={backToDetails}>Xem chi tiết</a>
                                            </div>
                                            <div className="item">
                                                <a onClick={logout}>Đăng xuất</a>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>}
                <div className="header-bottom hidden-sm hidden-xs">
                    <div className="container">
                        <div className="d-flex  d-flex-center row-left-list">
                            <nav className="site-nav-menu col-md-9 pd-right-0">
                                <ul className="d-flex">
                                    <li className="active">
                                        <a href="/home"><span className="icon"><img width="25" height="25"
                                                                                    src="//file.hstatic.net/200000298594/file/icon_89044cfa750547c583fec2ab4a4bbf81_icon.png"/></span>Trang
                                            chủ</a>
                                    </li>
                                    <li className="">
                                        <a href="/all"><span className="icon"><img width="25" height="25"
                                                                                   src="//file.hstatic.net/200000298594/file/icon_2_f022897d2c6e4c6e9d20d4e5938783f2_icon.png"
                                        /></span>Tất
                                            cả sản phẩm</a>
                                    </li>
                                    {showButton &&
                                        <li className="">
                                            <a href="/admin"><span className="icon"><img width="25" height="25"
                                                                                         src="//file.hstatic.net/200000298594/file/icon_2_f022897d2c6e4c6e9d20d4e5938783f2_icon.png"
                                            /></span>Quản lý hệ thống</a>
                                        </li>}
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}