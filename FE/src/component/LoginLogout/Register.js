import Header from "../Header";
import Footer from "../Footer";
import {useEffect} from "react";

export default function Register() {
    useEffect(() => {
        document.title ="Đăng kí"
    }, []);
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
                                            <h1>Tạo tài khoản</h1>
                                        </div>
                                        <div className="userbox">
                                            <form accept-charset='UTF-8' action='/account' id='create_customer'
                                                  method='post'>
                                                <input name='form_type' type='hidden' value='create_customer'/>
                                                <input name='utf8' type='hidden' value='✓'/>


                                                <ul>
                                                    <li id="form-last_name" className="clearfix large_form">
                                                        <input required type="text" value="" name="customer[last_name]"
                                                               placeholder="Họ" id="last_name" className="text"
                                                               size="30"/>
                                                    </li>
                                                    <li id="form-first_name">
                                                        <input required type="text" value="" name="customer[first_name]"
                                                               placeholder="Tên" id="first_name" className="text"
                                                               size="30"/>
                                                    </li>
                                                    <li id="form-email">
                                                        <input required type="email" value="" placeholder="Email"
                                                               name="customer[email]" id="email" className="text"
                                                               size="30"/>
                                                    </li>
                                                    <li id="form-phone">
                                                        <input required type="tel" value="" placeholder="Số điện thoại"
                                                               name="customer[phone]" id="phone" className="text"
                                                               size="30"/>
                                                    </li>
                                                    <li id="form-password">
                                                        <input required type="password" value="" placeholder="Mật khẩu"
                                                               name="customer[password]" id="password"
                                                               className="password text" size="30"/>
                                                    </li>
                                                    <div className=" action_account_custommer">
                                                        <div className="action_bottom button dark">
                                                            <input className="btn" type="submit" id="register-now"
                                                                   value="Đăng ký"/>
                                                        </div>
                                                    </div>
                                                    <li className=" req_pass">
                                                        <a className="come-back" href="/login"><i
                                                            className="fa fa-reply"></i> Quay lại đăng nhập</a>
                                                    </li>
                                                </ul>

                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

            </div>
            <div>
                <Footer/>
            </div>
        </>
    )
}