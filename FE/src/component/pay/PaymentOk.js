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
        const setPaymentOk = async () => {
            const searchParams = new URLSearchParams(window.location.search);
            const status = searchParams.get('vnp_TransactionStatus');
            const data = await axios.get(`http://localhost:8080/payment/payment_infor/${id}`, {
                params: {
                    status: status
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setResultPayment(data.data);
            console.log(data);
            console.log(data.data)
        }
        setPaymentOk();
        console.log(resultPayment);
        if (resultPayment === true) {
            back(`/history`, {state: {data: "OK"}})
        }
        if (resultPayment === false) {
            back(`/history`, {state: {data: "NO"}})
        }
    }, [resultPayment]);
}