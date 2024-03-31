import Header from "./Header";
import Footer from "./Footer";
import {Link, useLocation, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getListAll} from "./service/MotobikeAccessoryService";
import ReactPaginate from "react-paginate";
import './modal.css'
import HeaderIsLogin from "./HeaderIsLogin";
import Swal from "sweetalert2";

export default function AllProduct() {
    const [isLogin, setIsLogin] = useState(true);
    const [dataProduct, setDataProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(10);
    const location = useLocation();
    const name = location.state?.data || "";

    useEffect(() => {
        const isLogin = localStorage.getItem("isLogin");

        async function fetchData() {
            setLoading(true);
            const result = await getListAll(name, page);
            setDataProduct(result.content);
            setLoading(false);
            document.title = "Tất cả phụ tùng"
        }
        console.log(dataProduct)

        fetchData();
        if (isLogin) {
            setIsLogin(true)
        }
    }, [page, name]);


    function formatNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    return (
        <>
            {isLogin ? <HeaderIsLogin/> : <Header/>}
            {dataProduct.length === 0 ? <div>
                <h1>Không tìm thấy sản phẩm vui lòng tìm sản phẩm khác</h1>
                </div>
                :
                <div>
                    <section
                        className="section_collection_group pd-top-30"
                        data-include="section-collection-group-1"
                    >
                        <div className="container">
                            <div className="bg-color-while">
                                <div className="wd-top-title d-flex d-flex-center js-between">
                                    <h2 className="title-section">Tất cả phụ tùng</h2>

                                </div>
                                <div className="d-flex d-flex-wrap row-left-list">
                                    {dataProduct.map((m) => (
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
                                <div style={{textAlign: "center"}} className="action_bottom button dark">
                                    <button style={{backgroundColor: "var(--bgheader)"}}
                                            className="btn"
                                            onClick={() => {
                                                setPage(page + 5)
                                            }}
                                    >Xem thêm
                                    </button>
                                </div>
                            </div>
                        </div>

                    </section>
                </div>

            }
            {dataProduct.length > 0 || <div style={{marginTop: "34%"}}>
                <Footer/>
            </div>
            }
            {dataProduct.length === 0 || <div style={{marginTop: "4%"}}>
                <Footer/>
            </div>}
        </>
    );
}
