import Header from "../header_footer/Header";
import {ErrorMessage, Field, Form, Formik} from "formik";
import Footer from "../header_footer/Footer";
import {useState} from "react";
import {checkEmailAccount, checkPhoneNumberAccount, checkUserNameAccount, register} from "../../service/AccountService";
import SweetAlert from "sweetalert";
import {useNavigate} from "react-router-dom";
import * as Yup from "yup";

export default function Register() {
    const [notification, setNotification] = useState(0);

    const back = useNavigate();
    const registerUser = async (values) => {
        console.log(values)
        const checkNameAccount = await checkUserNameAccount(values.nameAccount);
        if (checkNameAccount.length !== 0) {
            setNotification(1)
        }
        const checkEmail = await checkEmailAccount(values.email);
        if (checkEmail.length !== 0) {
            setNotification(2)
        }
        const checkPhone = await checkPhoneNumberAccount(values.phoneNumber);
        if (checkPhone.length !== 0) {
            setNotification(3)
        }
        if (checkPhone.length === 0 && checkEmail.length === 0 && checkPhone.length === 0) {
            register(values).then(SweetAlert(" Đăng kí thành công!", ``, "success")
            )
            back("/login")
        }
        console.log(notification)
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
                                            <h1>Đăng kí</h1>
                                        </div>
                                        <div className="userbox">
                                            <Formik initialValues={{
                                                fullName: "",
                                                nameAccount: "",
                                                address: "",
                                                email: "",
                                                phoneNumber: "",
                                                password: ""
                                            }}
                                            //      x
                                                    onSubmit={values => {
                                                        registerUser(values)
                                                    }}>
                                                <Form>
                                                    <ul>
                                                        <li id="form-email">
                                                            <Field name="nameAccount" placeholder={"Nhập tài khoản"}
                                                            />
                                                            {notification === 1 &&
                                                                <div className="errors">
                                                                    <ul>
                                                                        <li>Tên đăng nhập đã tồn tại trên hệ thống</li>
                                                                    </ul>
                                                                </div>
                                                            }
                                                            <ErrorMessage name="nameAccount" component="div" className="errors"/>
                                                        </li>
                                                        <li id="form-name">
                                                            <Field name="fullName" placeholder={"Nhập họ và tên"}
                                                            />
                                                            <ErrorMessage name="fullName" component="div" className="errors"/>

                                                        </li>
                                                        <li id="form-address">
                                                            <Field name="address" placeholder={"Nhập địa chỉ"}
                                                            />
                                                            <ErrorMessage name="address" component="div" className="errors"/>

                                                        </li>
                                                        <li id="form-phone">
                                                            <Field name="phoneNumber" placeholder={"Nhập số điện thoại"}
                                                            />
                                                            <ErrorMessage name="phoneNumber" component="div" className="errors"/>
                                                            {notification === 3 &&
                                                                <div className="errors">
                                                                    <ul>
                                                                        <li>Số điện thoại đã tồn tại trên hệ thống</li>
                                                                    </ul>
                                                                </div>
                                                            }
                                                        </li>
                                                        <li id="form-email">
                                                            <Field name="email" placeholder={"Nhập email"}
                                                            />
                                                            <ErrorMessage name="email" component="div" className="errors"/>

                                                            {notification === 2 &&
                                                                <div className="errors">
                                                                    <ul>
                                                                        <li>Email đã tồn tại trên hệ thống</li>
                                                                    </ul>
                                                                </div>
                                                            }
                                                        </li>
                                                        <li id="form-phone">
                                                            <Field type="password" name="password"
                                                                   placeholder={"Nhập mật khẩu"}
                                                            />
                                                            <ErrorMessage name="password" component="div" className="errors"/>

                                                        </li>
                                                        <div className=" action_account_custommer">
                                                            <div className="action_bottom button dark">
                                                                <button className="btn" type="submit"
                                                                >Đăng kí
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <li className=" req_pass">
                                                            <a className="come-back" href="/login"><i
                                                                className="fa fa-reply"></i> Đã có tài khoản?</a>
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