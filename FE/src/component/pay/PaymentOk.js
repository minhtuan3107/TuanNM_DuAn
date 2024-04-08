import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

export default function PaymentOk() {
    const back = useNavigate();
    const id = localStorage.getItem("idAccount");
    const [resultPayment, setResultPayment] = useState("");
    const token = localStorage.getItem("authToken")
    const location = useLocation();
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const vnpResponseCode = searchParams.get('vnp_ResponseCode');
        console.log(vnpResponseCode)
        const setPaymentOk = async () => {
            const data = await axios.get(`http://localhost:8080/payment/payment_infor/${id}`, {
                params: {
                    vnp_ResponseCode: vnpResponseCode
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setResultPayment(data.data);
        }
        setPaymentOk();
        if (resultPayment === true) {
            back(`/history`, {state: {data: "OK"}})
        } else {
            back(`/history`, {state: {data: "NO"}})
        }
    }, []);
}