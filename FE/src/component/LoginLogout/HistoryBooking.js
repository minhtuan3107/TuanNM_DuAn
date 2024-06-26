import Footer from "../header_footer/Footer";
import {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {detailsBooking, getListBookingByIdAccount} from "../../service/BookingService";
import Swal from "sweetalert2";
import MySwal from "sweetalert2";
import HeaderIsLogin from "../header_footer/HeaderIsLogin";
import findById from "../../service/AccountService";
import ReactPaginate from "react-paginate";
import '../css/pagging.css'
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import axios from "axios";
import {changePassword} from "../../service/AdminService";

export default function HistoryBooking() {
    const [listBooking, setListBooking] = useState([]);
    const [showData, setShowData] = useState(1);
    const location = useLocation();
    const [account, setAccount] = useState({});
    const [totalPages, settotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [showError, setShowError] = useState(null);
    const id = localStorage.getItem("idAccount");
    const [hdPassword, setHdPassword] = useState("");
    const back = useNavigate();
    useEffect(() => {
        const getListData = async () => {
            const list = await getListBookingByIdAccount(0, id);
            const account = await findById(id);
            setListBooking(list.content)
            setAccount(account);
            settotalPages(list.totalPages);
        }
        getListData()
    }, [showData]);

    const handlePassword = async (password) => {
        try {
            const token = localStorage.getItem("authToken");
            const idAccount = id;
            console.log(id)
            console.log(idAccount)
            const result = await axios.get(`http://localhost:8080/account/checkPassword`, {
                params: {
                    idAccount: idAccount,
                    password: password
                }, headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (result.data === true) {
                setShowError(true);
                setHdPassword(password);
            } else {
                setShowError(false);
            }
            console.log(hdPassword);
            console.log(password)
        } catch (error) {
            console.log(error)
        }
    }

    const handlePageClick = async (event) => {
        const selected = event.selected;
        setCurrentPage(selected);
        try {
            const result = await getListBookingByIdAccount(
                event.selected,
                id
            );
            setListBooking(result.content);
            settotalPages(result.totalPages);
            console.log(result.content)
            console.log(result.totalPages)
        } catch (error) {
            console.log(error);
        }
    };
    const formatDate = (dateString) => {
        const timestamp = new Date(dateString);
        const formattedDate = `${timestamp.getDate().toString().padStart(2, '0')}-${(timestamp.getMonth() + 1).toString().padStart(2, '0')}-${timestamp.getFullYear()} ${timestamp.getHours()}:${timestamp.getMinutes()} `;
        return formattedDate;
    };

    function formatNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    const showDetailBooking = async (date) => {
        const booking = await detailsBooking(date, id);

        MySwal.fire({
            title: 'Chi tiết đơn hàng',
            html: `
    <div style="font-weight: bold; text-align: left">
      <p>Địa chỉ nhận hàng: ${booking[0].address}</p>
      <p>Số điện thoại: ${booking[0].phone}</p>
    </div>
    ${booking.map((booking, index) => (
                `<div class="item-wrap" id="cart-page-result-${index}">
         <ul class="cart-wrap" data-line={1}>
           <li class="item-info">
             <div class="item-img">
               <img src="${booking.motobikeAccessory.img}" />
             </div>
             <div class="item-title">
               <h4>${booking.motobikeAccessory.name} </h4>
             </div>
             
           </li>
           <li class="item-price" style="flex: 0 0 40%">
             <span class="amount full-price">
               <span><h4 style="color : #000000">Số lượng ${booking.quantity}</h4></span>
               <br>
               <span>${formatNumber(booking.motobikeAccessory.price)}đ</span>
             </span>
           </li>
         </ul>
       </div>`
            )).join('')}
  `
        });
    };


    return (
        <>
            <div>
                <HeaderIsLogin/>
            </div>
            <div>
                <main>
                    <div id="template-account" className="mg-top-50 pd-bottom-30">
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
                                                    <h4 className="user-account-name">{account.fullName}</h4>
                                                    <div className="user-account-email">{account.email}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="AccountContent ">
                                            <ul>
                                                {showData == 1 &&
                                                    <li className="d-flex d-flex-center mg-bottom-15 active ">
                                                        <a className="d-flex d-flex-center" onClick={() => {
                                                            setShowData(1);
                                                        }}>
                    <span className="icon">
                      <svg
                          width={16}
                          height={16}
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                      >
                        <mask
                            id="mask1"
                            style={{maskType: "alpha"}}
                            maskUnits="userSpaceOnUse"
                            x={0}
                            y={0}
                            width={16}
                            height={16}
                        >
                          <rect width={16} height={16} fill="url(#pattern1)"/>
                        </mask>
                        <g mask="url(#mask1)">
                          <rect x="-2.39999" y={-4} width={20} height={24}/>
                        </g>
                        <defs>
                          <pattern
                              id="pattern1"
                              patternContentUnits="objectBoundingBox"
                              width={1}
                              height={1}
                          >
                            <use
                                xlinkHref="#image1"
                                transform="scale(0.00195312)"
                            />
                          </pattern>
                          <image
                              id="image1"
                              width={512}
                              height={512}
                              xlinkHref="data:image/png;base64,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"
                          />
                        </defs>
                      </svg>
                    </span>
                                                            <span>Thông tin cá nhân</span>
                                                        </a>
                                                    </li>}

                                                {showData == 2 && <li className="d-flex d-flex-center mg-bottom-15  ">
                                                    <a className="d-flex d-flex-center" onClick={() => {
                                                        setShowData(1);
                                                    }}>
                    <span className="icon">
                      <svg
                          width={16}
                          height={16}
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                      >
                        <mask
                            id="mask1"
                            style={{maskType: "alpha"}}
                            maskUnits="userSpaceOnUse"
                            x={0}
                            y={0}
                            width={16}
                            height={16}
                        >
                          <rect width={16} height={16} fill="url(#pattern1)"/>
                        </mask>
                        <g mask="url(#mask1)">
                          <rect x="-2.39999" y={-4} width={20} height={24}/>
                        </g>
                        <defs>
                          <pattern
                              id="pattern1"
                              patternContentUnits="objectBoundingBox"
                              width={1}
                              height={1}
                          >
                            <use
                                xlinkHref="#image1"
                                transform="scale(0.00195312)"
                            />
                          </pattern>
                          <image
                              id="image1"
                              width={512}
                              height={512}
                              xlinkHref="data:image/png;base64,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"
                          />
                        </defs>
                      </svg>
                    </span>
                                                        <span>Thông tin cá nhân</span>
                                                    </a>
                                                </li>
                                                }
                                                {showData == 2 &&
                                                    <li className="d-flex d-flex-center mg-bottom-15 active">
                                                        <a onClick={() => {
                                                            setShowData(2);
                                                        }}
                                                           className="d-flex d-flex-center"
                                                        >
                    <span className="icon">
                      <svg
                          width={16}
                          height={16}
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                      >
                        <mask
                            id="mask2"
                            style={{maskType: "alpha"}}
                            maskUnits="userSpaceOnUse"
                            x={0}
                            y={0}
                            width={16}
                            height={16}
                        >
                          <rect width={16} height={16} fill="url(#pattern2)"/>
                        </mask>
                        <g mask="url(#mask2)">
                          <rect x={-3} y={-2} width={19} height={21}/>
                        </g>
                        <defs>
                          <pattern
                              id="pattern2"
                              patternContentUnits="objectBoundingBox"
                              width={1}
                              height={1}
                          >
                            <use
                                xlinkHref="#image2"
                                transform="scale(0.00195312)"
                            />
                          </pattern>
                          <image
                              id="image2"
                              width={512}
                              height={512}
                              xlinkHref="data:image/png;base64,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"
                          />
                        </defs>
                      </svg>
                    </span>
                                                            <span>Đơn hàng của bạn</span>
                                                        </a>
                                                    </li>}
                                                {showData == 1 && <div>
                                                    <li className="d-flex d-flex-center mg-bottom-15 ">
                                                        <a onClick={() => {
                                                            setShowData(2);
                                                        }}
                                                           className="d-flex d-flex-center"
                                                        >
                    <span className="icon">
                      <svg
                          width={16}
                          height={16}
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                      >
                        <mask
                            id="mask2"
                            style={{maskType: "alpha"}}
                            maskUnits="userSpaceOnUse"
                            x={0}
                            y={0}
                            width={16}
                            height={16}
                        >
                          <rect width={16} height={16} fill="url(#pattern2)"/>
                        </mask>
                        <g mask="url(#mask2)">
                          <rect x={-3} y={-2} width={19} height={21}/>
                        </g>
                        <defs>
                          <pattern
                              id="pattern2"
                              patternContentUnits="objectBoundingBox"
                              width={1}
                              height={1}
                          >
                            <use
                                xlinkHref="#image2"
                                transform="scale(0.00195312)"
                            />
                          </pattern>
                          <image
                              id="image2"
                              width={512}
                              height={512}
                              xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAgAElEQVR4Ae2dB5QuVZW2H7jkKCAgCCggkkFEEXUcdEYRRcUMRkBHERXFNIr+KjoOwTSIEfRnAANBBUFlRnQMqL9iQBAQUQElSM45zr+2q3um+bi3u7/uqlMnPLXWXd3f7e6qU+9+9t7vOV99VeCmAirQggKrAnsARwLfA34P3AzcAJwN/AfwWeDpwIIWBPEcVUAFVEAFVKBWBZYC9gS+A9wN/Pcs/10BHAJsXKswnpcKqIAKqIAK1KhANP69gYtn2fAXZQzuBb4MbFKjSJ6TCqiACqiACtSiwNLAG4BL5tn4Rw1BGIFjgM1qEcrzUAEVUAEVUIEaFFgG2Ae4tOPGvzAjcCyweQ2ieQ4qoAIqoAIqUKoC0fjfBFzWc+MfNQL3AccDW5YqnONWARVQARVQgRIVWBbYF7g8ceNfmBH4GrBViSI6ZhVQARVQARUoRYHlgLcCcZX+aDMe8nWsCJwAPKoUIR2nCqiACqiACpSgQDT+twNXZtb4R01HGIFvANuUIKpjVAEVUAEVUIFcFVge+Gfgqswb/6gRiNcnAdvmKqzjUgEVUAEVUIEcFVgBeCdwdYGNf9QMfBN4bI4iOyYVUAEVUAEVyEWBFYH9gGsqaPyjRuDbwHa5CO04VEAFVEAFVCAHBVYC3gNcW2HjHzUC8cyB7XMQ3TGogAqogAqowFAKRON/L3BdA41/1AjE8wmeMJTwHlcFVEAFVEAFhlBgZeB9wPUNNv5RI/Bd4IlDBMFjqoAKqIAKqEAqBR4E7G/jX+g9DOIRxU9KFQiPowIqoAIqoAIpFFgF+CBwgzP+hTb/qasC3wd2SBEUj6ECKqACKqACfSmwKvAh4EYb/4yNf6oJiO9/CDylr8C4XxVQARVQARXoQ4HVgH8FbrLxj934R43AacA/9hEk96kCKqACKqACXSnwYOBA4GYb/7wb/6gR+Anw1K4C5X5UQAVUQAVUoAsFVgcOBm6x8Xfe+EeNwE+BHbsImvtQARVQARVQgbkqsAbwERt/701/1ATE658BO801cP6dCqiACqiACsxFgTWBjwK3OuMfpPlPNQSnA8+cSxD9GxVQARVQARWYrQIPAT4O3GbjH7zxTzUB8f0vgGfNNpD+ngqogAqogArMRoG1gENs/Nk1/VETEK9/BTxnNkH1d1RABVRABVRgUQqsDRwK3O6Mv4jmP9UQnAHsAiy2qOD6/yqgAiqgAiowqsBDgU8Cd9j4i2v8U01AfP8b4HkagVHEfa0CKqACKjBVgXWBT9v4i2/6oyYgXp8FvEAjMBV3v1cBFVABFVgP+CxwpzP+Kpv/VEPwW+BFGgGTXgVUQAXaVuBhwGE2/uqb/lQDMPn9OcCuwOJtp4BnrwIqoAJtKfBw4HDgLmf8TTb/SRMQX88FdtMItFUAPFsVUIH2FNgA+IKNv/mmP9UATH5/HvBSjUB7RcEzVgEVqFuBDYEjgLud8dv8Z2Dg98DLgQV1p4RnpwIqoAJ1K/AI4Egbv01/hqY/uQow9esfgFdqBOouEJ6dCqhAfQo8EjgKuGcOhX9qE/B7mjcPfwT2AJaoL008IxVQARWoR4GNgS/a+Jtv2n0Ytz8Be2oE6ikWnokKqEAdCmwCfBm41xm/zb9nBi4EXg0sWUfqeBYqoAIqUKYCmwHH2Pht+j03/YWtKFwEvEYjUGbhcNQqoALlKrA5cKyN38Y/QOMfNQN/BvYClio3nRy5CqiACuSvwJbA8cB9GRT+0Ubg67YvGLwY2FsjkH8RcYQqoAJlKvCsiae72WzbbrY5x/8S4PXA0mWmmKNWARVQgXwViOe7vxCIe7nn3AgcW9vxuRR4I7BMvqnkyFRABVSgTAXiIS5x69a4YYvNVg1yZeAy4E0agTKLjKNWARXIW4G4ZWt8Pjs+npVrE3BcxuavwL7Asnmnk6NTARVQgfIUiM9lx9XY8R6sDVcNcmXgcuCtwHLlpZgjVgEVUIG8FYiLr2LJNQptrk3AcRmbK4G3awTyLiaOTgVUoEwFYqk1CuzVGgGNUMYMXAW8A1i+zDRz1CqgAiqQrwIrAO8Brsu4Cbgi4IpAGNV3AsGrmwqogAqoQIcKrAx8ALhJI+CKQMYMXAPsB6zYIfvuSgVUQAVUAFgNOAi4JeMm4IqAKwLXTqxcrWTWqoAKqIAKdKvAGsDHgds1Aq4IZMxAvHX1XkAj0G3+uzcVUAEVYG3g08CdGTcBVwRcEbgeeB8Qb2W5qYAKqIAKdKjAw4AvAHdrBFwRyJiBMAL7Aw/qkH13pQIqoAIqAGwIHO2jhjUBGZuAWBG6AfggsIpZqwIqoAIq0K0CmwDH+ehhjUDmRuBG4EPAqt3i795UQAVUQAW2Ak7MvAl4jYDXCMTHWw+Y+JSLWasCKqACKtChAtsCp2gEXBHInIGbgQOBB3fIvrtSARVQARUAHg98L/Mm4IqAKwJxn4uDgdXNWhVQARVQgW4VeDLwY42AKwKZMxBG4CNA3PfCTQVUQAVUoEMFdgROz7wJuCLgisCtwMeANTtk312pgAqogAoAzwZ+oxFwRSBzBm4D/g14iFmrAiqgAirQnQKLAS8Azsm8Cbgi4IpA3AL7EPjbnTC7ywD3pAIqoAKNK7A48FLgfI2AKwKZMxBG4FDgoY3nrKevAiqgAp0qsADYA7gw8ybgioArAncAnwLW6TQD3JkKqIAKNK7AksBewCUaAVcEMmcgHor1GWDdxnPW01cBFVCBThVYGtgHuDzzJuCKgCsCYQQ+B6zXaQa4MxVQARVoXIFlgbcDV2sEXBHInIG7gMOAhzees56+CqiACnSqwArAu4HrMm8Crgi4IhBG4PPA+p1mgDtTARWYlwLRRHwk6LwkHPyPVwY+AMST3Wy2apAzA3cD/xfYYPCscQAq0LAC0fj3A64BzgV2aliLWk49Hul6EBC3b825CTg24xNG4N+BR9SSfJ6HCpSgwIoTy8bR+EcL8U+AuEe9W9kKxH3bPw7EZ7RHY+xrNcmJgXuAo4CNyk45R68CeSuwEvAe4NpZNIV4Wt32eZ+Oo5uFAmsDnwbiiuycir5jMR6jDIQR+CLwyFlw7a+ogArMUoFo/O+d44Vi3wQeNcvj+Gv5KhAfxYoLsGLZdbTw+lpNcmLgXuBLwCb5ppMjU4H8FYgLw94HXD/Pon8f8FVgs/xP2RHOoMCGwNFAzLZyKvqOxXiMMhBG4CvApjMw7Y9VQAWmKPAg4P0dNP6FJWQs0UUTcStbgZhdHQuEuRuNs6/VJCcGwggEq5uXnXKOXgX6VSAaf3wU7Iaei3osIx/urT77DWaivW8JnNgzLzk1E8dSrrkJs3o8sEWi3PAwKlCEAvEZ/g8O8BnwePhHPAXM54IXgcm0g9wW+LZGwNWQAhgII/A1YKtpifaHKlC5AvGZ7w8N0PhHZ1G3Ah8GVqtc7xZO7/FAfAJkNMa+VpPcGAgj8HVg6xYS03NUgUkFotH+K3BTZoU6xhMrEXHxoVvZCuwAnJYZX7k1IMeThykKIxBvY21Tdso5ehWYXoFo/Adk2PhHC2Hclz7uMLj89KfjTwtQYEfg5xoBV0QKYeAkIN7OclOBahR48MTtXW8uJAknDcGVwFuAZaqJRLsn8izgjML4m+TQr3nM1FPGIe5f8ph209Uzr0GB1YGDK7iv+6XA3sCSNQSl4XNYDHgBcI5GwBWBQhiIC1u3azhnPfUCFYj7uMdFdbU90OUiYE9gQYExccj/q8DiwEuA8wtpAilnnh4rz9WGU7y1+f8msN/lqcCawEeBuKq+5kISjWM3IGaUbuUqEEZuD+DCynmtORdbO7f/BOKTLm4qkI0C0fg/1kDjHy02vwWem00UHMhcFYi3dl4LXKwRqNq4j+Zvya9PBZ44V+D9OxXoQoG4gU48svW2xgvnL4GduhDUfQyqwNLAPsDljfNccmNsbexxz4snDZo1Hrw5BdYCDrHxP2C29GMgPn/uVrYCywJvA67SCDyA8dYabCnn+31rT9lFp4TRx7PZPwHcbmGctjB+1wt2SsB5xjGuALx7jo+hLqVxOM66rlf6AfDkGcn2F1RgDAUeCnzSxj9t019YIY3P8j5qDJ391TwViDtDxkOqbtT4jp0DC8sL/69/0/Ej4B/yTCdHVYoC6wCfAuKhOSbt3DSI23x+1WeCl4L8tOOMZ1ccWOHHW83tueV2CbrF25JPnZZqf6gCIwqsC3zaxt+p6Ylngh8NbDiitS/LUyDucxEXv/pWWL2Ns4TmPs4YfwrEbbHdVGCRCqwHfBa40xl/p81/aqLeDRwOhMlyK1uBuCYmVsjMF43A1BzP+fuf+YmlsotOH6N/GPA5C1lvTX9hBSHeVjkUiI9SupWtQBjnzwNh7hYWa/9PXXJjIB6Q9Yyy087Rz1eBaPyHAXdZuAYr3HHXxLhtcjwp0a1sBeLtnaOAe8ynwfIpt0ab+3h+Aexcdto5+nEVePjEjMXGn8/M5KaJK83jinO3shXYBDgWiAtAc28Ajs8YBQO/Ap5ddto5+pkUWB/4gjP+rIvydcB+wPIzBdOfZ6/AlsAJmoCs800DdH8D9Gtgl+wzywGOpcAGwBG+R1lUIboSeAuwzFiR9pdzVGBbIB7rarNRg1IY+A3wPB94lmM5mf2Y4j3Jf7fxF114LwVeB8QDa9zKVmB7IO4SWUoTcJzG6kzg+RqBsgrPRsCRXoxUVaG9aOLRtfEIW7eyFYjnRZymEagqP2s3S/Hk0xdqBPIuPI+cuNmMVyHX69x/D+xmIuadiLMc3dOA+DhW7c3D86snxmcDLwYWnyXj/loCBTYGvuiMv6lCGo78uQnY8hD9K/As4AyNQFP5W7opOndiIqIR6L8+LPII8XGjLwFxm9nSgXL8c4vhL4GnL5IQf1CKAotNvNcaMyxzQQ1KYeB3wEtdEUhbZjYFvmLjt1BOaRbx0I94b9mtbAViRvUS4PwpsS2lGTjOdo1LvDX5csBrlHqsP5sBx9j4bfzTNIe4yvxxPTLortMoEIV0d+DCaWJtw2234eYa+zCur9AIdFskNp+4s5hL/Sb8bBP/m8CjusXQvQ2gQHz887XAxRoBjX9BDPxxwsAuMUDOVHPILYDjvaWoiT/HxI9b0QY/8ZaRW9kKLA3sA/x1jizM1jj6e04yumTgT8CegEZgjPoTtxD9qo3fxt9RsY+Vo6OBuDGUW9kKLAu8DbiqIza6LPbuS/OwKAYuAF7tDc2mLz5bA1+38dv4eyru8bjaw4F1p8fQnxagwArAu4F4dsSiiq7/rza5MRA3NHuNRuD+FSbeq42Hhvj0MBM2RcLeARwKPOT+GPqqQAXi6ZH7AzdqBDRCBTHw54lrW5YqMOc6G/I2wIk2fhN3oMS9FTgYWK0zot3RUAqsChwI3DIQSymMq8eob4L0l4lnnTRlBB4NnGSi2vgzYeAm4ANAzCbdylZgDeBjwG2ZsGXTrq9p9xHT+JTL64G42LXaLR4LerKJaePPlIF4P3k/YPlqM7CdE1sb+BRwZ6as9dFE3Gf5ZiOefvrG2ozAY4H4XLaAqkEJDFwJ7Ass006/rPZM15u48DMuAC2BPcdonIKBy4A3lV6DtgO+beJZeAplINz467xitwpzsAFwlA8MsxYVVovivhdvBuLjr8VscSvWUwoTWuet814UA3E72j28vWcx9We6gcaTQ+N24n7iyHxfVL7n+P+XA2/J3QisDxxn49dlV8pAPPBjNyCeXOdWtgJxs7H46HGOxd4xGZdFMXDFxI2wsvvUQMyQvOBGcBcFbk3//1tgl7L7n6OfUCA+kfQtjYBGqDAGfgU8I4csXg44ojDxampGnstwpusXwNNzSELHMG8FtgfiSZLmkxqUwkBc2PrOIVck4yrp00wai0bjDPwY2GHeLcgd5KDA31vTrGeF1bO43i5ujZ18+1JhQpXi7BxnmbOQmEHGBbBu5SvwNODn1jfNQCEMhAlYPGXavasQYWymZTbTkuMWN7uK51u4la/AzsAZ1jqNQAEM/EuqdIuLD+IRqyUXacdu/PpkID5mdjywaaqk9Di9KRCf+ng+cLY1z5qfMQNRc8Kw9r59MWMR+izq7lvTMC4DYZSPBuJGNG5lKxBLrPEx0Pg46Lgc+PtqloKBL/SdYnGPbT/uJ8wpYK7pGHHF7mHAun0nqPvvXYEFwO7ABRoBjVBmDFzV9w3LXpvZCdfUJDyX+o3VHcAngDV7b1MeoG8Flpx4pns8yc3cVYNcGHhqn+B/VthNdhmYNwO3AgcDq/WZrO47iQLxCNd4glvctz2XJuA42o3FoX1SH+9nCpcayEA3DNwIfABYuc+kdd9JFIgHtrwNiGVY80MNhmIgenRvW9z9bKgT87hqXysD1wLx0drle8tcd5xKgYjhfsB11kp7xQAMRI/uZYv3vOI9zFqLsOdlbIdm4Epg39KfA95L9SlvpysB+wOxyjM0Vx6/nRhEj45e3fm2kSCbyDKQhIFLgdf1lcidVwZ3OJ0CqwIHALeYO0lyR7MD0as73zYRYAGWgaQMXDjxkbP46Jlb2QqsDnwMuM0cSppDLRqC6NWdbxqAdpaRWkyanM85bj6z65BP/uq8mrS7w7WAT3o/FU1Aj0ZQA9CjuDk3CsdWt0k7C9il3d5Z1ZmvBxwOxE2izFs16JIBDYBJZVGpmIG40vfpVbXDdk8mbhN9JHBPxbx22dzc18xmSQNgMmkAGmDgNCCeYe9WvgIbA8cA8VAXm5wazIcBDYBJZBFpiIFTgceV3wM9A2AL4ASNgPVrHvVLAzAP8ebjvPxbnfuQDJwMbG0brUKBRwPfso5pBObAgAZgDqINWbg9tsahKwZiCfl4oJciUEVrLesktge+az3TCIzBQC+5Hzvtqki5H7WUgX4ZuBc4CoiLzNzKVyCu9fiRNdgeNAsGNACzEMkG1G8DUt889I2PmR0GrFN+D/QMgHjc68+sbxqBaRjQAEwjjo0pj8ZkHNLGIe4R/glgTdtoFQrsDPzaOqcRWAgDGoCFiGLDSdtw1DtPvW8FDgZWq6INtn0SiwHPB8623mkEpjCgAZgiho0oz0ZkXIaNSzylLp5WF0+tcytbgTACuwFxy2jzSg00ACaChUAGZsXAtcC7gHiOvVvZCsRDo3YHLpD9WbFfq1nSAJgATSdArYnd53ldCewLLFN2D3T0wBLAa4CLrYNN1kENgOA3CX6fDbKVfV8K7AUsaSstXoGlgDcCf7UeNlUPNQAC3xTwrTTnlOd54cRyciwru5WtwLLAW4GrrItN1EUNgKA3AXrKhtjqseLCsl2BuNDMrWwF4jqP/YC47qNVnls4bw2AgJvgMtApA2cBu5Td/xz9hALxyY/3A/FJkBYaYmvnqAEQbBNbBnph4BfAjrbSKhRYBTgAuMVc6SVXhjIeGgCBrgrooRLJ4y56hngaEPendytfgdWBjwK3WTerqJsaAEGuAmQb8KIbcC7anApsV34P9AyAtYBPAnHb6Fz4chzjx0IDIMAmsAwkZeBkYGvbaBUKrDvxAKm7zKGkOdSV2dEACG6R4HaVAO5n/FlDF5rdBxwH9FKAqmitZZ1EPEr6SOAe62lR9bSX/IuddlEk3Ic6ykDdDETDOAqIBuJWvgIbA8cA99oDiuiBGgBBLQJUjUDdRiCWkA8D1im/B3oGwBbA14FY6TF389VAAyCgJqgMZMNAXFR2CLCmbbQKBbYBvmV+ZZNfo2ZMAyCc2cI5Cquv851JdB2bW4GDgFWraIOexOOA+BRI15y4v/lpqgEQSpNSBrJlIO5Atz8Qd6RzK1+BuB/E+eZbNvmmARDGbGDUzc/PzdesX9yT/l1A3KPerWwFHjzxNk/NvJZybhoADYAGQAaKYeAK4M3A0mX3QEcPnGDeDZ53GgAhHBzCUtyy48xnheISYC9gSVtpsQpsZe0dvPZqAIRwcAhtrPk01tJicSGwO7Cg2DbY7sCj+ZTGW23j1QAIoUkoA8UzcB6wK7BYu/20uDPXAAxvgDQAFv/ii39trtzzmXthPAt4TnGtsM0BawDmznlXNUIDoAHQAMhAdQycDuzYZl8t5qw1ABqA6gpPV87M/QyfHMag/BicBsRnz93yU0ADMHx+uQLg7E8TJgPVMxB3odsuvx7Y9Ig0ABqA6guPs8jhITcGxmCSgZOArZtuu/mcvAZg+Lx0BcDZnyZMBppiIJ5QdxzQS/HLp79mPxINgAagqcIzOQvx6/DgGwNjcA9wFLBB9q2yzgFqAIbPwV5MsIEdPrA2OGMgA7Nj4C7gc8A6dfbZbM/KPjE7PvvMYw2Ay7+uwsiADAB3TDykZs1sW2ZdA9MAaAAsPDYfGZCBrBi4FTgIWLWufpvd2WgANABZJX6fSy3ue3jYjYExGIeBG4H9gZWya511DEgDMHw++haAsy9NmAzIwDQMXAu8E1iujr6bzVloADQAFp5pCs84sxV/d/hkMgZ1x+AK4M3A0tm00LIHogEYPl9cAbABa8JkQAbGYOASYC9gybL77+Cj1wBoACw8YxQeZ5jDJ4wxMAaTDFwAvBJYMHgrLXMAGoDhc8kVABuwJkwGZGAeDJwHvBhYrMw+PNioNQAaAAvPPArP5EzEr8MnkjEwBmcCzxmsnZZ3YA3A8DnjCoANWBMmAzLQIQOnAzuW14+Tj1gDoAGw8HRYeJyFDp9QxsAYTDLwI+BJydtqOQfUAAyfK64A2IA1YTIgAz0y8B1gu3L6crKRagA0ABaeHgvP5EzEr8MnmjEwBicBWyVrr/kfSAMwfE64AmAD1oTJgAwkYuA+4Digl8Kbf8+/3wg1ABoAC0+iwuMMdPhkMwbGYJKBe4AjgfXv1xLbeqEBGD4fejGiBnb4wE4WGr8aCxnIl4G7gM8B67TV+/92tvaJ4bnUADgDdxVGBmRgYAbuAA4B1mzICGgANAAWnoELj7PD4ZPQGBiDSQZuAQ4CVm3ACGgAhufeFQAbsCZMBmQgMwbepQGQyQRMagASiDzp7v06vOM1BsagBAY0AHKaglMNgAZApy0DMpAZAxoADYAGILOkTBEQj2Hiy4AMaABkIEUdcAVAk+HsTwZkIDMGNAAaAA1AZkmZIiAew8SXARnQAMhAijrgCoAmw9mfDMhAZgxoADQAGoDMkjJFQDyGiS8DMqABkIEUdcAVAE2Gsz8ZkIHMGNAAaAA0AJklZYqAeAwTXwZkQAMgAynqgCsAmgxnfzIgA5kxoAHQAGgAMkvKFAHxGCa+DMiABkAGUtQBVwA0Gc7+ZEAGMmNAA6AB0ABklpQpAuIxTHwZkAENgAykqAOuAGgynP3JgAxkxoAGQAOgAcgsKVMExGOY+DIgAxoAGUhRB1wB0GQ4+5MBGciMAQ2ABkADkFlSpgiIxzDxZUAGNAAykKIOuAKgyXD2JwMykBkDGgANgAYgs6RMERCPYeLLgAxoAGQgRR1wBUCT4exPBmQgMwY0ABoADUBmSZkiIB7DxJcBGdAAyECKOuAKgCbD2Z8MyEBmDGgANAAagMySMkVAPIaJLwMyoAGQgRR1wBUATYazPxmQgcwY0ABoADQAmSVlioB4DBNfBmRAAyADKeqAKwCaDGd/MiADmTGgAdAAaAAyS8oUAfEYJr4MyIAGQAZS1AFXADQZzv5kQAYyY0ADoAHQAGSWlCkC4jFMfBmQAQ2ADKSoA64AaDKc/cmADGTGgAZAA6AByCwpUwTEY5j4MiADGgAZSFEHXAHQZDj7kwEZyIwBDYAGQAOQWVKmCIjHMPFlQAY0ADKQog64AqDJcPYnAzKQGQMaAA2ABiCzpEwREI9h4suADGgAZCBFHXAFQJPh7E8GZCAzBjQAGgANQGZJmSIgHsPElwEZ0ADIQIo64AqAJsPZnwzIQGYMaAA0ABqAzJIyRUA8hokvAzKgAZCBFHXAFQBNhrM/GZCBzBjQAGgANACZJWWKgHgME18GZEADIAMp6oArAJoMZ38yIAOZMaAB0ABoADJLyhQB8RgmvgzIgAZABlLUAVcANBnO/mRABjJjQAOgAdAAZJaUKQLiMUx8GZABDYAMpKgDrgBoMpz9yYAMZMaABkADoAHILClTBMRjmPgyIAMaABlIUQdcAdBkOPuTARnIjAENgAZAA5BZUqYIiMcw8WVABjQAMpCiDrgCoMlw9icDMpAZAxoADYAGILOkTBEQj2Hiy4AMaABkIEUdcAVAk+HsTwZkIDMGNAAaAA1AZkmZIiAew8SXARnQAMhAijrgCoAmw9mfDMhAZgxoADQAGoDMkjJFQDyGiS8DMqABkIEUdcAVAE2Gsz8ZkIHMGNAAaAA0AJklZYqAeAwTXwZkQAMgAynqgCsAmgxnfzIgA5kxoAHQAGgAMkvKFAHxGCa+DMiABkAGUtQBVwA0Gc7+ZEAGMmNAA6AB0ABklpQpAuIxTHwZkAENgAykqAOuAGgynP3JgAxkxoAGQAOgAcgsKVMExGOY+DIgAxoAGUhRB1wB0GQ4+5MBGciMAQ2ABkADkFlSpgiIxzDxZUAGNAAykKIOuAKgyXD2JwMykBkDGgANgAYgs6RMERCPYeLLgAxoAGQgRR1wBUCT4exPBmQgMwY0ABoADUBmSZkiIB7DxJcBGdAAyECKOuAKgCbD2Z8MyEBmDGgANAAagMySMkVAPIaJLwMyoAGQgRR1wBUATYazPxmQgcwY0ABoADQAmSVlioB4DBNfBmRAAyADKeqAKwCaDGd/MiADmTGgAdAAaAAyS8oUAfEYJr4MyIAGQAZS1AFXADQZzv5kQAYyY0ADoAHQAGSWlCkC4jFMfBmQAQ2ADKSoA64AaDKc/cmADGTGgAZAA6AByCwpUwTEY5j4MiADGgAZSFEHXAHQZDj7kwEZyIwBDYAGQAOQWVKmCIjHMPFlQAY0ADKQog64AqDJcPYnAzKQGQMaAA2ABiCzpEwREI9h4suADGgAZCBFHXAFQJPh7E8GZCAzBjQAGgANQGZJmSIgHsPElwEZ0ADIQFzaJpcAABYLSURBVIo64AqAJsPZnwzIQGYMaAA0ABqAzJIyRUA8hokvAzKgAZCBFHXAFQBNhrM/GZCBzBjQAGgANACZJWWKgHgME18GZEADIAMp6oArAJoMZ38yIAOZMaAB0ABoADJLyhQB8RgmvgzIgAZABlLUAVcANBnO/mRABjJjQAOgAdAAZJaUKQLiMUx8GZABDYAMpKgDrgBoMpz9yYAMZMaABkADoAHILClTBMRjmPgyIAMaABlIUQdcAdBkOPuTARnIjAENgAZAA5BZUqYIiMcw8WVABjQAMpCiDrgCoMlw9icDMpAZAy0YgG0y0zxFw83tGBoAIbT4y4AMZMZACwZgn8w0z605pxiPBkAILf4yIAOZMdCCATgpM81TNNzcjqEBEEKLvwzIQGYM1G4ANgduyUzz3JpzivFsTA9buIoUg/cY6iwDMlAjAzUbgEcCl9sjsuiRrgAIYhYg1ljEPSfNyVwZqNEALAa8ELjMmptNzdUACGM2MM61WPp3NtraGKjNAOwE/Npam12t1QAIZXZQ1lbMPR8NyrgM1GIA/g44zRqbbY3VAAhntnCOWzT9fRttLQyUbgDiM/6nWFuzr60aACHNHtJairrnoUGZLQOlGoBoKMcD91lXi6irGgBBLQLU2RZOf88mWwMDpRmAhwFHAPdYT4uqpxoAgS0K2BqKu+egSZmJgVIMwJrAJ4E7raNF1lENgOAWCe5MBdSf22RLZiB3A7AKcCBwq/Wz6PqpARDgogEuucg7dk3KohjI1QAsD7wHuN66WUXd1AAIchUgL6qQ+v822RIZyM0ALA28GbjSellVvdQACHRVQJdY7B2zJmWUgVwMwALg1cDF1skq66QGQLCrBHu0oPraJlsSA0MbgLht767A+dbHquujBkDAqwa8pKLvWDUpkwwMaQB2Bs60LjZRFzUAgt4E6JOF1a822RIYGMIAPBn4qfWwqXqoARD4poAvofg7Rk1KSgPwGOBU62CTdVADIPhNgm+TtcnmzEAKA7AZcIL1r+n6pwEwAZpOgJybgGNr16T0aQDWB44G7rX2NV/7NAAmQfNJYKNtt9HmGvs+DMDawGeAu6x51rwJBjQAJoPJIAMykBkDXRqA1YAPA7dldo65mq+WxqUBMCks/jIgA5kx0IUBWBF4H3BjZufWUoPN/Vw1ACaHxV8GZCAzBt7P3LdlgLcCV2d2Trk3wxbHpwEwSSz+MiADmTHw+Tn0/yWAvYBLMzuXFhtrKeesATBZLP4yIAOZMRDL9mvN0gQsDrwM+FNm51BKE2x5nBoAk8biLwMykCEDZwDxPv502y7A2RmOveWmWtK5awBMHou/DMhApgz8GthhxAHEUn/cr//nmY65pAbY+lg1ACaRxV8GZCBzBsIIxF37vgJck/lYW2+qJZ2/BsBksvjLgAzIgAw0yIAGoMGgl+RQHat36ZMBGZCBfhjQAGgAdP4yIAMyIAMNMqABaDDouul+3LS6qqsMyEBJDGgANAA6fxmQARmQgQYZ0AA0GPSSHKpjdUYlAzIgA/0woAHQAOj8ZUAGZEAGGmRAA9Bg0HXT/bhpdVVXGZCBkhjQAGgAdP4yIAMyIAMNMqABaDDoJTlUx+qMSgZkQAb6YUADoAHQ+cuADMiADDTIgAagwaDrpvtx0+qqrjIgAyUxoAHQAOj8ZUAGZEAGGmRAA9Bg0EtyqI7VGZUMyIAM9MOABkADoPOXARmQARlokAENQINB103346bVVV1lQAZKYkADoAHQ+cuADMiADDTIgAagwaCX5FAdqzMqGZABGeiHAQ2ABkDnLwMyIAMy0CADGoAGg66b7sdNq6u6yoAMlMSABkADoPOXARmQARlokAENQINBL8mhOlZnVDIgAzLQDwMaAA2Azl8GZEAGZKBBBjQADQZdN92Pm1ZXdZUBGSiJAQ2ABkDnLwMyIAMy0CADGoAGg16SQ3WszqhkQAZkoB8GNAAaAJ2/DMiADMhAgwxoABoMum66HzetruoqAzJQEgMaAA2Azl8GZEAGZKBBBjQADQa9JIfqWJ1RyYAMyEA/DGgANAA6fxmQARmQgQYZ0AA0GHTddD9uWl3VVQZkoCQGNAAaAJ2/DMiADMhAgwxoABoMekkO1bE6o5IBGZCBfhjQAGgAdP4yIAMyIAMNMqABaDDouul+3LS6qqsMyEBJDGgANAA6fxmQARmQgQYZ0AA0GPSSHKpjdUYlAzIgA/0woAHQAOj8ZUAGZEAGGmRAA9Bg0HXT/bhpdVVXGZCBkhjQAGgAdP4yIAMyIAMNMqABaDDoJTlUx+qMSgZkQAb6YUADoAHQ+cuADMiADDTIgAagwaDrpvtx0+qqrjIgAyUxoAHQAOj8ZUAGZEAGGmRAA9Bg0EtyqI7VGZUMyIAM9MOABkADoPOXARmQARlokAENQINB103346bVVV1lQAZKYkADoAHQ+cuADMiADDTIgAagwaCX5FAdqzMqGZABGeiHAQ2ABkDnLwMyIAMy0CADGoAGg66b7sdNq6u6yoAMlMSABkADoPOXARmQARlokAENQINBL8mhOlZnVDIgAzLQDwMaAA2Azl8GZEAGZKBBBjQADQZdN92Pm1ZXdZUBGSiJAQ2ABkDnLwMyIAMy0CADGoAGg16SQ3WszqhkQAZkoB8GNAAaAJ2/DMiADMhAgwxoABoMum66HzetruoqAzJQEgMaAA2Azl8GZEAGZKBBBjQADQa9JIfqWJ1RyYAMyEA/DGgANAA6fxmQARmQgQYZeAQ9bGs1KKQOtR+Hqq7qKgMyIAPdM3AvsHQP/Z/FgNs0ATpqGZABGZABGciSgb/00fwn93mOQc8y6Drp7p20mqqpDMhAaQz812Sz7uPryRoADYAMyIAMyIAMZMnA5/po/JP7PMCgZxn00lyq43VmJQMyIAPdM/CSyWbdx9eNgPs0AZoAGZABGZABGciKgYuAJfpo/FP3eYpBzyrouujuXbSaqqkMyEBpDLxxaqPu6/tnagA0ADIgAzIgAzKQDQNXA8v21fSn7jc+DuinAXTHpbljxyuzMiADtTLw6qlNuu/vHwlcr/vLxv3VCrXnZcGWARmQgekZ+EjfDX9h+38acI8mQBMgAzIgAzIgA4Mw8DX42036Ftaje/+/uOhAd6YGMiADMiADMpCWgR+ket9/OicR7z34dkDawJto6i0DMiADbTJwO/B2YPHpGnPKn60NfMPVAFdDZEAGZEAGZKA3Bk4HenncbxeGYVfgUoPfW/B1/G06fuNu3GWgbQYuAGK1fUEXjbrPfcSjCN8AXKIR0AjIgAzIgAzIwJwZ+COwZ4o7/HVtCsIIvF4jMOfA6/jbdvzG3/jLQLsM/AF4ZQkz/pmMg0agXYgtYMZeBmRABmbPwO+Bl9fQ+EeNwVLA3sDFLge5KiADMiADMiAD/8PA74B4kl82V/aPNvCuXmsEZu8Gdc5qJQMyIAP1MhC31Y+L56tv/KMGIozA64C/6AL/xwWa6PUmurE1tjIgA5MM/BZ40ZB38RttyEO9DiOwl0ZAE6ARlAEZkIHKGTgTeL6N/4F2QyOgO550x36VBRmQgZoYOAN4ro3/gY1/9H+WBF4L/LlyJ1gT3J6LxVoGZEAGHsjAr4BnjzY5X8+sgEbggTCZYGoiAzIgA/kzELfs3XnmNudvzKRAGIHXABe5IuD7gzIgAzIgAxkz8DNgp5mamj8fX4EwAv+kETD5M05+Z2b5z8yMkTHqg4GfAjuO39b8i3EV0AiYwH0ksPuUKxmQgXEZOA146rhNzN+fvwJhBOLpSBc6I3RVQAZkQAZkICEDPwSeMv825h7mq8ASGgETP2HijztD8PedVcpAPQx8H9hhvk3Lv+9egTACrwLiuckmnBrIgAzIgAx0xcB3gb/rvm25x64V0AiY9F0lvfuRJRlom4HvAE/oukm5v/4VCCOwJ/AnVwRcEZEBGZABGRiDgVOA7ftvUx6hbwXCCOyhETD5x0h+Z31tz/qMf7vx/xawXd9Nyf2nV2DSCPzRRqAZkAEZkAEZmMLAycC26duSR0ytwAJgd0Aj0K7Ld4Zn7GVABu4DTgS2Sd2EPN7wCmgELAA2ARmQgfYYiMb/dWDr4duQIxhagTACrwT+MGU5yKLQXlEw5sZcBupmIBr/8cCWQzcdj5+fAmEEXqER8H1BjaAMyEBVDNwLHAtsnl/bcUS5KTBpBM63CFRVBJzd1T27M77Gd5SBaPxfATbNrck4nvwVCCPwckAjYGEZLSy+lgkZyJeBe4AvAhvn32YcYe4KTBqB37si4IqADMiADGTLQDT+o4CNcm8qjq88BRYHXgZoBPJ1/s7KjI0MtMfA3cARwIbltRVHXJoCYQReCpznTCDbmYBNoL0mYMzbi/ldwBeADUprIo63fAU0Au0VHJuMMZeB4RmIxn848PDy24hnULoCYQReAvzOFQFXBGRABmSgNwbuBD4LrFd603D89SmgERh+ZuDszBjIQH0M3AF8Gli3vrbhGdWmQBiB3YBznQn0NhOwyNdX5I2pMR1l4HbgUOChtTUJz6d+BcII7KoR0ARoBGVABsZi4DbgEGCt+tuEZ1i7ApNG4ByLwFhFYHQ24GtniDJQNwO3Ah8HHlJ7U/D82lMgjMCLAY1A3UXMJmV8ZWA8Bm4BPgKs0V5b8IxbU2CxCSNwtisCrgjIgAw0zMDNwMHA6q01Ac9XBcIIvAjQCIw3W3B2pV4yUDYDNwEHAA+2DahA6wqEEXgh8NuGZwIW9LILuvEzfrNh4EbgQ8CqrRd9z18FRhXQCFhEZ1NE/R05KY2BG4APAquMFj1fq4AK3F+BMAIvAM5yRcD3h2VABgpm4Hrg/cCD7l/ifKUCKjCTAhoBZ3qlzfQcr8wGA9cB7wVWnqnI+XMVUIHpFQgj8HzgzIJnAjYGG4MM1M/ANcC7gRWnL2n+VAVUYFwFwgg8TyPgkrBGUAYyY+Bq4F3ACuMWNX9fBVRgPAUmjcBvMisCzvDqn+EZY2M8lYGrgHcAy49XwvxtFVCB+SoQRuC5gEbAojy1KPu9PPTNwBXA24Dl5lvE/HsVUIH5KTBpBM5wRcClYRmQgR4ZuBx4C7Ds/EqWf60CKtCHArsAGgFngH3PAN1/W4xdBrwJWKaPouU+VUAFulXgOcCve5wJ2ADaagDGu814Xwq8EVi62/Lk3lRABVIooBFos3DbsI37fBi4GNjbxp+iRHsMFehfgWcDv3JFwPeHZUAGpmHgz8BewFL9lySPoAIqkFoBjYAzw/nMDP3bOvm5CHgNsGTqguTxVEAF0ivwLOCX08wELPR1FnrjalynMnAB8CpgifQlyCOqgAoMrcDOGgGXhDWCzTHwR2APG//Q5dfjq0AeCoQR+IWNoLlGMHU26Pf1rw6cD7wCWJBH2XEUKqACOSnwTI2AJkAjWB0D5wEvs/HnVGodiwrkq0AYgdNtBNU1Amf59c/yp8b4XOAlwOL5lhpHpgIqkKsCzwB+rhHQCMhAUQycDbzYxp9rWXVcKlCWAjtpBIpqAFNngX7fzqz/LOCFQDwfxE0FVEAFOlUgjMDPnA1qBmQgKwbiiaDPs/F3WuvcmQqowCIUeLpGIKsG4Cy/nVn+1FjH8z7iAWDO+BdRqPxvFVCB/hQII/D/nA1qBmQgKQNxE6+4q6ebCqiACgyuwI4agaQNYOos0O/bmf3HJ3PiEzpuKqACKpCdAk8DfupsUDMgA50yEKtscf2NmwqogApkr0AYgZ/YBDptAs7025npT8Y6cihyyU0FVEAFilPgqRoBTYBGcGwGTgP+sbhsd8AqoAIqsBAFwgj82EYwdiOYnAn6tY3Z/w+Apywkf/wvFVABFShegZjVaATaaGaaltnH+b+Avy8+uz0BFVABFZiFAv8AxDKnTUINWmbgu8DfzSJf/BUVUAEVqE4BjYAGoEUD8J/A46vLZk9IBVRABeagQLzv+SNXBFwRqZyBU4DHzSE//BMVUAEVqF6BMAI/rLwJtDjjbf2cvwk8tvrs9QRVQAVUoAMFnqwRcDWgAiN4ErBtB/ngLlRABVSgOQV2AOKjUa3PID3/chi4DzgR2Ka5bPWEVUAFVKAHBTQC5TTAVs1KNP6vAVv3wL+7VAEVUIHmFYjPSn/fFQFXRDJiIBr/8cAWzWenAqiACqhAAgXCCMTNU1qdbXrew8f+XuAYYLMEvHsIFVABFVCBEQWepBHQBCU2gtH4vwxsOsKiL1VABVRABQZQIIzA9xI3Amfhw8/CU8bgHuBoYOMB+PaQKqACKqACMygQt1XVCLTVmPs2AXcDRwIbzcCeP1YBFVABFchAgScCcZ/1vpuD+69X42j8RwAbZsCzQ1ABFVABFRhTgTACp2oENEJjMHAX8Hlg/TFZ89dVQAVUQAUyVOAJGgFNwAwm4E7gMOBhGfLrkFRABVRABeapQBiB78zQCFzWr3dZf2Gxjcb/GWC9ebLln6uACqiAChSgQDyKVSPQVqMfbf53AJ8C1imAV4eoAiqgAirQsQJhBOLZ7KPNwdf1anI7cCjw0I5ZcncqoAIqoAIFKrA98B8agaqN0G3AvwFrFcinQ1YBFVABFehZgcdpBKozAbcCHwPW7Jkdd68CKqACKlCBAmEETnFFoGgzcAvwYWCNCnj0FFRABVRABRIrsJ1GoDgTcDNwELB6YlY8nAqogAqoQIUKhBH4tisCWZuBm4ADgNUq5M9TUgEVUAEVGFiBxwLf0ghkZQRuBP4FWHVgNjy8CqiACqhAAwpoBIb/mOANwAeAVRrgzVNUARVQARXITIHHAN90RSDpisB1wPuAlTNjweGogAqogAo0qIBGoP8VgWuB/wOs1CBfnrIKqIAKqEDmCmwLnOyKQKcrAtcA7wZWzDz2Dk8FVEAFVEAFeDRwkkZgXkbgauCdwArypAIqoAIqoAKlKaARGP+tgSuBdwDLlxZsx6sCKqACKqACowpsA3zDFYFpVwSuAN4KLDcqnq9VQAVUQAVUoHQFNAIPXBH4K7AvsGzpwXX8KqACKqACKjCTAo8CTgTua3hV4DLgTcAyM4nlz1VABVRABVSgNgXCCJzQmBG4BHgDsHRtwfR8VEAFVEAFVGBcBbZuwAj8BdgbWGpccfx9FVABFVABFahdgTACX69sReDPwGtt/LWj6/mpgAqogAp0ocBWFRiBC4F/ApbsQhD3oQIqoAIqoAItKRBG4GuFrQj8CXgVsERLgfJcVUAFVEAFVKAPBbYEvpq5EfgDsLuNv4/wu08VUAEVUIHWFcjRCJwPvAJY0HpwPH8VUAEVUAEV6FuBLYDjB14ROA94KbB43yfr/lVABVRABVRABe6vwBBG4FxgNxv//QPhKxVQARVQARUYQoHNgeN6XhE4G3ixjX+I8HpMFVABFVABFZhegUkjcG+Htxg+C3gBsNj0h/anKqACKqACKqACQyuwGXAsMB8jcCbwPBv/0KH0+CqgAiqgAiowvgKbAgcC58xyReA24NSJq/qd8Y+vt3+hAiqgAiqgAtkpsD6wz0SDvwK4BrgOiPf2vwL8M7BGdqN2QCqgAr0p8P8BWJMYA5jdfu0AAAAASUVORK5CYII="
                          />
                        </defs>
                      </svg>
                    </span>
                                                            <span>Đơn hàng của bạn</span>
                                                        </a>
                                                    </li>
                                                </div>
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {showData == 2 && <div className="col-xs-12 col-sm-9 col-md-9 item-right mg-bottom-15">
                                    <div className="bg-while pd-15 border-10-radius">
                                        <div className="row">
                                            <div className="col-xs-12" id="customer_sidebar">
                                                <div className="table-responsive">
                                                    <table className="table">
                                                        <thead>
                                                        <tr>
                                                            <th className="date text-center">Ngày đặt</th>
                                                            <th className="total text-center">Thành tiền</th>
                                                            <th className="payment_status text-center">
                                                                Trạng thái thanh toán
                                                            </th>
                                                            <th className="order_number text-center">

                                                            </th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {listBooking.map((booking, index) => (
                                                            <tr className="odd cancelled_order" data-od="">
                                                                <td className="text-center">
                                                                    <span>{formatDate(booking.dateBooking)}</span>
                                                                </td>
                                                                <td className="text-center">
                                                                    <span
                                                                        className="total money">{formatNumber(booking.price) + "đ" || "Đang cập nhật"}</span>
                                                                </td>
                                                                <td className="text-center">
                                                                    <span
                                                                        className="status_pending">{booking.statusPayment === 1 ? "Nhận hàng rồi thanh toán" : "Đã thanh toán"}</span>
                                                                </td>
                                                                <td>
                                                                    <button className="btn-update-customer"
                                                                            type="submit"
                                                                            onClick={() => {
                                                                                showDetailBooking(booking.dateBooking)
                                                                            }}
                                                                            data-address-default="ThemeSyntaxError">Chi
                                                                        tiết đơn hàng
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="page">
                                            <ReactPaginate
                                                previousLabel={"Trang sau"}
                                                nextLabel={"next"}
                                                breakLabel={"..."}
                                                breakClassName={"break-me"}
                                                pageCount={totalPages}
                                                marginPagesDisplayed={2}
                                                pageRangeDisplayed={5}
                                                onPageChange={handlePageClick}
                                                containerClassName={"pagination"}
                                                subContainerClassName={"pages pagination"}
                                                activeClassName={"active"}
                                            />
                                        </div>
                                    </div>
                                </div>}
                                {showData == 1 && <div className="col-xs-12 col-sm-9 col-md-9 item-right mg-bottom-15">
                                    <div className="bg-while pd-15 border-10-radius">
                                        <div className="row">
                                            <div className="col-xs-12" id="customer_sidebar">
                                                <h1 className="title-detail h3">Thông tin tài khoản</h1>
                                                <div className="form-update-content">
                                                    <div className="success-update-info hidden">
                                                        <img
                                                            width={20}
                                                            height={20}
                                                            src="https://file.hstatic.net/200000525917/file/check_fed1ae0ce277470eb827c4d6f3ac8ddf.png"
                                                        />
                                                        <div className="btn-close">
                                                            <span className="bar animate"/>
                                                        </div>
                                                    </div>
                                                    <form
                                                        acceptCharset="UTF-8"
                                                        action="/account"
                                                        method="post"
                                                    >
                                                        <div className="form-group-edit d-flex align-center">
                                                            <label>Họ và tên</label>
                                                            <p>
                                                                <input disabled={true}
                                                                       required=""
                                                                       type="text"
                                                                       defaultValue={account.fullName}
                                                                       placeholder="Nhập họ và tên"
                                                                       className="text"
                                                                />
                                                            </p>
                                                        </div>
                                                        <div className="form-group-edit d-flex align-center">
                                                            <label>Địa chỉ</label>
                                                            <p>
                                                                <input disabled={true}
                                                                       type="text"
                                                                       defaultValue={account.address}
                                                                       placeholder="Nhập địa chỉ"
                                                                />
                                                            </p>
                                                        </div>
                                                        <div className="form-group-edit d-flex align-center">
                                                            <label>Email</label>
                                                            <p>
                                                                <input
                                                                    disabled
                                                                    defaultValue={account.email}
                                                                    placeholder="Nhập email"
                                                                    size={30}
                                                                />
                                                            </p>
                                                        </div>
                                                        <div className="form-group-edit d-flex align-center">
                                                            <label>Số điện thoại</label>
                                                            <p>
                                                                <input
                                                                    disabled
                                                                    defaultValue={account.phoneNumber}
                                                                    size={30}
                                                                />
                                                            </p>
                                                        </div>
                                                        <div
                                                            className="form-group-edit d-flex align-center js-center-mb">
                                                            <label/>
                                                            {/*<button*/}
                                                            {/*    className="btn-update-customer"*/}
                                                            {/*    type="submit"*/}
                                                            {/*    data-address-default="ThemeSyntaxError"*/}
                                                            {/*>*/}
                                                            {/*    Cập nhật*/}
                                                            {/*</button>*/}
                                                        </div>
                                                    </form>
                                                    <h3>Đổi mật khẩu</h3>
                                                    <Formik initialValues={{
                                                        password: hdPassword,
                                                        newPassword: "",
                                                        confirmPassword: ""
                                                    }} validationSchema={Yup.object({
                                                        newPassword: Yup.string().required("Vui lòng nhập mật khẩu mới").min(6, "Mật khẩu phải có ít nhất 6 ký tự").max(20, "Mật khẩu không được quá 20 ký tự"),
                                                        confirmPassword: Yup.string().required("Vui lòng nhập lại mật khẩu mới").oneOf([Yup.ref('newPassword'), null], 'Mật khẩu không trùng khớp')
                                                    })}
                                                            onSubmit={values => (
                                                                changePassword(values.confirmPassword, id).then(
                                                                    () => {
                                                                        back("/login")
                                                                        localStorage.clear()
                                                                        Swal.fire({
                                                                                title: "Đổi mật khẩu thành công !",
                                                                                text: "Vui lòng đăng nhập lại.",
                                                                                icon: "success"
                                                                            }
                                                                        )
                                                                    }
                                                                )
                                                            )}>

                                                        <Form>
                                                            <div className="form-group-edit d-flex align-center">
                                                                <label>Nhập mật khẩu cũ</label>
                                                                <p>
                                                                    <input type="password" onChange={(event) =>
                                                                        handlePassword(event.target.value, id)
                                                                    }
                                                                           placeholder="Nhập mật khẩu cũ"/>
                                                                    {showError === false &&
                                                                        <div className="errors">
                                                                            <p>Mật khẩu cũ của bạn không đúng
                                                                            </p>
                                                                        </div>}
                                                                </p>
                                                            </div>
                                                            <div className="form-group-edit d-flex align-center">
                                                                <label>Nhập mật khẩu mới</label>
                                                                <p>
                                                                    <Field name="newPassword" type="password"
                                                                           placeholder="Nhập mật khẩu mới"
                                                                    />
                                                                    <ErrorMessage name="newPassword" component="div"
                                                                                  className="errors"/>
                                                                </p>
                                                            </div>
                                                            <div className="form-group-edit d-flex align-center">
                                                                <label>Nhập lại mật khẩu mới</label>
                                                                <p>
                                                                    <Field name="confirmPassword" type="password"
                                                                           placeholder="Nhập lại mật khẩu mới"
                                                                    />
                                                                    <ErrorMessage name="confirmPassword" component="div"
                                                                                  className="errors"/>
                                                                </p>
                                                            </div>
                                                            {showError === true ?
                                                                <button style={{marginLeft: "40%"}}
                                                                        className="btn-update-customer"
                                                                        type="submit"
                                                                        data-address-default="ThemeSyntaxError"
                                                                >
                                                                    Cập nhật
                                                                </button> :
                                                                <button style={{marginLeft: "40%"}}
                                                                        className="btn-update-customer"
                                                                        type="submit"
                                                                        data-address-default="ThemeSyntaxError"
                                                                        disabled={true}
                                                                >
                                                                    Cập nhật
                                                                </button>}
                                                        </Form>
                                                    </Formik>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                }

                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <div style={{marginTop: "5%"}}>
                <Footer/>
            </div>
        </>
    )
}