import Header from "../Header";
import Footer from "../Footer";
import {useEffect, useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {checkEmail, checkPhone, checkUserName, register} from "../service/AccountService";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";

export default function Register() {
    const [status, setStatus] = useState(0);
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const back = useNavigate();
    useEffect(() => {
        document.title = "Đăng kí"
        console.log(status)
    }, [status, email, phone, userName]);
    const handleChangeUserName = (event) => {
        checkUserName(event).then((v) => {
            if (v == "NO") {
                setStatus(3);
            } else {
                setStatus(4)
                setUserName(event);
            }
        })

    }
    const handleChangeEmail = (event) => {
        checkEmail(event).then((s) => {
            if (s == "NO") {
                setStatus(2);
            } else {
                setStatus(4)
                setEmail(event)
            }
        });
    }
    const handleChangePhone = (event) => {

        checkPhone(event).then((s) => {
            if (s == "NO") {
                setStatus(1);
            } else {
                setStatus(4)
                setPhone(event)
            }
        });
    }
    const checkStatus = async (values) => {
        if (status == 4) {
            await register(values).then(() => {
                Swal.fire({
                    title: "Đăng kí thành công !",
                    text: "Chào mừng bạn đến với hệ thống của chúng tôi",
                    icon: "success"
                });
                back(`/home`)
            })
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
                                            <h1>Tạo tài khoản</h1>
                                        </div>
                                        <Formik initialValues={{
                                            fullName: "",
                                            email: email,
                                            phone: phone,
                                            password: "",
                                            accountName: userName,
                                            address: "",
                                            birthday: "",
                                        }} validationSchema={Yup.object({
                                            fullName: Yup.string()
                                                .required("Họ Và Tên không được để rỗng")
                                                .min(6, "Họ và Tên từ 6 - 45 kí tự")
                                                .max(45, "Họ và Tên từ 6 - 45 kí tự")
                                                .matches(
                                                    /^[A-Za-zÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*(?:\s+[A-Za-zÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*)*\s*$/,
                                                    "Họ Và Tên vui lòng nhập đúng định dạng"
                                                ),
                                            email: Yup.string()
                                                .required("Email Không được để rỗng")
                                                .matches(/^[\w\-.]+@([\w\-]+\.)+[\w\-]{2,}$/, "Email vui lòng nhập đúng định dạng"),
                                            phone: Yup.string().required("Số Điện Thoại không được để rỗng").matches("^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$", "Số điện thoại vui lòng nhập đúng định dạng"),
                                            password: Yup.string().required("Mật Khẩu không được để rỗng").min(6, "Mật Khẩu độ dài từ 6-20 kí tự").max(20, "Mật Khẩu độ dài từ 6-20 kí tự"),
                                            accountName: Yup.string().required("Tài Khoản không được để trống").min(6, "Tài Khoản từ 6 - 20 kí tự").max(20, "Tài Khoản từ 6 - 20 kí tự").matches("^[a-z0-9_-]+$", "Tài Khoản Vui Lòng Nhập Đúng Định Dạng"),
                                            birthday: Yup.string().required("Ngày Sinh không được để rỗng")

                                        })}
                                                onSubmit={values => {
                                                    setStatus(4)
                                                    checkStatus(values);
                                                }}>
                                            <Form>
                                                <ul>
                                                    <li id="form-last_name" className="large_form">
                                                        <input placeholder="Tài khoản" name="accountName"
                                                               className="text" onChange={(event) => {
                                                            handleChangeUserName(event.target.value)
                                                        }}/>
                                                        {status == 3 && <div className="errors">
                                                            <li>Tài khoản đã tồn tại trên hệ thống</li>
                                                        </div>
                                                        }

                                                    </li>
                                                    <li id="form-last_name" className="large_form">
                                                        <Field placeholder="Họ và tên" name="fullName"
                                                               className="text"/>
                                                        <ErrorMessage name="fullName" component="div"
                                                                      className="errors"/>
                                                        {/*<div className="errors">*/}
                                                        {/*    <ul>*/}
                                                        {/*        <li>Email đã tồn tại trên hệ thống</li>*/}
                                                        {/*    </ul>*/}
                                                        {/*</div>*/}
                                                    </li>
                                                    <li id="form-last_name" className="large_form">
                                                        <Field type="date" placeholder="Ngày sinh" name="birthday"
                                                               className="text"/>
                                                        <ErrorMessage name="birthday" component="div"
                                                                      className="errors"/>
                                                    </li>
                                                    <li id="form-email">
                                                        <input onChange={(event) => {
                                                            handleChangeEmail(event.target.value);
                                                        }} placeholder="Email" name="email" className="text"/>
                                                        <ErrorMessage name="email" component="div" className="errors"/>
                                                        {status == 2 && <div className="errors">
                                                            <li>Email đã tồn tại trên hệ thống</li>
                                                        </div>}
                                                    </li>

                                                    <li id="form-phone">
                                                        <input onChange={(event) => {
                                                            handleChangePhone(event.target.value)
                                                        }} placeholder="Số điện thoại" name="phone"
                                                               className="text"/>
                                                        <ErrorMessage name="phone" component="div" className="errors"/>
                                                        {status == 1 && <div className="errors">
                                                            <li>Số điện thoại đã tồn tại trên hệ thống</li>
                                                        </div>}
                                                    </li>
                                                    <li id="form-last_name" className="large_form">
                                                        <Field placeholder="Địa chỉ" name="address"
                                                               className="text"/>
                                                        <ErrorMessage name="address" component="div"
                                                                      className="errors"/>

                                                    </li>
                                                    <li id="form-password">
                                                        <Field placeholder="Mật khẩu" name="password" type="password"/>
                                                        <ErrorMessage name="password" component="div"
                                                                      className="errors"/>
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
                                            </Form>
                                        </Formik>
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