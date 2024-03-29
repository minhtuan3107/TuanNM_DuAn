
import Header from "../Header";
import Footer from "../Footer";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import SweetAlert from "sweetalert";
import {loginAccount} from "../service/AccountService";
import {Form, Formik} from "formik";

export default function Login() {
    const [isLogin, setIsLogin] = useState(false);
    const [paramAccount, setParamAccount] = useState("");
    const [paramPassword, setParamPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const isLogin = localStorage.getItem("isLogin");
        window.scrollTo(0, 0);
        document.title = "Đăng nhập"
    }, []);
    const handleParamAccountChange = (e) => {
        setParamAccount(e.target.value)
    };
    const handleParamPasswordChange = (e) => {
        setParamPassword(e.target.value)

    };
    const handleLogin = async () => {

        try {

            if (paramPassword === "" || paramAccount === "") {
                setError("Tên đăng nhập và mật khẩu không được để trống!");
                setParamPassword("")
                setParamAccount("")
            } else {
                let params = {
                    nameAccount: paramAccount,
                    password: paramPassword
                }
                const req = await loginAccount(params)
                localStorage.setItem('authToken', req.token);
                localStorage.setItem('idAccount', req.dataRes.id);
                localStorage.setItem("isLogin", true);
                localStorage.setItem("nameAccount", req.dataRes.nameAccount);
                // Cookies.set('Token', req.token, { expires: 7 * 1000 * 60 ,httpOnly:true, secure: true, sameSite: 'strict' });
                SweetAlert("Đăng nhập thành công!", `Chào mừng ${localStorage.getItem("nameAccount")} đến với hệ thống!`, "success")
                navigate('/home');
            }
        } catch (err) {
            setError("Tên đăng nhập hoặc mật khẩu không chính xác!");

        }
    }
    return (
        <>
            <div>
                <Header/>
            </div>
            <div>
                <main>
                    <div id="template-account" className="mg-top-50">
                        <div className="cloud x1"></div>
                        <div className="cloud x2"></div>
                        <div className="cloud x3"></div>
                        <div className="cloud x4"></div>
                        <div className="cloud x5"></div>
                        <div className="container">
                            <div className="customer-max">
                                <div className="bg-while">
                                    <div className="col-md-12 col-sm-12 col-xs-12  contact-form-warp text-center">
                                        <div className="header-page clearfix">
                                            <h1>Đăng nhập</h1>
                                        </div>
                                        <div className="userbox">
                                            <Formik initialValues={{
                                                nameAccount: paramAccount,
                                                password: paramPassword
                                            }} onSubmit={values => {
                                                handleLogin()
                                            }}>
                                                <Form>
                                                    <ul>
                                                        <li id="form-email">
                                                            <input type="text" placeholder={"Nhập tài khoản"}
                                                                   onChange={(e) => {
                                                                       handleParamAccountChange(e)
                                                                   }}/>
                                                        </li>
                                                        <li id="form-password">
                                                            <input type="password" placeholder={"Nhập mật khẩu"}
                                                                   onChange={(e) => {
                                                                       handleParamPasswordChange(e)
                                                                   }}/>
                                                        </li>
                                                        <div className=" action_account_custommer">
                                                            <div className="action_bottom button dark">
                                                                <button className="btn" type="submit"
                                                                        onClick={handleLogin}>Đăng nhập
                                                                </button>
                                                            </div>
                                                        </div>
                                                        {error !== "" &&
                                                            <div className="errors">
                                                                <ul>
                                                                    <li>Tên đăng nhập hoặc mật khẩu không đúng</li>
                                                                </ul>
                                                            </div>
                                                        }
                                                        <li className=" req_pass">
                                                            <a className="come-back" href="/register"><i
                                                                className="fa fa-reply"></i> Chưa có tài khoản ?</a>
                                                        </li>
                                                    </ul>

                                                </Form>
                                            </Formik>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

            </div>
            <div style={{marginTop: "10%"}}>
                <Footer/>
            </div>
        </>
    )
}