import './style.css'
import {useEffect, useState} from "react";
import {getList, getListNew} from "./service/MotobikeAccessoryService";
import {Link, useNavigate} from "react-router-dom";
import {getListCart} from "./service/CartService";
import {Field, Form, Formik} from "formik";

export default function Header(props) {
    const [account, setAccount] = useState({})
    const back = useNavigate();
    const [cart, setCart] = useState(null)
    const [nameProduct, setName] = useState("")
    const [status, setStatus] = useState(false)
    const [roleUser, setRoleUser] = useState("");
    const [userName, setUserName] = useState("");
    const [isLogin, setIsLogin] = useState(false)

    useEffect(() => {
        getListData();
    }, [props]);
    const getListData = async () => {
        // const list = await getListCart(1);
        // setCart();
    }
    const handleNameSearch = (value) => {
        setName(value)
        console.log(nameProduct)
    }
    const sendData = (e) => {
        e.preventDefault()
        back("/all", {state: {data: nameProduct}})

    }

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
                                                    <span className="box-text hidden-xs">
                                                                            <span className="small-text"
                                                                                  onClick={() => {
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
                                        {/*                      <li className="list-inline-item mr-0 header-cart">*/}
                                        {/*                          <div className="list-inline-item-text">*/}
                                        {/*                              <button className="group-icon-item d-flex d-flex-center">*/}
                                        {/*<span className="box-icon">*/}
                                        {/*  <img*/}
                                        {/*      width={24}*/}
                                        {/*      height={24}*/}
                                        {/*      src="//theme.hstatic.net/200000298594/1001166168/14/shopping-cart.svg?v=256"*/}
                                        {/*  />*/}
                                        {/*  <span className="js-number-cart number-cart">{cart.length}</span>*/}
                                        {/*</span>*/}
                                        {/*                                  <span onClick={() => {*/}
                                        {/*                                      back(`/cart/1`)*/}
                                        {/*                                  }}>*/}
                                        {/*                                      Giỏ hàng*/}
                                        {/*                                  </span>*/}
                                        {/*                                  <span className="box-arrow">*/}
                                        {/*  <svg viewBox="0 0 20 9" role="presentation">*/}
                                        {/*    <path*/}
                                        {/*        d="M.47108938 9c.2694725-.26871321.57077721-.56867841.90388257-.89986354C3.12384116 6.36134886 5.74788116 3.76338565 9.2467995.30653888c.4145057-.4095171 1.0844277-.40860098 1.4977971.00205122L19.4935156 9H.47108938z"*/}
                                        {/*        fill="#ffffff"*/}
                                        {/*    />*/}
                                        {/*  </svg>*/}
                                        {/*</span>*/}
                                        {/*                              </button>*/}
                                        {/*                          </div>*/}
                                        {/*                      </li>*/}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>

        </>
    )
}