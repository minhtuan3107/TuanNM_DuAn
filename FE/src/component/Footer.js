import './style.css'
import {useEffect, useState} from "react";
import {getListHot, getListNew} from "./service/MotobikeAccessoryService";
import {getAll} from "./service/TypeAccessoryService";
import {useNavigate} from "react-router-dom";

export default function Footer() {
    const [listType, setListType] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const getListData = async () => {
            const list = await getAll();
            setListType(list);
        }
        getListData()
    }, []);
    return (
        <>
            <footer className="mg-0 pd-bt-50-mb">
                <div className="top-ft-wanda">
                    <div className="container">
                        <div className="d-flex row">
                            <div className="col-md-3 col-sm-6 col-xs-12 infomation mg-bottom-15">
                                <div className="title-footer">
                                    <a href="/">
                                        <img

                                        />
                                    </a>
                                </div>
                                <div className="infomation-wanda">
                                    <p>Phụ tùng xe máy chính hãng - Thiết bị sửa chữa chuyên nghiệp</p>
                                    <ul>
                                        <li>
                                            <i className="fa fa-phone" aria-hidden="true"/>{" "}
                                            <a rel="nofollow" href="tel:0876543332">
                                                0876543332
                                            </a>
                                        </li>

                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6 col-xs-6 tablink mg-bottom-15">
                                <div className="title-footer">
                                    <div className="h4">Menu chính</div>
                                </div>
                                <div className="footer-link-wanda">
                                    <ul>
                                        <li>
                                            <a href="/home">Trang chủ</a>
                                        </li>
                                        <li>
                                            <a href="/all">Tất cả sản phẩm</a>
                                        </li>
                                        <li>
                                            <a href="https://fb.com/mtuan3107">Liên hệ</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6 col-xs-12 tablink mg-bottom-15">
                                <div className="title-footer">
                                    <div className="h4">Sản phẩm</div>
                                </div>
                                <div className="footer-link-wanda">
                                    <ul>
                                        {listType.map((type) => (
                                            <li>
                                                <a  onClick={(e) => {
                                                    e.preventDefault()
                                                    navigate("/all", {state: {data: type.name}})

                                                }}>{type.name}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6 col-xs-12">
                                <div className="title-footer">
                                    <div className="h4">Tổng đài hỗ trợ</div>
                                </div>
                                {/*<ul className="footer-support">*/}
                                {/*    <li>*/}
                                {/*        <span>Gọi mua hàng:</span> <a href="tel:0329798101">0329798101</a>{" "}*/}
                                {/*        <span>Miss Thắng (8h30-21h)</span>*/}
                                {/*    </li>*/}
                                {/*</ul>*/}
                                <div className="title-footer">
                                    <div className="h4">Phương thức thanh toán</div>
                                </div>
                                <div>
                                    <img
                                        width={246}
                                        height={24}
                                        src="https://theme.hstatic.net/1000379792/1000977285/14/footer_trustbadge.jpg?v=338"
                                        alt="Phương thức thanh toán"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="copyright-wanda">
                    <div className="container">
                        <div className="row ">
                            <div className="col-md-12 text-center">
                                <div className="text-copyright mb-0">
            <span>
              © Copyright 2024 By TUI

            </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>


        </>
    )
}